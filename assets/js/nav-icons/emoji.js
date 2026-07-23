(function () {
  var svg = document.getElementById('nav-emoji');
  if (!svg) return;
  var eyeL = document.getElementById('emoji-eye-left');
  var eyeR = document.getElementById('emoji-eye-right');
  var mouth = document.getElementById('emoji-mouth');
  var restL, restR;
  var maxOffset = 1.6;

  function cacheRest() {
    [eyeL, eyeR].forEach(function (el) { el.style.transform = ''; });
    var rL = eyeL.getBoundingClientRect();
    var rR = eyeR.getBoundingClientRect();
    restL = { x: rL.left + rL.width / 2, y: rL.top + rL.height / 2 };
    restR = { x: rR.left + rR.width / 2, y: rR.top + rR.height / 2 };
  }
  window.addEventListener('load', cacheRest);
  window.addEventListener('resize', cacheRest);
  setTimeout(cacheRest, 300);

  var lastX = 0, lastY = 0, lastT = Date.now(), idleTimer;

  function setMouth(state) {
    if (state === 'surprised') {
      mouth.setAttribute('d', 'M26,21 A4,5 0 1,0 34,21 A4,5 0 1,0 26,21');
    } else if (state === 'smile') {
      mouth.setAttribute('d', 'M20,21 Q30,29 40,21');
    } else {
      mouth.setAttribute('d', 'M22,23 Q30,25 38,23');
    }
  }
  setMouth('smile');

  document.addEventListener('mousemove', function (e) {
    if (!restL) return;
    [[eyeL, restL], [eyeR, restR]].forEach(function (pair) {
      var el = pair[0], rest = pair[1];
      var dx = e.clientX - rest.x, dy = e.clientY - rest.y;
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var scale = Math.min(maxOffset, dist) / dist;
      el.style.transform = 'translate(' + (dx * scale).toFixed(2) + 'px,' + (dy * scale).toFixed(2) + 'px)';
    });

    var now = Date.now();
    var dt = Math.max(now - lastT, 1);
    var speed = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)) / dt;
    if (speed > 1.2) setMouth('surprised'); else setMouth('neutral');
    lastX = e.clientX; lastY = e.clientY; lastT = now;

    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { setMouth('smile'); }, 700);
  });
})();
