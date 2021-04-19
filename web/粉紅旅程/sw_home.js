// 引用workbox build
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

// 使用precache功能，在offline下也可以執行
// 要存進cache storage裡的檔案清單
var cacheFiles = [
  "static/img/favicon.ico",
  "static/img/logo.PNG",
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
  {
    url: './home_PWA.html',
    revision: '00000001' // 加revision，版本改了以後，sw.js 在 application 上會更新
  }
];
workbox.precaching.precacheAndRoute(cacheFiles);



// Add Range Request support to fetching videos from cache
workbox.routing.registerRoute(
  /.*\.mp4/,
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
      new workbox.rangeRequests.RangeRequestsPlugin(),
    ],
  }),
  'GET'
);
