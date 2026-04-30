(function () {
  const STORAGE_KEY = 'grwg_cart';

  let cart = loadCart();

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function getItemIndex(productId) {
    return cart.findIndex(item => item.id === productId);
  }

  function addItem(product, quantity = 1) {
    const idx = getItemIndex(product.id);
    if (idx > -1) {
      cart[idx].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    saveCart();
    updateBadge();
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));
  }

  function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateBadge();
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    const idx = getItemIndex(productId);
    if (idx > -1) {
      cart[idx].quantity = quantity;
      saveCart();
      updateBadge();
      document.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));
    }
  }

  function clearCart() {
    cart = [];
    saveCart();
    updateBadge();
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function getCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function updateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = getCount();
    badges.forEach(badge => {
      badge.textContent = count > 99 ? '99+' : count;
      badge.classList.toggle('visible', count > 0);
    });
  }

  document.addEventListener('cart:add', e => {
    addItem(e.detail.product);
    animateBadge();
  });

  function animateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.style.animation = 'none';
      badge.offsetHeight;
      badge.style.animation = 'badge-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  }

  function renderCartPage() {
    const cartContainer = document.getElementById('cart-items');
    const summaryEl = document.getElementById('cart-summary');
    if (!cartContainer) return;

    if (cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Fill it with blessed products from our ministry.</p>
          <a href="shop.html" class="btn btn-primary">Browse Products</a>
        </div>
      `;
      if (summaryEl) summaryEl.style.display = 'none';
      return;
    }

    if (summaryEl) summaryEl.style.display = '';

    cartContainer.innerHTML = `
      <div class="cart-table-wrap">
        <table class="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${cart.map(item => `
              <tr class="cart-row" data-id="${item.id}">
                <td>
                  <div class="cart-product-cell">
                    <div class="cart-product-img">${item.emoji || '📦'}</div>
                    <div>
                      <div class="cart-product-name">${item.name}</div>
                      <div class="cart-product-cat">${item.category}</div>
                    </div>
                  </div>
                </td>
                <td class="cart-price">$${item.price.toFixed(2)}</td>
                <td>
                  <div class="qty-control">
                    <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
                  </div>
                </td>
                <td class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remove">×</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    updateSummary(summaryEl);
    bindCartActions(cartContainer);
  }

  function updateSummary(el) {
    if (!el) return;
    const subtotal = getTotal();
    const shipping = subtotal >= 75 ? 0 : 7.99;
    const total = subtotal + shipping;

    el.querySelector('.summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    el.querySelector('.summary-shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    el.querySelector('.summary-total').textContent = `$${total.toFixed(2)}`;
  }

  function bindCartActions(container) {
    container.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const action = btn.dataset.action;
        const item = cart.find(i => i.id === id);
        if (!item) return;
        updateQuantity(id, action === 'increase' ? item.quantity + 1 : item.quantity - 1);
        renderCartPage();
      });
    });

    container.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        removeItem(parseInt(btn.dataset.id));
        renderCartPage();
      });
    });
  }

  document.addEventListener('cart:updated', () => {
    renderCartPage();
  });

  updateBadge();
  renderCartPage();

  window.Cart = { addItem, removeItem, updateQuantity, clearCart, getTotal, getCount, getCart: () => cart };
})();
