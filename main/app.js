;(function(context, undefined) {
	'use strict';

	function MURPHY() {
		this.utils             = {};
		this.collections       = {};
		this.models            = {};		
		this.AjaxJSON          = function(){};
		this.ModelWrapper      = function(){};
		this.CollectionWrapper = function(){};

		//config
		this.config = {
			host           : null,			
			consumerKey    : null,
			consumerSecret : null,
			token          : null,
			tokenSecret    : null
		};
	};

	MURPHY.prototype.getRootJSON = function(root) {
		return this.config.host.replace(/\/?$/, '/') + 'wp-json' + ( root || '' );
	};

	MURPHY.prototype.getRootOAuth = function() {
		return this.config.host.replace(/\/?$/, '/') + 'oauth1';
	};

	context.MURPHY = ( context.MURPHY || new MURPHY() );
})(window);