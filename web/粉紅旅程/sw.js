// 引用workbox build
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

// 使用precache功能，在offline下也可以執行
// 要存進cache storage裡的檔案清單
var cacheFiles = [
  "./static/video/乳房重建衛教影片 國語版 實驗組 最新版_1.mp4",
  "static/img/logo.PNG",
  /*"assets/bootstrap.min.css",
  "assets/bootstrap.min.js",
  "assets/jquery-3.3.1.slim.min.js",
  "assets/test.jpg",*/
  {
    url: './home.html',
    revision: '00000001' // 加revision，版本改了以後，sw.js 在 application 上會更新
  }
];
workbox.precaching.precacheAndRoute(cacheFiles);
