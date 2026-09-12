// Visitor globe — lazy-loaded 3D globe showing where visitors come from.
//
// Design notes:
//  - Nothing loads until the globe scrolls into view (IntersectionObserver).
//    globe.gl is ~1.9MB, so eager loading would undo the speedup we got from
//    dropping the old blocking ClustrMaps script.
//  - Earth textures are vendored under assets/img/globe/ rather than pulled
//    from a CDN: the ClustrMaps outage showed how a third-party host going
//    dark takes the whole widget with it.
//  - Any failure hides the container instead of leaving a broken box.

(function () {
  'use strict';

  var GLOBE_JS = 'https://cdn.jsdelivr.net/npm/globe.gl@2/dist/globe.gl.min.js';

  var el = document.getElementById('visitor-globe');
  if (!el) return;

  var dataUrl = el.dataset.visitors;
  var earthUrl = el.dataset.earth;
  var bumpUrl = el.dataset.bump;
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

  // Visitor points ramp cool -> hot with visit count. Warm hues read well
  // against the blue oceans of the Blue Marble texture.
  var RAMP = ['#4cc9f0', '#7bdff2', '#ffd60a', '#ff8500', '#ff4d6d'];

  function pointColor(d, maxCount) {
    var t = Math.sqrt((d.count || 1) / maxCount); // sqrt: one busy city shouldn't dominate
    var i = Math.round(t * (RAMP.length - 1));
    return RAMP[Math.max(0, Math.min(RAMP.length - 1, i))];
  }

  function hexToRgba(hex, alpha) {
    var h = hex.replace('#', '');
    return (
      'rgba(' +
      parseInt(h.substring(0, 2), 16) + ',' +
      parseInt(h.substring(2, 4), 16) + ',' +
      parseInt(h.substring(4, 6), 16) + ',' +
      Math.max(0, alpha).toFixed(3) +
      ')'
    );
  }

  function start() {
    if (started) return;
    started = true;

    Promise.all([
      loadScript(GLOBE_JS),
      fetch(dataUrl).then(function (r) {
        return r.json();
      }),
    ])
      .then(function (results) {
        var visitors = results[1];
        var points = visitors.points || [];
        var maxCount = points.reduce(function (m, p) {
          return Math.max(m, p.count || 1);
        }, 1);

        var size = el.clientWidth || 280;

        var globe = Globe()(el)
          .width(size)
          .height(size)
          .backgroundColor('rgba(0,0,0,0)')
          .globeImageUrl(earthUrl)
          .bumpImageUrl(bumpUrl)
          .showAtmosphere(true)
          .atmosphereColor('#8ab4ff')
          .atmosphereAltitude(0.17)
          .pointsData(points)
          .pointLat('lat')
          .pointLng('lng')
          .pointColor(function (d) {
            return pointColor(d, maxCount);
          })
          .pointAltitude(function (d) {
            return 0.02 + 0.12 * Math.sqrt((d.count || 1) / maxCount);
          })
          .pointRadius(0.28)
          .pointLabel(function (d) {
            var place = d.city ? d.city + ', ' + d.country : d.country;
            var n = d.count || 1;
            return (
              '<div style="font:12px/1.4 -apple-system,BlinkMacSystemFont,sans-serif;' +
              'background:rgba(0,0,0,.8);color:#fff;padding:5px 9px;border-radius:5px;' +
              'white-space:nowrap"><b>' + place + '</b><br>' + n +
              ' visit' + (n > 1 ? 's' : '') + '</div>'
            );
          })
          // Soft halo under each point so activity reads at a glance.
          .ringsData(points)
          .ringLat('lat')
          .ringLng('lng')
          .ringColor(function (d) {
            var base = pointColor(d, maxCount);
            return function (t) {
              return hexToRgba(base, 1 - t);
            };
          })
          .ringMaxRadius(function (d) {
            return 1.2 + 2.2 * Math.sqrt((d.count || 1) / maxCount);
          })
          .ringPropagationSpeed(0.7)
          .ringRepeatPeriod(2400);

        // Soften the default lighting a touch — the stock setup blows out
        // the daylight side of the Blue Marble texture.
        try {
          var scene = globe.scene();
          scene.children.forEach(function (c) {
            if (c.type === 'AmbientLight') c.intensity = 1.1;
            if (c.type === 'DirectionalLight') c.intensity = 0.7;
          });
        } catch (e) {
          /* lighting is cosmetic; ignore if the API shifts */
        }

        var controls = globe.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.45;
        controls.enableZoom = false;
        globe.pointOfView({ lat: 22, lng: 105, altitude: 2.3 });

        el.addEventListener('mouseenter', function () {
          controls.autoRotate = false;
        });
        el.addEventListener('mouseleave', function () {
          controls.autoRotate = true;
        });

        window.addEventListener('resize', function () {
          var w = el.clientWidth || size;
          globe.width(w).height(w);
        });

        // Summary stays hidden until the globe is clicked, so the page isn't
        // cluttered by a stat nobody asked for.
        var cap = document.getElementById('visitor-globe-caption');
        if (cap) {
          var total = visitors.total || points.length;
          var summary = total
            ? total + ' visitors · updated ' + (visitors.updated || '')
            : '';
          if (summary) {
            el.style.cursor = 'pointer';
            el.title = 'Click to show visitor stats';
            el.addEventListener('click', function () {
              var shown = cap.textContent !== '';
              cap.textContent = shown ? '' : summary;
              el.title = shown ? 'Click to show visitor stats' : 'Click to hide';
            });
          }
        }
      })
      .catch(function (err) {
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
