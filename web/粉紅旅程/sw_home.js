// 引用workbox build
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

// 使用precache功能，在offline下也可以執行
// 要存進cache storage裡的檔案清單
var cacheFiles = [
  "static/img/favicon.ico",
  "static/img/logo.PNG",
  "static/img/icon_192.png",
  "static/img/icon_128.png",
  "static/js/html2canvas.js",
  "static/js/jsPdf.debug.js",
  "static/js/RowSorter.js",
  "static/img/menu_1.png",
  "static/img/menu_2.png",
  "static/img/menu_3.png",
  "static/img/menu_4.png",
  "static/img/menu_5.png",
  "static/img/menu_6.png",
  "static/img/menu_7.png",
  "static/img/menu_8.png",
  "static/img/menu_9.png",
  "static/img/menu_10.png",
  "static/img/turn_pre.PNG",
  "static/img/turn_next.PNG",
  "static/img/add.png",
  "static/img/print.png",
  "static/img/video_loading.png",
  "static/img/onclick.png",
  "static/img/intro_item.PNG",
  "static/video/乳房重建 台語版 最新版1_1.mp4",
  "static/video/乳房重建衛教影片 國語版 實驗組 最新版_1.mp4",
  "https://code.jquery.com/jquery-3.5.0.js",
  "home_PWA.html",
  {
    url: './home_PWA.html',
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
    event.respondWith(cacheFiles.match('home_PWA.html'));
  }
});*/


self.addEventListener('fetch', event => {
	const dataUrl = 'https://hosp-nckm.github.io/web/%E7%B2%89%E7%B4%85%E6%97%85%E7%A8%8B/';
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
  "static/img/favicon.ico",
  "static/img/logo.PNG",
  "static/img/icon_192.png",
  "static/img/icon_128.png",
  "static/js/html2canvas.js",
  "static/js/jsPdf.debug.js",
  "static/js/RowSorter.js",
  "static/img/menu_1.png",
  "static/img/menu_2.png",
  "static/img/menu_3.png",
  "static/img/menu_4.png",
  "static/img/menu_5.png",
  "static/img/menu_6.png",
  "static/img/menu_7.png",
  "static/img/menu_8.png",
  "static/img/menu_9.png",
  "static/img/menu_10.png",
  "static/img/turn_pre.PNG",
  "static/img/turn_next.PNG",
  "static/img/add.png",
  "static/img/print.png",
  "static/img/video_loading.png",
  "static/img/onclick.png",
  "static/img/intro_item.PNG",
  "static/video/乳房重建 台語版 最新版1_1.mp4",
  "static/video/乳房重建衛教影片 國語版 實驗組 最新版_1.mp4",
  "https://code.jquery.com/jquery-3.5.0.js",
  "home_PWA.html",
  "https://cors-anywhere.herokuapp.com/https://www.youtube.com/embed/mrIyB_U2JrQ"
      ]);
    })
  );
});
