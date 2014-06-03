;(function(global, context, _, undefined) {
    'use strict';

    function build() {
        var Constructor, Instance;

        Constructor = function(attributes) {
            var instance = new Instance();

            // Apply the initializer on the given instance.
            instance.initialize.apply(instance, arguments);

            return instance;
        };

        Instance           = function(){};
        Instance.prototype = Constructor.prototype;
         
        // Save some typing and make an alias to the prototype.
        Constructor.fn = Constructor.prototype;

        // Define a noop initializer.
        Constructor.fn.initialize = function(){};       

        return Constructor;
    }

    var CollectionWrapper = function(namespace, root, callback) {
        var scope = context.collections[namespace] = build();
        
        callback.call(
              scope
            , scope
            , _.proxy(MURPHY, 'getRootJSON', root)
            , _
            , MURPHY.getJSON
        );  

        return scope;
    };
    
    context.CollectionWrapper = ( CollectionWrapper || context.CollectionWrapper );
})(window, MURPHY, MURPHY.utils);