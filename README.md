murphyjs
========

Library for integration with the [WP-API](https://github.com/WP-API/WP-API/). Embryonic project created to integrate with the WP-API easy way.

I have not met the WP-API? You may see the following guides.

* [Getting Started][]: Begin working with the API, and learn how to access basic
  post data.
* [Working with Posts][]: Explore more advanced usage of post-related data,
  including filtering and additional data.
* [Extending the API][]: Create your own API routes and endpoints in a plugin.

[Getting Started]: getting-started.md
[Working with Posts]: working-with-posts.md
[Extending the API]: extending.md

## Usage

   ```js
   MURPHY.utils.defineConfig({
			host           : 'http://www.wp-api.com/wp-json',
			consumerKey    : 'jRHgz4Fvn9t1',
			consumerSecret : 'AwliLU2Z8b7cpfoVYICfRgdK7n2GbbJR7gW0CNTjTgvmPTBp',
			token          : 'b0d2D6eiRQywH5tBMeAW07mu',
			tokenSecret    : 'ZJRtZdRjQZJ8oXlEbv4PPmU4Dd9n3EBxKEImVAZ8tFGvgj80'
	});

	//Create object collections posts
	var posts = MURPHY.collections.Posts();
	
	//Get Posts, read only
	posts.get().then(function(response) {
		//response
	});
   ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT License](http://opensource.org/licenses/MIT)

## Thanks

[Ryan McCue](https://github.com/rmccue)


