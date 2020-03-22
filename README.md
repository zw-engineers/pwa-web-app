# pwa-web-app

## Pre-requisites

- Node JS (v 11+ preferred)
- http-server ( Run `npm install http-server -g` in your terminal/commandline)

## How to start the application

- Run `http-server`
- Go to your browser and type `localhost:8080`

# What is a Service Worker?

- A JS script that gets registered with the browser.
- Stays registered with the browser even when offline.
- Can load content even with no connection.
- They cannot directly access the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).
- Programmable [network proxy](https://en.wikipedia.org/wiki/Proxy_server).
- Terminated when not being used.
- Make use of [`promises`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
- Require [`HTTPS`](https://en.wikipedia.org/wiki/HTTPS) unless you're on `localhost`

## Normal Request & Response

`Browser` -> `Remove Server`

- Requests just go to a remote server.

## With Service Worker

`Browser` -> `Service Worker` -> `Remote Server`

- When you have a service worker registered. All requests pass through 
the service worker to the remote server and the same is for the response
through the service worker to the browser.

- The reason for this is that the service worker intercepts the request
and decides what to do with the request. There are a few strategies that can
be applied to service workers and how to deal with requests and so, these 
strategies are applied and executed when the service worker intercepts
requests. One example could be applying a [network-first strategy](https://developers.google.com/web/tools/workbox/modules/workbox-strategies).
This strategy is triggered when the service worker intercepts the request
from the browser.

# Use Cases

- Caching assets & [API](https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/) calls.
- Push Notifications ([Push](https://developer.mozilla.org/en-US/docs/Web/API/Push_API) & [Notification](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) API).
- Background data sync/preload.
- Used in progressive web apps.

# Service Worker Lifecycle & Events

- `REGISTER` -> `INSTALL` -> `ACTIVATE`
- `INSTALL`: Triggers `install` event.
- `ACTIVATE`: Triggers `activate` event.
- Service workers can receive message events and functional events such as:
    - `fetch`
    - `push` - for example used for push notifications 
    - `sync` - for the background sync api.
    
# Browser Supprt

- Now [supported in all major browsers](https://caniuse.com/#search=serviceworkers).
- Most easily developed in Google Chrome with Devtools.
- At this time (March 2020) the [background sync](https://caniuse.com/#search=syncevent) is 
not yet supported in other browsers other than Chrome and partly in Egde browsers.

# Register Service Worker

In our `main.js` file we can register our service worker file to be used with 
our application. The service worker file we created is called `sw_cached_pages.js`
and it is just a javascript file. However, all of our service worker logic will
be implemented in that file. But before we do that, we have to register the 
service worker so that our browser will know that we are using a service worker.

In our `main.js` file we register the service worker as follows:

## Check Service Worker support

Before we register a service worker, it's worth checking if the browser you are 
using supports service workers otherwise, all the work we will do will be done for
nothing. 

We can check if our browser support service workers by:
- Checking the [`navigator`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator) object and 
check if `serviceWorker` exists.
- Or is `navigator.serviceWorker` exists. 
 
```javascript
if ('serviceWorker' in navigator) {
    // Register Service Worker here ...	
}
```

or 

```javascript
if (navigator.serviceWorker) {
    // Register Service Worker here...
}
```

## Register Service Worker

Once we have established that our browser support service workers, we can 
register our service worker file that will contain all of our service 
worker logic. 

It is also important to note that we should think about the [web event](https://developer.mozilla.org/en-US/docs/Web/Events)
we would want to apply our script to register our service worker. In our case
we would want to apply our script at the [`load`](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) event.

To do this we need to apply an [`EventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) as below:

```javascript
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
            // Apply logic to register service worker here...
	});
}
```

Within our `EventListener`, we can now register our service worker as below:
```javascript
if ('serviceWorker' in navigator) {
	// We want to register service worker when the window loads.
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('../sw_cached_pages.js')
			.then(() => console.log('Service worker is registered.'))
			.catch(err => console.log(`Service Worker failed to register: ${err}`));
	});
}
```

Note that it is a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) so we can apply logic
after the promise is [resolved](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) successfully by using the [`then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) method.
Should the promise fail for any reason, we can apply logic after the promise failure
in the [`catch()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) method.

# sw.js

## Service Worker Install Lifecycle

We can apply logic to be executed in the [`install`](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#install) lifecycle of a 
service worker. We have to apply it in an `eventlistener` of the service worker
as below:

```javascript
// Call Install Event
self.addEventListener('install', (event) => {
	console.log('Service Worker Installed');
    // Apply logic here to be executed in the install lifecycle...
});
```

## Service Worker Activate Lifecycle

We can also apply logic to be executed in the [`activate`](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#activate) lifecycle of a service worker.
We have to also apply this in an `eventlistener` of the service worker as below:

```javascript
// Call Activate Event
self.addEventListener('activate', (event) => {
	console.log('Service Worker activated');
});
```