class Carousel {
  constructor(options) {
    this.track = options.track;
    this.dots = options.dots || null;
    this.prevBtn = options.prevBtn || null;
    this.nextBtn = options.nextBtn || null;
    this.autoplay = options.autoplay || false;
    this.interval = options.interval || 5000;
    this.slideWidth = options.slideWidth || null;
    this.current = 0;
    this.total = this.track ? this.track.children.length : 0;
    this.autoplayTimer = null;

    if (!this.track || this.total === 0) return;

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderDots();
    this.goTo(0, false);
    if (this.autoplay) this.startAutoplay();
  }

  getSlideWidth() {
    if (this.slideWidth) return this.slideWidth;
    const first = this.track.children[0];
    if (!first) return 0;
    const style = getComputedStyle(this.track);
    const gap = parseFloat(style.gap) || 24;
    return first.offsetWidth + gap;
  }

  goTo(index, animate = true) {
    if (this.total === 0) return;
    this.current = Math.max(0, Math.min(index, this.total - 1));

    const offset = this.current * this.getSlideWidth();
    this.track.style.transition = animate ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
    this.track.style.transform = `translateX(-${offset}px)`;

    Array.from(this.track.children).forEach((child, i) => {
      child.classList.toggle('active-slide', i === this.current);
    });

    this.updateDots();
  }

  prev() {
    this.goTo(this.current > 0 ? this.current - 1 : this.total - 1);
    this.resetAutoplay();
  }

  next() {
    this.goTo(this.current < this.total - 1 ? this.current + 1 : 0);
    this.resetAutoplay();
  }

  renderDots() {
    if (!this.dots) return;
    this.dots.innerHTML = '';
    for (let i = 0; i < this.total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        this.goTo(i);
        this.resetAutoplay();
      });
      this.dots.appendChild(dot);
    }
    this.updateDots();
  }

  updateDots() {
    if (!this.dots) return;
    Array.from(this.dots.children).forEach((dot, i) => {
      dot.classList.toggle('active', i === this.current);
    });
  }

  bindEvents() {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    let startX = 0;
    let dragging = false;

    this.track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      dragging = true;
    }, { passive: true });

    this.track.addEventListener('touchend', e => {
      if (!dragging) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? this.next() : this.prev();
      }
      dragging = false;
    }, { passive: true });
  }

  startAutoplay() {
    this.autoplayTimer = setInterval(() => this.next(), this.interval);
  }

  resetAutoplay() {
    if (!this.autoplay) return;
    clearInterval(this.autoplayTimer);
    this.startAutoplay();
  }

  destroy() {
    clearInterval(this.autoplayTimer);
  }
}

(function () {
  const testimonialsTrack = document.querySelector('.testimonials-track');
  const testimonialDots = document.querySelector('#testimonials-dots');
  const testimonialPrev = document.querySelector('#testimonials-prev');
  const testimonialNext = document.querySelector('#testimonials-next');

  if (testimonialsTrack) {
    new Carousel({
      track: testimonialsTrack,
      dots: testimonialDots,
      prevBtn: testimonialPrev,
      nextBtn: testimonialNext,
      autoplay: true,
      interval: 6000,
    });
  }
})();

window.Carousel = Carousel;
