MURPHY.CollectionWrapper('Posts', '/posts', function(Posts, getRoot, _, getJSON) {
    'use strict';

    Posts.fn.initialize = function() {};

    Posts.fn.get = function(params) {
        var send = getJSON(getRoot(), ( params || {} ));
        
        return send.then(
              this._success.bind(this)
            , this._error.bind(this)
        );
    };

    Posts.fn._success = function(response) {
        response.list = response.list.map(function(item) {
            return MURPHY.models.Post(item);
        });

        return response;
    };

    Posts.fn._error = function(error) {
        return error;
    };
});