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
	const dataUrl = 'https://hosp-nckm.github.io/web/notification_izooto/';
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request).then(res =>
				// 存 caches 之前，要先打開 caches.open(dataCacheName)
				caches.open('notification_izooto_v1')
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


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('notification_izooto_v1').then((cache) => {
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
  event.waitUntil(self.registration.showNotification('看診提醒：提醒您今天要回診', {    
            body: '檢查項目為：超音波檢查抽血',
            icon: 'static/img/dog.jpg',
            image: 'static/img/dog.jpg',
            dir: 'ltr',
            lang: 'zh-Hant', //BCP 47
            vibrate: [100, 50, 200],
            badge: 'static/img/dog.jpg',
            tag: 'confirm-notification',
            renotify: true,
            actions: [
                { action: 'confirm', title: '了解', icon: 'static/img/cat.jpg'},
                /*{ action: 'cancel', title: '取消', icon: 'static/img/cat.jpg'}*/
            ]
  }));
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

const formatDate = (current_datetime)=>{
  let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
  return formatted_date;
}

function notify(day,item) { 
	//Notify_start=localS
	console.log("notify() 執行");//idMain.style.display = 'block';        
	self.registration.showNotification('看診提醒：提醒您'+day+'要回診', {    
			body: '檢查項目為：'+item,
			icon: 'static/img/dog.jpg',
			image: 'static/img/dog.jpg',
			dir: 'ltr',
			lang: 'zh-Hant', //BCP 47
			vibrate: [100, 50, 200],
			badge: 'static/img/dog.jpg',
			tag: 'confirm-notification',
			renotify: true,
			actions: [
				{ action: 'confirm', title: '確定', icon: 'static/img/cat.jpg'},
				{ action: 'cancel', title: '取消', icon: 'static/img/cat.jpg'}
			]
	})
}

const channel = new BroadcastChannel('sw-messages');
function Broadcast(msg_s2c){
	// From service-worker.js:
  //const channel = new BroadcastChannel('sw-messages');
  channel.postMessage({Broadcast_s2c: msg_s2c});
}

//var msg_start=0;
//var Notify_start = new Date("2021-01-01 00:00:00".replace(/\-/g, "/"));
// in the service worker
//Broadcast Message
channel.onmessage = function (event) {
	//console.log('BC_msg',event.data);
        if(event.data.client=='1'){		
		console.log("Broadcast rec =1");
		//notify(event.data.day,event.data.item);
	}
	if(event.data.main=='ask'){
		Broadcast("check_time");
	}
	else{
		console.log("main_wrong",event.data);
	}
};

//Single Message
self.addEventListener('message', event => {
	//console.log('BC_msg',event.data);
	if(event.data.main=='ask'){
		console.log("single rec =ask");
	}
	if(event.data.client=='1'){		
		console.log("yes_due");
		notify(event.data.day,event.data.item);
	}
	else{
		console.log("not_due",event.data);
	}
});
//setInterval(Broadcast, 30000);
