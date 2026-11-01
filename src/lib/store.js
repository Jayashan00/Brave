'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get as idbGet, set as idbSet, del as idbDel } from 'idb-keyval';
import { seedProducts, seedCategories, seedBanners, seedGallery, seedSettings, seedOrders } from './seed';

// IndexedDB storage – roomy enough for admin-uploaded images (localStorage caps at ~5 MB).
const idbStorage = {
  getItem: async (name) => (typeof window === 'undefined' ? null : (await idbGet(name)) ?? null),
  setItem: async (name, value) => { if (typeof window !== 'undefined') await idbSet(name, value); },
  removeItem: async (name) => { if (typeof window !== 'undefined') await idbDel(name); },
};

export const DEFAULT_ADMIN_PASS = 'Brave@2026';

export async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const uid = (p = '') => p + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
export const slugify = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || uid('item-');

const initialData = () => ({
  products: seedProducts,
  categories: seedCategories,
  banners: seedBanners,
  gallery: seedGallery,
  settings: seedSettings,
  orders: seedOrders(),
  users: [],
  inquiries: [],
  reviews: [],
});

export const useStore = create(
  persist(
    (set, get) => ({
      ...initialData(),
      lang: 'en',
      cart: [],
      wishlist: [],
      currentUserId: null,
      adminSession: 0,

      // ---- transient UI (not persisted)
      hydrated: false,
      cartOpen: false,
      auth: { open: false, mode: 'signin', next: null },
      toast: null,

      setLang: (lang) => set({ lang }),
      setCartOpen: (cartOpen) => set({ cartOpen }),
      openAuth: (mode = 'signin', next = null) => set({ auth: { open: true, mode, next } }),
      closeAuth: () => set((s) => ({ auth: { ...s.auth, open: false } })),
      showToast: (msg, kind = 'ok') => { const id = Date.now(); set({ toast: { msg, kind, id } }); setTimeout(() => { if (get().toast?.id === id) set({ toast: null }); }, 2800); },

      // ---- cart
      addToCart: (productId, size, color, qty = 1) => set((s) => {
        const key = `${productId}|${size}|${color}`;
        const ex = s.cart.find((c) => c.key === key);
        const cart = ex ? s.cart.map((c) => (c.key === key ? { ...c, qty: c.qty + qty } : c)) : [...s.cart, { key, productId, size, color, qty }];
        return { cart };
      }),
      setQty: (key, qty) => set((s) => ({ cart: s.cart.map((c) => (c.key === key ? { ...c, qty: Math.max(1, qty) } : c)) })),
      removeFromCart: (key) => set((s) => ({ cart: s.cart.filter((c) => c.key !== key) })),
      clearCart: () => set({ cart: [] }),
      toggleWish: (id) => set((s) => ({ wishlist: s.wishlist.includes(id) ? s.wishlist.filter((x) => x !== id) : [...s.wishlist, id] })),

      // ---- customer accounts (demo: stored in this browser)
      register: async ({ name, email, phone, password }) => {
        email = email.trim().toLowerCase();
        if (get().users.some((u) => u.email === email)) return { error: 'email_taken' };
        const user = { id: uid('u-'), name, email, phone, passHash: await sha256(password), createdAt: Date.now(), address: '', city: '', district: 'Kandy' };
        set((s) => ({ users: [...s.users, user], currentUserId: user.id }));
        return { user };
      },
      login: async (email, password) => {
        email = email.trim().toLowerCase();
        const h = await sha256(password);
        const user = get().users.find((u) => u.email === email && u.passHash === h);
        if (!user) return { error: 'auth_err' };
        set({ currentUserId: user.id });
        return { user };
      },
      logout: () => set({ currentUserId: null }),
      updateUser: (id, patch) => set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, ...patch } : u)) })),

      placeOrder: (order) => {
        const n = get().orders.reduce((m, o) => Math.max(m, parseInt(o.id.split('-')[1]) || 1000), 1000) + 1;
        const full = { ...order, id: `BSW-${n}`, createdAt: Date.now(), status: 'pending' };
        set((s) => ({ orders: [full, ...s.orders], cart: [] }));
        return full;
      },

      // ---- inquiries & reviews
      addInquiry: (q) => set((s) => ({ inquiries: [{ ...q, id: uid('q-'), createdAt: Date.now(), status: 'new' }, ...s.inquiries] })),
      updateInquiry: (id, patch) => set((s) => ({ inquiries: s.inquiries.map((q) => (q.id === id ? { ...q, ...patch } : q)) })),
      deleteInquiry: (id) => set((s) => ({ inquiries: s.inquiries.filter((q) => q.id !== id) })),
      addReview: (r) => set((s) => ({ reviews: [{ ...r, id: uid('r-'), createdAt: Date.now() }, ...s.reviews] })),
      deleteReview: (id) => set((s) => ({ reviews: s.reviews.filter((r) => r.id !== id) })),

      // ---- admin
      adminLogin: async (email, password) => {
        const st = get().settings;
        const h = await sha256(password);
        const okPass = st.adminPassHash ? h === st.adminPassHash : password === DEFAULT_ADMIN_PASS;
        if (email.trim().toLowerCase() === st.adminEmail.toLowerCase() && okPass) { set({ adminSession: Date.now() + 1000 * 60 * 60 * 12 }); return true; }
        return false;
      },
      adminLogout: () => set({ adminSession: 0 }),
      setAdminPassword: async (pw) => { const h = await sha256(pw); set((s) => ({ settings: { ...s.settings, adminPassHash: h } })); },

      saveProduct: (p) => set((s) => {
        const exists = s.products.some((x) => x.id === p.id);
        return { products: exists ? s.products.map((x) => (x.id === p.id ? p : x)) : [{ ...p, id: p.id || uid('p-'), createdAt: Date.now() }, ...s.products] };
      }),
      deleteProduct: (id) => set((s) => ({ products: s.products.filter((x) => x.id !== id) })),
      patchProduct: (id, patch) => set((s) => ({ products: s.products.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),

      saveCategory: (c) => set((s) => {
        const exists = s.categories.some((x) => x.id === c.id);
        return { categories: exists ? s.categories.map((x) => (x.id === c.id ? c : x)) : [...s.categories, { ...c, id: c.id || uid('cat-') }] };
      }),
      deleteCategory: (id) => set((s) => ({ categories: s.categories.filter((x) => x.id !== id) })),

      saveBanner: (b) => set((s) => {
        const exists = s.banners.some((x) => x.id === b.id);
        return { banners: exists ? s.banners.map((x) => (x.id === b.id ? b : x)) : [...s.banners, { ...b, id: b.id || uid('b-') }] };
      }),
      deleteBanner: (id) => set((s) => ({ banners: s.banners.filter((x) => x.id !== id) })),
      moveBanner: (id, dir) => set((s) => {
        const arr = [...s.banners]; const i = arr.findIndex((b) => b.id === id); const j = i + dir;
        if (i < 0 || j < 0 || j >= arr.length) return {};
        [arr[i], arr[j]] = [arr[j], arr[i]]; return { banners: arr };
      }),
      addGallery: (g) => set((s) => ({ gallery: [...s.gallery, { ...g, id: uid('g-') }] })),
      deleteGallery: (id) => set((s) => ({ gallery: s.gallery.filter((g) => g.id !== id) })),

      setSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),
      setOrderStatus: (id, status) => set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),
      deleteOrder: (id) => set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),
      clearSampleOrders: () => set((s) => ({ orders: s.orders.filter((o) => !o.sample) })),

      exportData: () => {
        const s = get();
        return JSON.stringify({ products: s.products, categories: s.categories, banners: s.banners, gallery: s.gallery, settings: s.settings, orders: s.orders, users: s.users, inquiries: s.inquiries, reviews: s.reviews, exportedAt: new Date().toISOString() });
      },
      importData: (json) => {
        const d = JSON.parse(json);
        const keys = ['products', 'categories', 'banners', 'gallery', 'settings', 'orders', 'users', 'inquiries', 'reviews'];
        const patch = {}; keys.forEach((k) => { if (d[k]) patch[k] = d[k]; });
        set(patch);
      },
      resetAll: () => set({ ...initialData(), cart: [], wishlist: [] }),
    }),
    {
      name: 'brave-sports-store-v1',
      version: 1,
      storage: createJSONStorage(() => idbStorage),
      partialize: (s) => {
        const { hydrated, cartOpen, auth, toast, ...rest } = s;
        return Object.fromEntries(Object.entries(rest).filter(([, v]) => typeof v !== 'function'));
      },
      onRehydrateStorage: () => () => { useStore.setState({ hydrated: true }); },
    }
  )
);

// ---- selectors / helpers
export const useCurrentUser = () => useStore((s) => s.users.find((u) => u.id === s.currentUserId) || null);
export const useIsAdmin = () => useStore((s) => s.adminSession > Date.now());

export function cartTotals(state) {
  const lines = state.cart.map((c) => ({ ...c, product: state.products.find((p) => p.id === c.productId) })).filter((l) => l.product);
  const qty = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const tiers = [...(state.settings.bulkTiers || [])].sort((a, b) => b.min - a.min);
  const tier = tiers.find((t) => qty >= t.min);
  const discount = tier ? Math.round((subtotal * tier.off) / 100) : 0;
  const afterDisc = subtotal - discount;
  const delivery = lines.length === 0 ? 0 : afterDisc >= state.settings.freeDeliveryOver ? 0 : state.settings.deliveryFee;
  return { lines, qty, subtotal, discount, tierOff: tier?.off || 0, delivery, total: afterDisc + delivery };
}

export function waLink(number, text) {
  return `https://wa.me/${(number || '').replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

// Compress an uploaded image file to a webp data URL (keeps IndexedDB small).
export function fileToDataUrl(file, max = 1400, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const r = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * r); c.height = Math.round(img.height * r);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      const isPng = file.type === 'image/png';
      resolve(c.toDataURL(isPng ? 'image/png' : 'image/webp', quality));
    };
    img.onerror = reject;
    img.src = url;
  });
}
