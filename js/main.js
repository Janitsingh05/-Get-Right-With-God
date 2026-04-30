const App = {
  state: {
    cart: [],
    currentPage: null,
    initialized: false,
  },

  emit(event, detail = {}) {
    document.dispatchEvent(new CustomEvent(`app:${event}`, { detail }));
  },

  on(event, handler) {
    document.addEventListener(`app:${event}`, handler);
  },

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.state.currentPage = document.body.dataset.page || 'home';

    this.emit('init');
  },
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.App = App;
