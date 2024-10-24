// **Template code last revised: 08/30/21

const staticCacheName = 'Beauty Pro Rewards_pwa_cache-v-01.01';
const dynamicCacheName = 'Beauty Pro Rewards_pwa_dynamic_cache-v-01.01';
const dynamicCacheSize = 10;
const offlineFilename = './offline.html';
const showDebugInfo = true;
const usingFirestore = false;
const usingOneSignalPush = false;

var filesToCache = [
 './css/A5System/default/tree/b.png',
'./css/A5System/default/tree/bc.png',
'./css/A5System/default/tree/bcf.png',
'./css/A5System/default/tree/bcl.png',
'./css/A5System/default/tree/bo.png',
'./css/A5System/default/tree/bof.png',
'./css/A5System/default/tree/bol.png',
'./css/A5System/default/tree/l.png',
'./css/A5System/default/tree/lf.png',
'./css/A5System/default/tree/ll.png',
'./css/A5System/default/tree/n.png',
'./css/A5System/default/theme.css',
'./css/A5System/default/theme.js',
'./css/A5System/GenericStyles/Default/AccordionTitle.png',
'./css/A5System/GenericStyles/Default/AccordionTitleHover.png',
'./css/A5System/GenericStyles/Default/ListHighlight.png',
'./css/A5System/GenericStyles/Default/ListSelected.png',
'./css/A5System/GenericStyles/Default/style.css',
'./css/A5System/GenericStyles/Default/TabbandBackground.png',
'./css/A5System/GenericStyles/Default/TabBottomSelected.png',
'./css/A5System/GenericStyles/Default/TabLeftSelected.png',
'./css/A5System/GenericStyles/Default/TabRightSelected.png',
'./css/A5System/GenericStyles/Default/TabTopSelected.png',
'./css/A5System/GenericStyles/Default/WindowButtonGrad.png',
'./css/A5System/GenericStyles/Default/WindowButtonsGrad.png',
'./css/A5System/GenericStyles/Default/WindowMainGrad.png',
'./css/A5System/GenericStyles/Default/WindowTrans.png',
'./css/A5System/GenericStyles/Default/WindowTransHighlight.png',
'./css/A5System/GenericStyles/Default/WindowTransHighlightBottom.png',
'./css/A5System/Images/designModeDropOff.png',
'./css/A5System/Images/designModeDropOn.png',
'./css/A5System/Images/designModeIcons.png',
'./css/A5System/Images/designModeIconsHover.png',
'./css/A5System/Images/designModeTip.png',
'./css/A5System/Images/loading.gif',
'./css/A5System/Images/menuCheck.png',
'./css/A5System/Images/menuRadio.png',
'./css/A5System/Images/resizeThumb.gif',
'./css/A5System/Images/spinner1.gif',
'./css/A5System/Images/spinner2.gif',
'./css/A5System/Images/tabclose.png',
'./css/A5System/Images/tabcloseHover.png',
'./css/A5System/Images/wait.gif',
'./css/A5System/reportStyles/Minimal.css',
'./css/A5System/reportStyles/RoundedBandedBlue.css',
'./css/A5System/reportStyles/RoundedBandedGray.css',
'./css/A5System/reportStyles/RoundedBandedOlive.css',
'./css/A5System/reportStyles/RoundedBandedTan.css',
'./css/A5System/reportStyles/RoundedBlue.css',
'./css/A5System/reportStyles/RoundedGray.css',
'./css/A5System/reportStyles/RoundedOlive.css',
'./css/A5System/reportStyles/RoundedTan.css',
'./css/A5System/reportStyles/SquareBanded.css',
'./css/A5System/reportStyles/SquareBandedBlue.css',
'./css/A5System/reportStyles/SquareBandedGray.css',
'./css/A5System/reportStyles/SquareBandedOlive.css',
'./css/A5System/reportStyles/SquareBandedTan.css',
'./css/A5System/reportStyles/SquareBlue.css',
'./css/A5System/reportStyles/SquareGray.css',
'./css/A5System/reportStyles/SquareOlive.css',
'./css/A5System/reportStyles/SquareTan.css',
'./css/A5System/Vista/tree/bc.png',
'./css/A5System/Vista/tree/bch.png',
'./css/A5System/Vista/tree/bo.png',
'./css/A5System/Vista/tree/boh.png',
'./css/A5System/Vista/tree/n.png',
'./css/A5System/Vista/theme.css',
'./css/A5System/Vista/theme.js',
'./css/Alpha-Dark-Green/accentEditBorder.png',
'./css/Alpha-Dark-Green/accentForeEditBorder.png',
'./css/Alpha-Dark-Green/contrastEditBorder.png',
'./css/Alpha-Dark-Green/headerEditBorder.png',
'./css/Alpha-Dark-Green/spinListBack.png',
'./css/Alpha-Dark-Green/style.css',
'./css/Alpha-Dark-Green/style.dat',
'./css/Alpha-Dark-Green/style.js',
'./css/Alpha-Dark-Green/styleInherit.json',
'./css/_sharedStyles/style.css',
'./icons/favicon-16x16.png',
'./icons/favicon-32x32.png',
'./icons/icon-120.png',
'./icons/icon-128.png',
'./icons/icon-144.png',
'./icons/icon-152.png',
'./icons/icon-180.png',
'./icons/icon-192.png',
'./icons/icon-384.png',
'./icons/icon-512.png',
'./icons/icon-72.png',
'./icons/icon-96.png',
'./javascript/a5.js',
'./javascript/a5_url.js',
'./svg/AASVG.js',
'./manifest.json',
'./Morph Color Animations.gif',
'./index.html',

];


// limitCacheSize function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', function(e) {
  if (showDebugInfo) console.log('** service worker installed.');
  e.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      if (showDebugInfo) console.log('** service worker caching all assets.');
      return cache.addAll(filesToCache);
    })
  );
});


// activate event
self.addEventListener('activate', evt => {
  if (showDebugInfo) console.log('** service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});


// fetch event
self.addEventListener('fetch', evt => {
  if (showDebugInfo) console.log('** service worker fetch event', evt);
 
  /*
   **  skip the fetch request for certain url's
   **  chrome:extensions cause errors here
   **  do not cache results from Firestore
   **  do not cache OneSignal SDK's or API's
  */
  
  const requests = ['chrome-extension'];
  if (usingFirestore) {
  	requests.push('firestore.googleapis.com');
  }
  
  if (usingOneSignalPush) {
  	requests.push('sdks');
  	requests.push('apis');	
  	requests.push('onesignal.com');	
  }
  
 const makeRequest = requests.every(request => {
        return evt.request.url.indexOf(request) === -1;
  });

  if (showDebugInfo) console.log('makeRequest = '+makeRequest + " : " + evt.request.url);
  
  if (makeRequest) {
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone());
            // check cached items size
            limitCacheSize(dynamicCacheName, dynamicCacheSize);
            return fetchRes;
          })
        });
      }).catch(() => {
		if ((evt.request.url.indexOf('.html') > -1) || (evt.request.url.indexOf('.a5w') > -1)){
        	return caches.match(offlineFilename);
      	}     
      })
    );
  }; 
});



