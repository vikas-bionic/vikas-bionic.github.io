(function () {
  var svg = document.getElementById('nav-robot');
  if (!svg) return;
  var pupil = document.getElementById('robot-pupil');
  var iris = document.getElementById('robot-iris');
  var maxOffset = 3.5;
  var restX, restY;

  function cacheRest() {
    pupil.setAttribute('transform', '');
    var r = pupil.getBoundingClientRect();
    restX = r.left + r.width / 2;
    restY = r.top + r.height / 2;
  }
  window.addEventListener('load', cacheRest);
  window.addEventListener('resize', cacheRest);
  setTimeout(cacheRest, 300);

  var lastX = 0, lastY = 0, lastT = Date.now();

  document.addEventListener('mousemove', function (e) {
    if (restX === undefined) return;
    var dx = e.clientX - restX;
    var dy = e.clientY - restY;
    var dist = Math.sqrt(dx * dx + dy * dy) || 1;
    var scale = Math.min(maxOffset, dist) / dist;
    var ox = (dx * scale).toFixed(2);
    var oy = (dy * scale).toFixed(2);
    pupil.setAttribute('transform', 'translate(' + ox + ',' + oy + ')');

    var now = Date.now();
    var dt = Math.max(now - lastT, 1);
    var speed = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)) / dt;
    var glow = Math.min(1, speed * 4);
    iris.setAttribute('fill', 'hsl(' + (150 - glow * 40) + ',70%,' + (20 + glow * 25) + '%)');
    lastX = e.clientX; lastY = e.clientY; lastT = now;
  });
})();
