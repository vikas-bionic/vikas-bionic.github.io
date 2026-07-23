(function () {
  var svg = document.getElementById('nav-dna');
  if (!svg) return;

  var ns = 'http://www.w3.org/2000/svg';
  var N = 10;
  var cx = 30, cy = 18, amp = 8, spacingX = 5.2, startX = 5;
  var phase = 0;
  var baseSpeed = 0.03;
  var targetSpeed = baseSpeed;
  var speed = baseSpeed;

  var rungs = [], ballsA = [], ballsB = [];

  for (var i = 0; i < N; i++) {
    var rung = document.createElementNS(ns, 'line');
    rung.setAttribute('stroke-width', '1.2');
    svg.appendChild(rung);
    rungs.push(rung);
  }
  for (var j = 0; j < N; j++) {
    var b = document.createElementNS(ns, 'circle');
    svg.appendChild(b);
    ballsB.push(b);
  }
  for (var k = 0; k < N; k++) {
    var a = document.createElementNS(ns, 'circle');
    svg.appendChild(a);
    ballsA.push(a);
  }

  function render() {
    phase += speed;
    for (var i = 0; i < N; i++) {
      var x = startX + i * spacingX;
      var angleA = phase + i * 0.65;
      var angleB = angleA + Math.PI;
      var yA = cy + amp * Math.sin(angleA);
      var yB = cy + amp * Math.sin(angleB);
      var zA = Math.cos(angleA);
      var zB = Math.cos(angleB);
      var hue = (i * 28 + phase * 40) % 360;
      var hueB = (hue + 160) % 360;

      ballsA[i].setAttribute('cx', x);
      ballsA[i].setAttribute('cy', yA.toFixed(2));
      ballsA[i].setAttribute('r', (1.6 + zA * 0.9).toFixed(2));
      ballsA[i].setAttribute('fill', 'hsl(' + hue + ',85%,60%)');
      ballsA[i].setAttribute('opacity', (0.55 + zA * 0.45).toFixed(2));

      ballsB[i].setAttribute('cx', x);
      ballsB[i].setAttribute('cy', yB.toFixed(2));
      ballsB[i].setAttribute('r', (1.6 + zB * 0.9).toFixed(2));
      ballsB[i].setAttribute('fill', 'hsl(' + hueB + ',85%,60%)');
      ballsB[i].setAttribute('opacity', (0.55 + zB * 0.45).toFixed(2));

      rungs[i].setAttribute('x1', x);
      rungs[i].setAttribute('y1', yA.toFixed(2));
      rungs[i].setAttribute('x2', x);
      rungs[i].setAttribute('y2', yB.toFixed(2));
      rungs[i].setAttribute('stroke', 'hsl(' + hue + ',70%,70%)');
      rungs[i].setAttribute('opacity', (0.3 + (zA + zB) * 0.2).toFixed(2));
    }
    speed += (targetSpeed - speed) * 0.05;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  document.addEventListener('mousemove', function (e) {
    var relX = (e.clientX / window.innerWidth) - 0.5;
    targetSpeed = baseSpeed + relX * 0.3;
  });
})();
