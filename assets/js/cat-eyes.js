(function () {
  var pupils = [
    { el: document.getElementById('cat-pupil-left') },
    { el: document.getElementById('cat-pupil-right') }
  ].filter(function (p) { return p.el; });

  if (!pupils.length) return;

  var maxOffset = 2.5;

  function cacheRestPositions() {
    pupils.forEach(function (p) {
      p.el.style.transform = 'translate(0px, 0px)';
      var r = p.el.getBoundingClientRect();
      p.restX = r.left + r.width / 2;
      p.restY = r.top + r.height / 2;
    });
  }

  window.addEventListener('load', cacheRestPositions);
  window.addEventListener('resize', cacheRestPositions);
  setTimeout(cacheRestPositions, 300);

  document.addEventListener('mousemove', function (e) {
    pupils.forEach(function (p) {
      if (p.restX === undefined) return;
      var dx = e.clientX - p.restX;
      var dy = e.clientY - p.restY;
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var scale = Math.min(maxOffset, dist) / dist;
      var ox = (dx * scale).toFixed(2);
      var oy = (dy * scale).toFixed(2);
      p.el.style.transform = 'translate(' + ox + 'px, ' + oy + 'px)';
    });
  });
})();
