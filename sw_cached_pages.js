const cacheName = 'v2';
const cacheAssets = [
	'index.html',
	'about.html',
	'favicon.ico',
	'/css/style.css',
	'/js/main.js'
];

// Call Install Event
self.addEventListener('install', (event) => {
	console.log('Service Worker Installed');

	// Good place to perform caching
	event.waitUntil(
		caches
			.open(cacheName)
			.then(cache => {
				console.log('Service Worker: Caching Files');
				cache.addAll(cacheAssets);
			})
			.then(() => self.skipWaiting())
	);
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
		fetch(event.request).catch(() => caches.match(event.request))
	);
});