self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('c1').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/common.css',
                '/views/about.html',
                '/views/code.html',
                '/views/home.html',
                '/views/notfound.html',
                '/views/team.html'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    let x = event.request.url;
    let y = event.request.referrer;
    // console.log(x.substring(y.length, x.length));
    if (x.substring(y.length, x.length) == 'views/challenges.html') {
        event.respondWith(fetch(event.request));
        console.log('challenges loaded');
    }
    else if (x.substring(0, 6) == 'chrome') { }
    else {
        event.respondWith(
            caches.open('c1').then(function (cache) {
                return cache.match(event.request).then(function (response) {
                    return response || fetch(event.request).then(function (response) {
                        try { cache.put(event.request, response.clone()); }
                        catch (e) { console.log(e) }
                        return response;
                    });
                });
            })
        );
    }
});