;(function(global, context, undefined) {
    'use strict';

    var utils = {}; 

    //helpers
    utils.slice = Array.prototype.slice;

    utils.error = function(message) {
        return new Error(message);
    };

    utils.isArray = function(array) {
        return Array.isArray(array);
    };

    utils.isError = function(obj) {
        return ( obj instanceof Error );
    };  

    utils.now = function() {
        return Date.now;
    };

    utils.isObject = function(obj) {
        return ( obj === Object(obj) );
    };

    utils.isFunction = function(func) {
        return ( typeof func === 'function' );
    };

    utils.extend = function(obj) {
        if ( !utils.isObject(obj) ) {
            return obj;
        }

        [].forEach.call(utils.slice.call(arguments, 1), function(source){
            for ( var prop in source ) {
                obj[prop] = source[prop];
            }
        });

        return obj;
    };

    utils.proxy = function(context, func) {
        var execute = context[func]
          , args    = utils.slice.call(arguments, 2)
        ;

        if ( !utils.isFunction(execute) ) {
            return;
        }

        return function() {
            return execute.apply(context, args);
        };
    };

    utils.addQueryVars = function(objParams, url) {
        var listParams      = []
          , objParamsOrigin = {}
          , params          = null
          , separator       = url.split('?')
        ;

        url             = separator[0];
        objParamsOrigin = utils.getObjectParamsUrl(separator[1]);
        objParams       = utils.extend(objParamsOrigin, ( objParams || {}));

        for ( var item in objParams ) {
            listParams.push( item + '=' + objParams[ item ] );
        }

        return url + '?' + listParams.join( '&' );
    };

    utils.getObjectParamsUrl = function(strParams) {
        var objParams = {};

        if ( !strParams ) {
            return objParams;
        }

        strParams.split('&').forEach(function(item) {
            item               = item.split('=');
            objParams[item[0]] = ( item[1] || '' );
        });

        return objParams;
    };

    utils.nonce = function(length) {
        var chars  = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        var result = '';
        
        for (var i = 0; i < length; ++i) {
            var rnum = Math.floor(Math.random() * chars.length);
            result += chars.substring(rnum, rnum+1);
        }
        
        return result;
    };

    utils.timestamp = function() {
        var t = (new Date()).getTime() + 0;
        return Math.floor(t / 1000);
    };

    utils.HmacSHA1 = function(key, text) {
        return b64_hmac_sha1(key, text);
    };

    utils.defineConfig = function(options) {
        utils.extend(MURPHY.config, ( options || {} ));
    };
    
    context.utils = ( utils || context.utils );
})(window, MURPHY);

