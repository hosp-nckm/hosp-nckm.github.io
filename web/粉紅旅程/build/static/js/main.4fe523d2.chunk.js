(this.webpackJsonppinkjourney=this.webpackJsonppinkjourney||[]).push([[0],[function(n,t){self.addEventListener("install",(function(n){self.skipWaiting();var t=new Request("home_PWA_v1.html");n.waitUntil(fetch(t).then((function(n){return caches.open("offline2").then((function(e){return e.put(t,n)}))})))})),self.addEventListener("fetch",(function(n){n.respondWith(fetch(n.request).catch((function(n){return caches.open("offline2").then((function(n){return n.match("offline.html")}))})))})),self.addEventListener("refreshOffline",(function(n){return caches.open("offline2").then((function(t){return t.put(offlinePage,n)}))})),self.addEventListener("push",(function(n){var t=n.data.json(),e={body:t.body,icon:t.icon,data:{url:t.url}};n.waitUntil(self.registration.showNotification(t.title,e))})),self.addEventListener("notificationclick",(function(n){var t=n.notification.data;n.notification.close(),n.waitUntil(clients.openWindow(t.url))}))}],[[0,1]]]);
//# sourceMappingURL=main.4fe523d2.chunk.js.map