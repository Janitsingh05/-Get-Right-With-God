(function () {
  const trigger = document.querySelector('.dm-trigger');
  const panel = document.querySelector('.dm-panel');
  if (!trigger || !panel) return;

  const dmBtn = trigger.querySelector('.dm-btn');
  const closeBtn = panel.querySelector('.dm-close-btn');
  const tabs = panel.querySelectorAll('.dm-tab');
  const tabContents = panel.querySelectorAll('.dm-tab-content');
  const tabIndicator = panel.querySelector('.dm-tab-indicator');
  const unreadBadge = trigger.querySelector('.dm-unread-badge');
  const footer = document.querySelector('.footer');

  let isOpen = false;
  let badgeShown = false;
  let scrolledEnough = false;

  function showTrigger() {
    scrolledEnough = true;
    trigger.classList.add('visible');
    trigger.classList.remove('hidden-footer');
  }

  function hideTrigger() {
    trigger.classList.remove('visible');
  }

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 300 && !scrolledEnough) {
      showTrigger();
    }

    if (footer) {
      const footerTop = footer.getBoundingClientRect().top;
      const windowH = window.innerHeight;
      if (footerTop < windowH) {
        trigger.classList.add('hidden-footer');
      } else if (scrolledEnough) {
        trigger.classList.remove('hidden-footer');
      }
    }
  }

  function openPanel() {
    isOpen = true;
    panel.classList.add('open');
    if (unreadBadge) unreadBadge.classList.remove('show');
    dmBtn.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove('open');
    dmBtn.setAttribute('aria-expanded', 'false');
  }

  function updateTabIndicator(activeTab) {
    if (!tabIndicator || !activeTab) return;
    const tabsArr = Array.from(tabs);
    const idx = tabsArr.indexOf(activeTab);
    const tabW = activeTab.offsetWidth;
    const tabL = activeTab.offsetLeft;
    tabIndicator.style.width = `${tabW}px`;
    tabIndicator.style.transform = `translateX(${tabL}px)`;
  }

  function switchTab(targetId) {
    tabs.forEach(tab => {
      const active = tab.dataset.tab === targetId;
      tab.classList.toggle('active', active);
      if (active) updateTabIndicator(tab);
    });
    tabContents.forEach(content => {
      content.classList.toggle('active', content.id === targetId);
    });
  }

  function showConfetti(container) {
    const colors = ['#C9A84C', '#E8C96A', '#A07830', '#fff'];
    const particles = [];
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.className = 'dm-confetti-particle';
      const angle = (i / 8) * 360;
      const dist = 40 + Math.random() * 40;
      const tx = Math.cos((angle * Math.PI) / 180) * dist;
      const ty = Math.sin((angle * Math.PI) / 180) * dist - 30;
      p.style.cssText = `
        --tx: ${tx}px;
        --ty: ${ty}px;
        --rot: ${Math.random() * 360}deg;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: 0; top: 0;
      `;
      container.appendChild(p);
      particles.push(p);
    }

    requestAnimationFrame(() => {
      particles.forEach(p => p.classList.add('animate'));
    });

    setTimeout(() => particles.forEach(p => p.remove()), 1000);
  }

  function handleMessageSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('.dm-submit-btn');
    const successState = form.closest('.dm-tab-content').querySelector('.dm-success-state');
    const confettiContainer = form.closest('.dm-tab-content').querySelector('.dm-confetti-container');

    submitBtn.classList.add('loading');

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      form.style.display = 'none';
      if (successState) {
        successState.classList.add('show');
        if (confettiContainer) showConfetti(confettiContainer);
      }
      setTimeout(() => closePanel(), 3500);
    }, 1500);
  }

  function handlePrayerSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const successState = form.closest('.dm-tab-content').querySelector('.dm-prayer-success');

    form.style.display = 'none';
    if (successState) successState.classList.add('show');
    setTimeout(() => closePanel(), 3500);
  }

  dmBtn.addEventListener('click', () => {
    isOpen ? closePanel() : openPanel();
  });

  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  document.addEventListener('click', e => {
    if (isOpen && !panel.contains(e.target) && !trigger.contains(e.target)) {
      closePanel();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closePanel();
  });

  const msgForm = panel.querySelector('#dm-message-form');
  if (msgForm) msgForm.addEventListener('submit', handleMessageSubmit);

  const prayerForm = panel.querySelector('#dm-prayer-form');
  if (prayerForm) prayerForm.addEventListener('submit', handlePrayerSubmit);

  const waBtn = panel.querySelector('.dm-wa-btn');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const msg = encodeURIComponent("Hello! I'm interested in your blessed products from Get Right With God Ministries.");
      window.open(`https://wa.me/15783934937?text=${msg}`, '_blank');
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  setTimeout(() => {
    if (!badgeShown && unreadBadge && scrolledEnough) {
      badgeShown = true;
      unreadBadge.classList.add('show');
    }
  }, 8000);

  setTimeout(() => {
    if (!badgeShown && unreadBadge) {
      badgeShown = true;
      unreadBadge.classList.add('show');
    }
  }, 10000);

  requestAnimationFrame(() => {
    const firstTab = tabs[0];
    if (firstTab) updateTabIndicator(firstTab);
  });

  handleScroll();
})();
