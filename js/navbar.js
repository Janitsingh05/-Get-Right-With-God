(function () {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!navbar) return;

  let lastScroll = 0;
  let ticking = false;

  function onScroll() {
    lastScroll = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }

  function updateNav() {
    if (lastScroll > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    ticking = false;
  }

  function setActiveLink() {
    const links = navbar.querySelectorAll('.navbar-nav a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (mobileMenu) {
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
          link.style.color = 'var(--color-gold)';
        }
      });
    }
  }

  function toggleMobileMenu() {
    const isOpen = hamburger.classList.toggle('open');
    if (mobileMenu) {
      mobileMenu.classList.toggle('open', isOpen);
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  document.addEventListener('click', e => {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  setActiveLink();
  updateNav();
})();
