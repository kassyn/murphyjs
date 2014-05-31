;(function(global, context, _, undefined) {
	'use strict';

	function build() {
		var Constructor, Instance;

		Constructor = function(attributes) {
			var instance = new Instance();
			
			//extend the object attributes with the model WP-API
			instance.assign.call(null, instance, attributes);
			// Apply the initializer on the given instance.
			instance.initialize.apply(instance, _.slice.call(arguments, 1));

			return instance;
		};

		Instance           = function(){};
		Instance.prototype = Constructor.prototype;
		 
		// Save some typing and make an alias to the prototype.
		Constructor.fn = Constructor.prototype;

		// Define a noop initializer.
		Constructor.fn.initialize = function(){};
		Constructor.fn.assign     = _.extend;

		return Constructor;
	};

	var ModelWrapper = function(namespace, callback) {
		var scope = context.models[namespace] = build();
		
		callback.call(
			  scope
			, scope
			, _
		);

		return scope;
	};
	
	context.ModelWrapper = ( ModelWrapper || context.ModelWrapper );
})(window, MURPHY, MURPHY.utils);