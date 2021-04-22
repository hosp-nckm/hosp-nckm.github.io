new workboxPlugin.InjectManifest({
    swSrc: path.join(__dirname, '..', SRC_DIR, 'sw.js'),
    swDest: path.join(__dirname, '..', DIST_DIR, 'sw.js'),
    globDirectory: path.join(__dirname, '..', DIST_DIR),
    globPatterns: ['**/*.{js,css}']
}),
  
//sw.js
let precacheList = self.__precacheManifest || []
workbox.precaching.precacheAndRoute(precacheList)