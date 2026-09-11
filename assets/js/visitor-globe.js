// Visitor globe — lazy-loaded 3D globe showing where visitors come from.
//
// Design notes:
//  - Nothing is fetched until the globe scrolls into view (IntersectionObserver).
//    globe.gl is ~1.9MB, so eagerly loading it would defeat the purpose of having
//    removed the old blocking ClustrMaps script.
//  - All assets (globe.gl, topojson, visitor data) are loaded at that point only.
//  - Any failure degrades to a hidden container rather than a broken page.

(function () {
  'use strict';

  var GLOBE_JS = 'https://cdn.jsdelivr.net/npm/globe.gl@2/dist/globe.gl.min.js';
  var TOPOJSON_JS = 'https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js';

  var el = document.getElementById('visitor-globe');
  if (!el) return;

  var dataUrl = el.dataset.visitors;
  var worldUrl = el.dataset.world;
  var started = false;

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = function () {
        reject(new Error('failed to load ' + src));
      };
      document.head.appendChild(s);
    });
  }

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function start() {
    if (started) return;
    started = true;

    Promise.all([
      loadScript(GLOBE_JS),
      loadScript(TOPOJSON_JS),
      fetch(dataUrl).then(function (r) {
        return r.json();
      }),
      fetch(worldUrl).then(function (r) {
        return r.json();
      }),
    ])
      .then(function (results) {
        var visitors = results[2];
        var world = results[3];

        var land = topojson.feature(world, world.objects.countries);
        var points = visitors.points || [];
        var maxCount = points.reduce(function (m, p) {
          return Math.max(m, p.count || 1);
        }, 1);

        var size = el.clientWidth || 260;

        var globe = Globe()(el)
          .width(size)
          .height(size)
          .backgroundColor('rgba(0,0,0,0)')
          .showAtmosphere(true)
          .atmosphereColor(isDark() ? '#4a9eff' : '#3a8ee6')
          .atmosphereAltitude(0.18)
          .hexPolygonsData(land.features)
          .hexPolygonResolution(3)
          .hexPolygonMargin(0.45)
          .hexPolygonUseDots(true)
          .hexPolygonColor(function () {
            return isDark() ? 'rgba(110,150,200,0.55)' : 'rgba(70,110,160,0.55)';
          })
          .pointsData(points)
          .pointLat('lat')
          .pointLng('lng')
          .pointColor(function () {
            return '#ff4d6d';
          })
          .pointAltitude(function (d) {
            // sqrt keeps one busy city from dwarfing everything else
            return 0.04 + 0.18 * Math.sqrt((d.count || 1) / maxCount);
          })
          .pointRadius(0.35)
          .pointLabel(function (d) {
            var place = d.city ? d.city + ', ' + d.country : d.country;
            return '<div style="font:12px/1.4 -apple-system,sans-serif;background:rgba(0,0,0,.78);color:#fff;padding:5px 9px;border-radius:5px;white-space:nowrap">' +
              '<b>' + place + '</b><br>' + (d.count || 1) + ' visit' + ((d.count || 1) > 1 ? 's' : '') +
              '</div>';
          });

        // Slow idle spin; pause while the user is interacting.
        var controls = globe.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.55;
        controls.enableZoom = false;
        globe.pointOfView({ lat: 25, lng: 100, altitude: 2.4 });

        el.addEventListener('mouseenter', function () {
          controls.autoRotate = false;
        });
        el.addEventListener('mouseleave', function () {
          controls.autoRotate = true;
        });

        // Keep it square and responsive.
        window.addEventListener('resize', function () {
          var w = el.clientWidth || size;
          globe.width(w).height(w);
        });

        var cap = document.getElementById('visitor-globe-caption');
        if (cap) {
          var total = visitors.total || points.length;
          cap.textContent = total
            ? total + ' visitors · updated ' + (visitors.updated || '')
            : '';
        }
      })
      .catch(function (err) {
        // Never let a dead CDN leave a broken box on the page.
        if (window.console) console.warn('[visitor-globe]', err);
        var wrap = el.closest('.visitor-globe-wrap') || el;
        wrap.style.display = 'none';
      });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
  } else {
    start();
  }
})();
