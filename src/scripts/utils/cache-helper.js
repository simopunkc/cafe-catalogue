import 'regenerator-runtime';

importScripts('/workbox-v5.1.4/workbox-sw.js');
workbox.setConfig({
  modulePathPrefix: '/workbox-v5.1.4/',
});

import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { CacheableResponse } from 'workbox-cacheable-response';
import { precacheAndRoute } from 'workbox-precaching';

self.skipWaiting();
self.addEventListener('activate', () => {
  clients.claim();
});

precacheAndRoute(self.__WB_MANIFEST);

workbox.routing.registerRoute(
  /.*(?:googleapis\.com|gstatic\.com|dicoding\.dev|fontawesome\.com|bootstrapcdn\.com).*/,
  new StaleWhileRevalidate({
    cacheName: 'apiexternal',
    plugins: [
      new CacheableResponse({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 500,
      }),
    ],
  }),
);
workbox.routing.registerRoute(
  /\.(?:html|js)$/,
  new StaleWhileRevalidate({
    cacheName: 'updated',
    plugins: [
      new CacheableResponse({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 500,
      }),
    ],
  }),
);
workbox.routing.registerRoute(
  /\.(?:png|ico|jpg|jpeg|css|eot|json|ttf|woff|woff2|scss|webp|webm)$/,
  new CacheFirst({
    cacheName: 'statik',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 800,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  }),
);
