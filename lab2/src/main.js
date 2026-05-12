import { api, getBaseUrl, setBaseUrl, setTokens } from './api/client.js';
import {
  renderProducts,
  renderOrders,
  renderCart,
  showLoading,
  showError,
  showToast,
} from './ui.js';

const baseInput = document.getElementById('base-url');
const saveBaseBtn = document.getElementById('save-base');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const refreshProductsBtn = document.getElementById('refresh-products');
const refreshCartBtn = document.getElementById('refresh-cart');
const userIdInput = document.getElementById('user-id-input');
const loadOrdersBtn = document.getElementById('load-user-orders');


function syncBaseUrl() {
  baseInput.value = getBaseUrl();
}

async function login(event) {
  event.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    showToast('Enter username and password');
    return;
  }

  try {
    const tokens = await api.login(username, password);
    setTokens(tokens);
    passwordInput.value = '';
    showToast('Login successful');
    await loadCart();
  } catch (err) {
    showToast(err.message);
  }
}

async function loadProducts() {
  try {
    showLoading('products');
    const data = await api.products();
    renderProducts(data.results || data);
  } catch (err) {
    showError('products', err.message);
  }
}

async function loadOrders() {
  const userId = userIdInput.value;
  if (!userId) {
    showToast('Enter user ID');
    return;
  }
  try {
    showLoading('orders');
    const data = await api.userOrders(userId);
    renderOrders(data.results || data);
  } catch (err) {
    showError('orders', err.message);
  }
}

async function loadCart() {
  try {
    showLoading('cart');
    const data = await api.cartItems();
    renderCart(data.results || data.items || data);
  } catch (err) {
    showError('cart', err.message);
  }
}

function wireEvents() {
  saveBaseBtn.addEventListener('click', () => {
    setBaseUrl(baseInput.value.trim());
    showToast('Base URL saved');
  });
  loginForm.addEventListener('submit', login);
  refreshProductsBtn.addEventListener('click', loadProducts);
  refreshCartBtn.addEventListener('click', loadCart);
  loadOrdersBtn.addEventListener('click', loadOrders);
}

async function init() {
  syncBaseUrl();
  wireEvents();
  await loadProducts();
  await loadCart();
}

init();
