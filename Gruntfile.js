module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	
	// Project configuration
	grunt.initConfig({
		concat: {
		    options: {
		      separator: ';',
		    },
		    dist: {
		      	src: [ 
					'third-party/*.js',
			      	'main/app.js',
			      	'main/utils.js',
			      	'main/ajax.js',
			      	'main/collection-wrapper.js',
			      	'main/model-wrapper.js',
			      	'models/*.js',
			      	'collections/*.js'
		     	],
		      	dest: 'build/murphy.js'
		    },
		},

		uglify: {
			options: {
				banner: '/*Build library murphy use in WP-API*/\n'
			},
			build: {
				src: 'build/murphy.js',
				dest: 'build/murphy.min.js'
			}
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				laxcomma: true,
				globals: {
					b64_hmac_sha1: true,
					RSVP: true,
					MURPHY: true
				}
			},
			files: [
		      	'main/app.js',
		      	'main/utils.js',
		      	'main/ajax.js',
		      	'main/collection-wrapper.js',
		      	'main/model-wrapper.js',
		      	'models/*.js',
		      	'collections/*.js'
		    ],
		}
	});

	// Dependencies	
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );

	// Default task
	grunt.registerTask( 'default', [ 'jshint', 'concat', 'uglify' ] );
};
