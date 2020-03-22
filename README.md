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