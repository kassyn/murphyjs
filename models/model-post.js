MURPHY.ModelWrapper('Post', function(Post, _) {
    'use strict';
    
    Post.fn.initialize = function() {

    };

    Post.fn.getImage = function(size) {     
        var sizes = this.getSizesImage();

        return ( sizes && sizes[size] ).url;
    };

    Post.fn.getSizesImage = function() {
        if ( !this.featured_image || !this.featured_image.attachment_meta ) {
            return false;
        }

        return this.featured_image.attachment_meta.sizes;
    };

    Post.fn.getPostMeta = function(key, single) {
        var filter = [];

        if ( !_.isArray(this.post_meta) ) {
            return null;
        }

        filter = this.post_meta.filter(function(item) {
            return ( item.key === key );
        });

        return ( single ) ? filter[0] : filter;
    };
});