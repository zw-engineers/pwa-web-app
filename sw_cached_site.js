const cacheName = 'v2';

// Call Install Event
self.addEventListener('install', (event) => {
	console.log('Service Worker Installed');
});

// Call Activate Event
self.addEventListener('activate', (event) => {
	console.log('Service Worker activated');

	// Good place to perform cache cleanup i.e. clean up any old cache.

	// Remove unwanted caches
	event.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cache => {
						if (cache !== cacheName) {
							console.log('Service Worker: Clearing Old Caches');
							return caches.delete(cache);
						}
					})
				)
			})
	);
});

// Call Fetch Event
self.addEventListener('fetch', (event) => {
	// Good place to serve our cached files when we are offline
	console.log('Service Worker: Fetching');
	event.respondWith(
		fetch(event.request)
			.then(response => {
				// Make copy/clone of response
				const responseClone = response.clone();
				// Open a cache
				caches
					.open(cacheName)
					.then(cache => {
						// Add response to cache
						cache.put(event.request, responseClone)
							.then(response => response);
					});
				return response;
			}).catch(() => {
			caches.match(event.request)
				.then(response => response);
		})
	);
});