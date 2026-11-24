/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-970124e6'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "index.html",
    "revision": "358fe9adfae26258b26c0e1c9f86e4ac"
  }, {
    "url": "icon.svg",
    "revision": "82fc187f143df06c73c1908a6c6f496c"
  }, {
    "url": "assets/vocab-data-CH2dyHGg.js",
    "revision": null
  }, {
    "url": "assets/vendor-zip-tTYc3m7e.js",
    "revision": null
  }, {
    "url": "assets/vendor-react-ChYMEHz3.js",
    "revision": null
  }, {
    "url": "assets/rolldown-runtime-pP25SEvz.js",
    "revision": null
  }, {
    "url": "assets/index-DJNkTQJ-.js",
    "revision": null
  }, {
    "url": "assets/index-D2I49Xlx.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "fa5143989fc0df6b5337817e84dd52c9"
  }, {
    "url": "pwa-192x192.png",
    "revision": "a7c6d9cef3bcfbdef2724d84f19c54f1"
  }, {
    "url": "pwa-512x512.png",
    "revision": "fb10f92b245b69dfebc95d9ce4e2f389"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "fb10f92b245b69dfebc95d9ce4e2f389"
  }, {
    "url": "manifest.webmanifest",
    "revision": "9f005ec77167d8aef66376b20e1c21c5"
  }], {
    "ignoreURLParametersMatching": [/.*/]
  });
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    denylist: [/^\/__\/auth/, /^\/__\/firebase/, /vocab-offline\.html$/, /\.zip$/]
  }));
  workbox.registerRoute(({
    url,
    sameOrigin
  }) => sameOrigin && !url.pathname.endsWith(".zip") && !url.pathname.endsWith("vocab-offline.html"), new workbox.NetworkFirst({
    "cacheName": "vocab-local-runtime",
    "networkTimeoutSeconds": 4,
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 120,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
