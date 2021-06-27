var preCacheFile = 'pre-v1.0.0'; // 存在 Cache Storage 的資料夾名，預存用
var autoCacheFile = 'PWA-v1.0.0'; // 存在 Cache Storage 的資料夾名稱，自動存用

// 一定要存下的檔案清單
// 比如 404.html、logo.svg，不會自動出現在每頁的 request 上，但當使用者是 offline 時又必要會看到的
const assets = [
  '/web/PWA_learn/?utm_source=PWA&utm_medium=home_screen&utm_campaign=pwa',
  '/web/PWA_learn/static/img/icon.png',
  '/web/PWA_learn/static/img/dog.jpg',
  '/web/PWA_learn/static/img/cat.jpg'
];

// 限制存進 Cache Storage 的檔案數量
var limitCacheSize = function(name, size) {
  caches.open(name).then(function(cache) {
    cache.keys().then(function(key) {

      // 如果 Cache Storage 的資料夾中檔案，超過了指定的數量，就從第一個檔案開始刪
      if(key.length > size) {
        cache.delete(key[0]).then(limitCacheSize(name, size));
      }

    })
  })
}

// install event
self.addEventListener('install', function(e) {
  self.skipWaiting();

  // pre-caches files
  e.waitUntil(
    caches.open(preCacheFile).then(cache => {
      cache.addAll(assets);
    })
  );

});

// activate event
self.addEventListener('activate', function(e) {
  e.waitUntil(
    // 刪除舊版 Cache 的參考來源：https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers
    caches.keys().then(function(keys) {

      // keys 就是在 Cache Storage 下一層的資料夾名。會是 Array，如 ['pre-v1.0.1', 'pre-v1.0.2']
      // 以下篩出資料夾名稱跟現有 preCacheFile、autoCacheFile 不一樣的，執行刪除動作
      return Promise.all(keys.map(function(key) {
        if(preCacheFile.indexOf(key) === -1 && autoCacheFile.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  )
});

// fetch event
self.addEventListener('fetch', function(e) {

  e.respondWith(

    // 先 Cache，然後 fetch Network 後更新到 Cache
    // 參考來源：https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-then-network
    caches.open(autoCacheFile).then(function(cache) {

      return fetch(e.request).then(function(response) {

        // Google AdSense、fbevent 的 JS 不 Cache
        var url = e.request.url;
        if(url.indexOf('ads') === -1 && url.indexOf('googlesyndication') === -1 && url.indexOf('fbevents') === -1) {

          // fetch 回來的 response 更新到 Cache
          // cache(key, value)。key 就是 request 的 url。value 就是 clone 一份 response 的結果
          cache.put(url, response.clone());

          // 限制 Cache Storage 資料夾中的儲存數量
          limitCacheSize(autoCacheFile, 200);

        }

        return response;

      })

    })
    // 離線模式下就抓 Cache
    .catch(() => {

      return caches.match(e.request);

      // 也可以寫，遇到什麼樣的網址，給指定的檔案
      // if(e.request.url.indexOf('.html') > -1) {
      //   return caches.match('/404.html');
      // }

    })
  )
});
