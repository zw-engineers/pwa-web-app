// Make sure sw are supported.
if ('serviceWorker' in navigator) {
	// We want to register service worker when the window loads.
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('../sw_cached_pages.js')
			.then(() => console.log('Service worker is registered.'))
			.catch(err => console.log(`Service Worker failed to register: ${err}`));
	});
}