const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function getToken() {
  return localStorage.getItem("authToken");
}

function setToken(token) {
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Backend was not connected. Please try again later.");
  }

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    const message = (data && data.message) || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  register: (name, email, password) =>
    request("/api/auth/register", { method: "POST", body: { name, email, password } }),

  login: async (email, password) => {
    const data = await request("/api/auth/login", { method: "POST", body: { email, password } });
    setToken(data.token);
    return data.user;
  },

  logout: async () => {
    try {
      await request("/api/auth/logout", { method: "POST", auth: true });
    } finally {
      setToken(null);
    }
  },

  me: () => request("/api/auth/me", { auth: true }),

  isLoggedIn: () => !!getToken(),

  getCart: () => request("/api/cart", { auth: true }),
  replaceCart: (items) => request("/api/cart", { method: "PUT", auth: true, body: items }),

  getWishlist: () => request("/api/wishlist", { auth: true }),
  replaceWishlist: (items) => request("/api/wishlist", { method: "PUT", auth: true, body: items }),

  placeOrder: (order) => request("/api/orders", { method: "POST", auth: true, body: order }),
  getOrders: () => request("/api/orders", { auth: true }),
};

export default api;
