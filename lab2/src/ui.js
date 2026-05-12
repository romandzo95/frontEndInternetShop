const lists = {
  products: document.getElementById('products-list'),
  orders: document.getElementById('orders-list'),
  cart: document.getElementById('cart-list'),
};

const toastEl = document.getElementById('toast');


let cachedProducts = [];

function clear(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

function status(target, type, message) {
  const el = lists[target];
  if (!el) return;
  clear(el);
  const div = document.createElement('div');
  div.className = type;
  div.textContent = message;
  el.appendChild(div);
}

export function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2200);
}

export function renderProducts(items) {
  cachedProducts = items;

  const el = lists.products;
  clear(el);
  if (!items.length) {
    status('products', 'empty', 'No products');
    return;
  }
  items.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div><strong>${p.name}</strong></div>
      <div class="muted">${p.category || 'Uncategorized'}</div>
      <div class="badge">$${p.price}</div>
    `;
    el.appendChild(card);
  });
}

export function renderOrders(items) {
  const el = lists.orders;
  clear(el);
  if (!items.length) {
    status('orders', 'empty', 'No orders for this user');
    return;
  }
  items.forEach((o) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div><strong>Order #${o.id}</strong></div>
      <div class="muted">Status: ${o.status}</div>
      <div class="muted">Total: ${o.total}</div>
    `;
    el.appendChild(card);
  });
}

export function renderCart(items) {
  const el = lists.cart;
  clear(el);

  if (!Array.isArray(items) || !items.length) {
    status('cart', 'empty', 'Cart is empty');
    return;
  }

  items.forEach((c) => {
    const productId = c.product_id ?? c.product?.id;
    const product = c.product || cachedProducts.find(p => p.id === productId);

    const productName = product ? product.name : `Product ID: ${productId}`;
    const productPrice = product ? product.price : '?.??';

    const qty = c.count ?? c.quantity ?? c.qty ?? 'n/a';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div><strong>${productName}</strong></div>
      <div class="muted">Qty: ${qty}</div>
      <div class="muted">Cart Item ID: ${c.id ?? 'n/a'}</div>
      <div class="badge">$${productPrice}</div>
    `;
    el.appendChild(card);
  });
}

const loadingMessages = {
  products: 'Loading products...',
  orders: 'Loading orders...',
  cart: 'Loading cart...',
};

export function showLoading(target) {
  status(target, 'loading', loadingMessages[target] || 'Loading...');
}

export function showError(target, message) {
  const msg = message || 'Something went wrong';
  status(target, 'error', msg);
  showToast(msg);
}
