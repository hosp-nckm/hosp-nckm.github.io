// 引用workbox build
/*importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

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
workbox.precaching.precacheAndRoute(cacheFiles); */

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
				caches.open('notify_v1')
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
    caches.open('notify_v1').then((cache) => {
      return cache.addAll([
  "static/img/logo_192.jpg",
  "static/img/logo_128.jpg",
  "static/img/dog.jpg",
  "static/img/cat.jpg",
  "test.html"
      ]);
    })
  );
});

self.addEventListener('push', (event) => {
  event.waitUntil(self.registration.showNotification('Title', {    
            body: 'PWA的世界',
            icon: 'static/img/dog.jpg',
            image: 'static/img/dog.jpg',
            dir: 'ltr',
            lang: 'zh-Hant', //BCP 47
            vibrate: [100, 50, 200],
            badge: 'static/img/dog.jpg',
            tag: 'confirm-notification',
            renotify: true,
            actions: [
                { action: 'confirm', title: '確認', icon: 'static/img/cat.jpg'},
                { action: 'cancel', title: '取消', icon: 'static/img/cat.jpg'}
            ]
  }));
});

function displayDiv() {    
    d = new Date();
    if(12 === d.getHours()){
        console.log("Y");//idMain.style.display = 'block';
    } else {
        console.log("N");
        self.registration.showNotification('Title', {    
            body: 'PWA的世界',
            icon: 'static/img/dog.jpg',
            image: 'static/img/dog.jpg',
            dir: 'ltr',
            lang: 'zh-Hant', //BCP 47
            vibrate: [100, 50, 200],
            badge: 'static/img/dog.jpg',
            tag: 'confirm-notification',
            renotify: true,
            actions: [
                { action: 'confirm', title: '確認', icon: 'static/img/cat.jpg'},
                { action: 'cancel', title: '取消', icon: 'static/img/cat.jpg'}
            ]
        })
  //idMain.style.display = 'none';
        
    }
}
setInterval(displayDiv, 5000);



/*self.addEventListener('push', (event) => {  
  pushConfig={
    "endpoint": "https://fcm.googleapis.com/fcm/send/ek45rG8fz4U:APA91bFyGgXEBki5uM6ewHo_fJC9REyXDVopuaRGJVDoT_FjxxXBWQDnUjy5zWZUp6LrcOei-u-JKJENs7COE71iWks1J_2kHMX6HDawFTxRh47ZDiFmWm5wtnlicKqqS6p1aYS1Ensh",
    "expirationTime": null,
    "keys": {
        "p256dh": "BKC2UQSiQN70NfhYnDImsc5B5c0z3Q6KbD3QdByWLoK5XLXa4gqHVtCOyY13zvVVqyF7EofFon5SYGw1DrM-bOA",
        "auth": "p929DZ6VUq1nlYq46aupPg"
    }
}
  event.waitUntil(self.registration.sendNotification(pushConfig, JSON.stringify({title: '回來逛逛哦', content: '再撐一下就到30天啦'}))
  .catch(function(err){
      console.log('Server 推播失敗',err);
  }));
});*/

getAllPosts().then(response => {
    console.log("response : ",response);
}).catch(e => {
    console.log("e : ",e);
});

self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    var action = event.action;
    
    console.log(notification);
    if(action === 'confirm') {
        console.log('使用者點選確認');
        notification.close();
    } else {
        console.log(action);
    }
});

self.addEventListener('notificationclose', function(event){
    console.log('使用者沒興趣',event);
});
