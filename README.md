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
requests. One example could be applying a [network first strategy](https://developers.google.com/web/tools/workbox/modules/workbox-strategies).
This strategy is triggered when the service worker intercepts the request
from the browser.