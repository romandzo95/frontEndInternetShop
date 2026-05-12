const defaultBase = 'http://127.0.0.1:8000/api/v1';
const TOKEN_KEY = 'lab2_token';
const REFRESH_TOKEN_KEY = 'lab2_refresh_token';
const BASE_KEY = 'lab2_base_url';

let baseUrl = localStorage.getItem(BASE_KEY) || defaultBase;
let bearer = localStorage.getItem(TOKEN_KEY) || '';
let refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || '';

export function setBaseUrl(url) {
  baseUrl = url || defaultBase;
  localStorage.setItem(BASE_KEY, baseUrl);
}

export function getBaseUrl() {
  return baseUrl;
}

export function setToken(token) {
  bearer = token || '';
  if (bearer) {
    localStorage.setItem(TOKEN_KEY, bearer);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function setTokens(tokens) {
  setToken(tokens?.access || '');
  refreshToken = tokens?.refresh || '';
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } else {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}

export function getToken() {
  return bearer;
}

async function rawRequest(path, options = {}, token = bearer) {
  let resp;

  try {
    resp = await fetch(`${baseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch {
    throw new Error(`Cannot connect to API: ${baseUrl}`);
  }

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`HTTP ${resp.status}: ${text}`);
  }

  const contentType = resp.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return resp.json();
  }
  return resp.text();
}

async function refreshAccessToken() {
  if (!refreshToken) {
    throw new Error('Please login first');
  }

  const data = await rawRequest('/auth/refresh/', {
    method: 'POST',
    body: JSON.stringify({ refresh: refreshToken }),
  }, '');

  setToken(data.access);
  return data.access;
}

async function request(path, options = {}) {
  try {
    return await rawRequest(path, options);
  } catch (err) {
    if (!String(err.message || '').startsWith('HTTP 401')) {
      throw err;
    }
    const access = await refreshAccessToken();
    return rawRequest(path, options, access);
  }
}

export const api = {
  login(username, password) {
    return rawRequest('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username_or_email: username, password }),
    }, '');
  },
  products() {
    return request('/products/');
  },
  users() {
    return request('/users/');
  },
  userOrders(userId) {
    return request(`/users/${userId}/orders/`);
  },
  cartItems() {
    return request('/cart/items/summary/');
  },
};
