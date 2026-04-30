const PRODUCTS = [
  {
    id: 1,
    name: 'Sacred Heart Study Bible',
    price: 49.99,
    originalPrice: 64.99,
    category: 'books',
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 234,
    emoji: '📖',
    description: 'A comprehensive study Bible featuring detailed commentary, cross-references, and devotional notes to deepen your relationship with God.',
    featured: true,
  },
  {
    id: 2,
    name: 'Prayer Journal — Gold Edition',
    price: 24.99,
    originalPrice: null,
    category: 'stationery',
    badge: 'New',
    rating: 4.8,
    reviews: 89,
    emoji: '📔',
    description: 'Premium leather-bound prayer journal with scripture prompts, gratitude pages, and guided prayer sections.',
    featured: true,
  },
  {
    id: 3,
    name: '"Get Right With God" Tee',
    price: 34.99,
    originalPrice: null,
    category: 'apparel',
    badge: null,
    rating: 4.7,
    reviews: 156,
    emoji: '👕',
    description: 'Premium heavyweight cotton t-shirt featuring the ministry logo and sacred typography.',
    featured: true,
  },
  {
    id: 4,
    name: 'Cross Necklace — Gold Plated',
    price: 59.99,
    originalPrice: 79.99,
    category: 'jewelry',
    badge: 'Sale',
    rating: 4.9,
    reviews: 312,
    emoji: '✝️',
    description: '18K gold-plated sterling silver cross necklace. A beautiful symbol of your faith.',
    featured: true,
  },
  {
    id: 5,
    name: 'Devotional Candle Set',
    price: 39.99,
    originalPrice: null,
    category: 'home',
    badge: null,
    rating: 4.6,
    reviews: 67,
    emoji: '🕯️',
    description: 'Set of 3 hand-poured soy candles with scripture-inspired scents: Frankincense, Myrrh, and Sandalwood.',
    featured: false,
  },
  {
    id: 6,
    name: 'Scripture Wall Art Print',
    price: 29.99,
    originalPrice: null,
    category: 'home',
    badge: 'New',
    rating: 4.8,
    reviews: 44,
    emoji: '🖼️',
    description: 'Beautiful typographic print of Psalm 23 on premium archival paper. Frame not included.',
    featured: false,
  },
  {
    id: 7,
    name: 'Holy Anointing Oil Set',
    price: 44.99,
    originalPrice: null,
    category: 'spiritual',
    badge: null,
    rating: 4.9,
    reviews: 198,
    emoji: '🫙',
    description: 'Set of 3 anointing oils: Frankincense & Myrrh, Rose of Sharon, and Cedar of Lebanon.',
    featured: false,
  },
  {
    id: 8,
    name: 'Sandalwood Prayer Beads',
    price: 19.99,
    originalPrice: null,
    category: 'spiritual',
    badge: null,
    rating: 4.5,
    reviews: 33,
    emoji: '📿',
    description: 'Handcrafted sandalwood prayer beads with gold-tone cross accent.',
    featured: false,
  },
  {
    id: 9,
    name: 'Sermon Series — Complete Collection',
    price: 79.99,
    originalPrice: 99.99,
    category: 'media',
    badge: 'Sale',
    rating: 4.9,
    reviews: 276,
    emoji: '💿',
    description: '12-DVD collection of our most powerful sermon series. Transform your life through the Word.',
    featured: false,
  },
  {
    id: 10,
    name: 'Daily Devotional — Year of Faith',
    price: 27.99,
    originalPrice: null,
    category: 'books',
    badge: 'Bestseller',
    rating: 4.8,
    reviews: 189,
    emoji: '📚',
    description: '365 daily devotionals to guide your spiritual journey through the entire year.',
    featured: false,
  },
  {
    id: 11,
    name: 'Ministry Hoodie',
    price: 64.99,
    originalPrice: null,
    category: 'apparel',
    badge: null,
    rating: 4.7,
    reviews: 112,
    emoji: '🧥',
    description: 'Premium heavyweight fleece hoodie with embroidered ministry crest.',
    featured: false,
  },
  {
    id: 12,
    name: 'Blessing Bracelet Set',
    price: 34.99,
    originalPrice: null,
    category: 'jewelry',
    badge: 'New',
    rating: 4.6,
    reviews: 58,
    emoji: '📿',
    description: 'Set of 3 stackable bracelets: gold-plated cross charm, scripture engraved, and blessed stone.',
    featured: false,
  },
];

window.PRODUCTS = PRODUCTS;

function getBadgeClass(badge) {
  if (badge === 'Bestseller') return 'badge-gold';
  if (badge === 'New') return 'badge-new';
  if (badge === 'Sale') return 'badge-sale';
  return 'badge-gold';
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '★';
  if (half) html += '½';
  for (let i = full + (half ? 1 : 0); i < 5; i++) html += '☆';
  return html;
}

function createProductCard(product, options = {}) {
  const { compact = false } = options;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return `
    <div class="product-card reveal" data-id="${product.id}" data-category="${product.category}">
      <div class="product-image-wrap">
        <div class="product-placeholder-img">${product.emoji}</div>
        ${product.badge ? `<div class="product-badge"><span class="badge ${getBadgeClass(product.badge)}">${product.badge}</span></div>` : ''}
        <div class="product-actions-overlay">
          <button class="product-action-btn" data-action="wishlist" aria-label="Add to wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <a href="product-detail.html?id=${product.id}" class="product-action-btn" aria-label="Quick view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </a>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <span class="star-rating">${renderStars(product.rating)}</span>
          <span class="product-rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price-row">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          ${hasDiscount ? `<span class="product-price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
        </div>
        <button class="product-add-btn" data-id="${product.id}" data-action="add-to-cart">
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

(function () {
  const grid = document.querySelector('.products-grid');
  const featuredGrid = document.querySelector('.featured-products-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sortSelect = document.querySelector('.sort-select');
  const countEl = document.querySelector('.products-count');

  let activeFilter = 'all';
  let activeSort = 'featured';
  let filteredProducts = [...PRODUCTS];

  function filterProducts() {
    filteredProducts = PRODUCTS.filter(p =>
      activeFilter === 'all' || p.category === activeFilter
    );
  }

  function sortProducts() {
    switch (activeSort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }

  function renderGrid() {
    if (!grid) return;
    filterProducts();
    sortProducts();

    if (countEl) {
      countEl.textContent = `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`;
    }

    if (filteredProducts.length === 0) {
      grid.innerHTML = `
        <div class="products-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <p>No products found for this filter.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filteredProducts.map(p => createProductCard(p)).join('');
    bindAddToCart(grid);

    if (window.AnimationsModule) {
      window.AnimationsModule.observe(grid.querySelectorAll('.reveal'));
    }
  }

  function renderFeatured() {
    if (!featuredGrid) return;
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);
    featuredGrid.innerHTML = featured.map(p => createProductCard(p)).join('');
    bindAddToCart(featuredGrid);
  }

  function bindAddToCart(container) {
    container.querySelectorAll('[data-action="add-to-cart"]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        const product = PRODUCTS.find(p => p.id === id);
        if (!product) return;

        document.dispatchEvent(new CustomEvent('cart:add', { detail: { product } }));

        btn.textContent = 'Added ✓';
        btn.classList.add('added');
        setTimeout(() => {
          btn.textContent = 'Add to Cart';
          btn.classList.remove('added');
        }, 2000);
      });
    });

    container.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('[data-action]') || e.target.closest('.product-action-btn')) return;
        const id = card.dataset.id;
        window.location.href = `product-detail.html?id=${id}`;
      });
    });
  }

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderGrid();
      });
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      activeSort = sortSelect.value;
      renderGrid();
    });
  }

  renderFeatured();
  renderGrid();
})();
