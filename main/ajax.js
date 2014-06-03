;(function(global, context, _, undefined) {
    'use strict';
    
    //xhr ajax
    function _xhr() {
        try {
            return new XMLHttpRequest();
        } catch(e) {

        }
    }

    var supportStatus = {       
        1223 : 204 //Support: IE9 | #1450: sometimes IE returns 1223 when it should be 204
    };

    //Constructor OAuthHeader
    var OAuthHeader = function(url, method, data) {
        return this.initialize(url, method, data);
    };

    OAuthHeader.prototype.createConfig = function() {
        this.key = [
            MURPHY.config.consumerSecret
          , MURPHY.config.tokenSecret
        ].join('&');

        this.auths = {
            'oauth_consumer_key'     : MURPHY.config.consumerKey,
            'oauth_nonce'            : _.nonce(6),
            'oauth_signature_method' : 'HMAC-SHA1',
            'oauth_timestamp'        : _.timestamp(),
            'oauth_token'            : MURPHY.config.token
        };
    };

    OAuthHeader.prototype.initialize = function(url, method, data) {        
        this.createConfig();
        this.auths['oauth_signature'] = this.getSignature(url, method, data);

        return this.getHeaderObject();
    };

    OAuthHeader.prototype.getSignature = function(url, method, data) {
        var params = _.extend(data, this.auths);

        var signature = [
             method
           , encodeURIComponent(url)
           , this.transformParamsEnconde(params)
        ];

        return encodeURIComponent(_.HmacSHA1(this.key, signature.join('&')));
    };

    OAuthHeader.prototype.transformParamsEnconde = function(params) {
        var transform = this.convertFormSubmitString(params);

        return encodeURIComponent(( transform.sort() || [] ).join('&'));
    };

    OAuthHeader.prototype.convertFormSubmitString = function(obj, wrapper) {
        var params = []
          , item   = null
        ;

        wrapper = ( wrapper || '' );

        for ( item in obj ) {
            params.push(item + '=' + wrapper + obj[item] + wrapper);
        }

        return params;
    };

    OAuthHeader.prototype.getHeaderObject = function() {
        var transform = this.convertFormSubmitString(this.auths, '"');
        
        return {
            'Authorization' : 'OAuth realm="WP-API", ' + transform.join(', ')
        };
    };

    //Constructor Ajax
    var Ajax = function(options) {
        this.xhr     = _xhr();
        this.options = this.parseOptions(options);
    };
    
    Ajax.prototype.parseOptions = function(options) {
        options = _.extend({
            url      : '',
            async    : true,
            type     : 'GET',
            dataType : null,
            data     : {},
            headers  : {}
        }, (options || {}));

        options.headers = _.extend({
            'X-Requested-With' : 'XMLHttpRequest',
            'X-WP-API'         : 'true'
        }, options.headers);

        return options;
    };

    Ajax.prototype.send = function() {
        //open request
        this.xhr.open(this.options.type, this.options.url, this.options.async);
        //set headers
        this.setHeader();
        //set response type
        this.setResponseType();     
        //send request ajax
        return this._createPromise();
    };

    Ajax.prototype.setResponseType = function() {
        if ( this.options.dataType ) {
            this.xhr.responseType = this.options.dataType;
        }
    };

    Ajax.prototype._createPromise = function() {
        var self = this;

        return new RSVP.Promise(function(resolve, reject) {
            self.addEventListener(resolve, reject);
            self.xhr.send( self.options.data || null );         
        });
    };

    Ajax.prototype.addEventListener = function(resolve, reject) {
        this.xhr.addEventListener('load', _.proxy(this, '_onLoad', resolve, reject));       
        this.xhr.addEventListener('error', _.proxy(this, '_onError', reject));
    };

    Ajax.prototype._onLoad = function(resolve, reject) {        
        if ( !this.isSuccessRequest() ) {
            reject(_.error(this.xhr.statusText));
            return;
        }

        resolve(this.getParseResponse());
    };

    Ajax.prototype._onError = function(reject) {
        reject(_.error('Network Error'));
    };

    Ajax.prototype.getStatus = function() {
        return ( supportStatus[ this.xhr.status ] || this.xhr.status );
    };

    Ajax.prototype.isSuccessRequest = function() {
        var status = this.getStatus();  

        return ( status >= 200 && status < 300 || status === 304 );
    };

    Ajax.prototype.setHeader = function() {
        for ( var item in this.options.headers ) {
            this.xhr.setRequestHeader(item, this.options.headers[ item ]);
        }
    };

    Ajax.prototype.getParseResponse = function() {
        var _response = false
          , pages     = {}
          , links     = {}
        ;

        if ( this.xhr.response ) {
            _response = this.xhr.response;
        }
        else if ( this.xhr.responseText ) {
            _response = JSON.parse(this.xhr.responseText);
        }

        if ( this.options.type.toUpperCase() !== 'GET' ) {
            return _response;
        }

        pages = this._getObjectPages();
        links = this._getObjectLinks(pages.totalPages);

        return _.extend({ list : _response }, pages, links);
    };

    Ajax.prototype._getObjectPages = function(obj) {
        var total       = ( this.xhr.getResponseHeader('X-WP-Total') || 0 )
          , totalPages  = ( this.xhr.getResponseHeader('X-WP-TotalPages') || 0 )
        ;  

        return {
            total      : parseInt(total, 10),
            totalPages : parseInt(totalPages, 10)
        };
    };

    Ajax.prototype._getObjectLinks = function(totalPages) {
        var next, prev, page;

        page = ( this.options.url.match(/page=([0-9]{1,})/) || [1,1] )[1];
        page = parseInt(page, 10);

        //get next e prev pages
        next = ( ( page + 1 ) > totalPages ) ? false : ( page + 1 );
        prev = ( ( page - 1 ) <= 0 ) ? false : ( page - 1 );

        return {
            next : ( next && _.addQueryVars({ page : next }, this.options.url) ),
            prev : ( prev && _.addQueryVars({ page : prev }, this.options.url) )
        };
    };

    var getJSON = function(url, data) {
        var authorization, ajax;
        var args = {
            url      : _.addQueryVars(( data || {}), url),
            type     : 'GET',
            dataType : 'json',
            headers  : {
                'Accept'        : 'application/json, text/javascript',
                'Content-Type'  : 'application/json'
            }
        };

        if ( MURPHY.config.token ) {
            authorization = new OAuthHeader(url, 'GET', data);
            _.extend(args.headers, authorization);
        }

        ajax = new Ajax(args);
        
        return ajax.send();
    };

    context.getJSON = ( getJSON || context.getJSON );
})(window, MURPHY, MURPHY.utils);