(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const particles = [];
  const PARTICLE_COUNT = 60;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: randomBetween(-0.15, 0.15),
      vy: randomBetween(-0.4, -0.1),
      size: randomBetween(1, 2.5),
      opacity: randomBetween(0.1, 0.6),
      life: randomBetween(0, 1),
      speed: randomBetween(0.003, 0.007),
    };
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticle(p) {
    const alpha = p.opacity * Math.sin(p.life * Math.PI);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#C9A84C';
    ctx.shadowColor = '#C9A84C';
    ctx.shadowBlur = p.size * 4;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function updateParticle(p) {
    p.life += p.speed;
    p.x += p.vx;
    p.y += p.vy;

    if (p.life >= 1 || p.y < -10) {
      Object.assign(p, createParticle());
      p.y = canvas.height + 10;
      p.life = 0;
    }
  }

  let animId;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      updateParticle(p);
      drawParticle(p);
    }
    animId = requestAnimationFrame(animate);
  }

  const ro = new ResizeObserver(() => {
    resize();
    initParticles();
  });

  ro.observe(canvas.parentElement);
  resize();
  initParticles();
  animate();

  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const parallaxY = y * 0.3;
      heroContent.style.transform = `translateY(${parallaxY}px)`;
    }, { passive: true });
  }
})();
