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

  // Distinct hue per continent-ish longitude band, so the globe reads as
  // colourful rather than a single flat tint.
  var LAND_COLORS = [
    '#e9724d', // Americas  (west)
    '#d64550', // Americas  (east)
    '#8e6cb0', // Atlantic / W Africa
    '#4a90d9', // Europe / Africa
    '#2fa4a0', // Middle East / C Asia
    '#3fae6b', // S / E Asia
    '#c9a227', // Pacific / Oceania
  ];

  function landColor(feature) {
    // Pick a band from the polygon's first coordinate — cheap and stable.
    var lng = 0;
    try {
      var c = feature.geometry.coordinates;
      while (Array.isArray(c[0])) c = c[0];
      lng = c[0];
    } catch (e) {
      /* fall through to band 0 */
    }
    var idx = Math.floor(((lng + 180) / 360) * LAND_COLORS.length);
    idx = Math.max(0, Math.min(LAND_COLORS.length - 1, idx));
    return LAND_COLORS[idx];
  }

  // Visitor points ramp cool -> hot with visit count.
  var POINT_RAMP = ['#4cc9f0', '#4895ef', '#b5179e', '#f72585', '#ff8500', '#ffd60a'];

  function pointColor(d, maxCount) {
    var t = Math.sqrt((d.count || 1) / maxCount); // sqrt: don't let one city dominate
    var idx = Math.round(t * (POINT_RAMP.length - 1));
    return POINT_RAMP[Math.max(0, Math.min(POINT_RAMP.length - 1, idx))];
  }

  function hexToRgba(hex, alpha) {
    var h = hex.replace('#', '');
    var r = parseInt(h.substring(0, 2), 16);
    var g = parseInt(h.substring(2, 4), 16);
    var b = parseInt(h.substring(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + Math.max(0, alpha).toFixed(3) + ')';
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
          .atmosphereColor(isDark() ? '#8ab4ff' : '#7aa5ff')
          .atmosphereAltitude(0.2)
          .hexPolygonsData(land.features)
          .hexPolygonResolution(3)
          .hexPolygonMargin(0.45)
          .hexPolygonUseDots(true)
          .hexPolygonColor(landColor)
          .pointsData(points)
          .pointLat('lat')
          .pointLng('lng')
          .pointColor(function (d) {
            return pointColor(d, maxCount);
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
          })
          // Soft expanding halo under each point — reads as "live activity".
          .ringsData(points)
          .ringLat('lat')
          .ringLng('lng')
          .ringColor(function (d) {
            var base = pointColor(d, maxCount);
            // Interpolate alpha across the ring: bright at the centre,
            // transparent at the leading edge.
            return function (t) {
              return hexToRgba(base, 1 - t);
            };
          })
          .ringMaxRadius(function (d) {
            return 1.5 + 2.5 * Math.sqrt((d.count || 1) / maxCount);
          })
          .ringPropagationSpeed(0.8)
          .ringRepeatPeriod(2200);

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
