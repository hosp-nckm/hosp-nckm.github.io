// 引用workbox build
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

// 使用precache功能，在offline下也可以執行
// 要存進cache storage裡的檔案清單
var cacheFiles = [
  "static/img/icon_192.jpg",
  "static/img/icon_128.jpg",
  "static/img/dog.jpg",
  "static/img/cat.jpg",
  "test.html",
  {
    url: './test.html',
    revision: '00000001' // 加revision，版本改了以後，sw.js 在 application 上會更新
  }
];
workbox.precaching.precacheAndRoute(cacheFiles); 

// Not shown: install and activate handlers to keep app-shell.html
// cached and up to date.
/*self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Always respond to navigations with the cached app-shell.html,
    // regardless of the underlying event.request.url value.
    event.respondWith(cacheFiles.match('test.html'));
  }
});*/


self.addEventListener('fetch', event => {
	const dataUrl = 'https://hosp-nckm.github.io/web/notify/';
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request).then(res =>
				// 存 caches 之前，要先打開 caches.open(dataCacheName)
				caches.open('v1')
				.then(function(cache) {
					// cache.put(key, value)
					// 下一次 caches.match 會對應到 event.request
					cache.put(event.request, res.clone());
					return res;
				})
			);
		})
	);
});
/*self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if(response) {
                return response;
            } else {
                return fetch(event.request);
            }
        })
    );
});*/


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
  "static/img/icon_192.jpg",
  "static/img/icon_128.jpg",
  "static/img/dog.jpg",
  "static/img/cat.jpg",
  "test.html"
      ]);
    })
  );
});
