/* =============================================
   THEME — sessionStorage, follows OS by default
   ============================================= */
(function() {
  const saved = sessionStorage.getItem('wokup-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  // If no saved value, CSS media query handles it automatically
})();

function _getActiveTheme() {
  const manual = document.documentElement.getAttribute('data-theme');
  if (manual) return manual;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function _updateToggleIcon() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const isDark = _getActiveTheme() === 'dark';
  btn.innerHTML = isDark
    ? '<i class="fas fa-sun" title="Switch to light mode"></i>'
    : '<i class="fas fa-moon" title="Switch to dark mode"></i>';
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

function toggleTheme() {
  const current = _getActiveTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  sessionStorage.setItem('wokup-theme', next);
  _updateToggleIcon();
}

// Update icon if OS preference changes and no manual override
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (!sessionStorage.getItem('wokup-theme')) _updateToggleIcon();
});

/* =============================================
   NAVBAR
   ============================================= */
function injectNavbar(activePage) {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.innerHTML = `
    <a href="index.html" class="nav-logo">
      <img src="assets/logo.png" alt="WokUp Logo">
      <span>WokUp</span>
    </a>
    <ul class="nav-links">
      <li><a href="index.html"    ${activePage==='home'   ?'class="active"':''}>Home</a></li>
      <li><a href="menu.html"     ${activePage==='menu'   ?'class="active"':''}>Full Menu</a></li>
      <li><a href="gallery.html"  ${activePage==='gallery'?'class="active"':''}>Gallery</a></li>
      <li><a href="about.html"    ${activePage==='about'  ?'class="active"':''}>About Us</a></li>
      <li><a href="contact.html"  ${activePage==='contact'?'class="active"':''}>Contact</a></li>
    </ul>
    <div style="display:flex;align-items:center;gap:10px;">
      <button class="theme-toggle" id="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme"></button>
      <button class="cart-btn" id="cart-btn" onclick="openCart()" aria-label="View cart">
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-badge hidden" id="cart-badge">0</span>
      </button>
      <a href="https://wa.me/923096587000?text=I%20want%20to%20order%20from%20WokUp" target="_blank" class="nav-order-btn">
        <i class="fab fa-whatsapp"></i> Order Now
      </a>
      <button class="hamburger" id="hamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  mobileNav.id = 'mobile-nav';
  mobileNav.innerHTML = `
    <a href="index.html"   ${activePage==='home'   ?'class="active"':''}>Home</a>
    <a href="menu.html"    ${activePage==='menu'   ?'class="active"':''}>Full Menu</a>
    <a href="gallery.html" ${activePage==='gallery'?'class="active"':''}>Gallery</a>
    <a href="about.html"   ${activePage==='about'  ?'class="active"':''}>About Us</a>
    <a href="contact.html" ${activePage==='contact'?'class="active"':''}>Contact</a>
    <a href="#" onclick="closeMobileNav(); openCart(); return false;" style="display:flex;align-items:center;justify-content:space-between;">
      <span><i class="fas fa-shopping-cart" style="margin-right:8px;"></i>View Cart</span>
      <span class="cart-badge" id="cart-badge-mobile" style="position:static;">0</span>
    </a>
    <a href="https://wa.me/923096587000?text=I%20want%20to%20order%20from%20WokUp" target="_blank" class="mobile-order">
      <i class="fab fa-whatsapp"></i> Order on WhatsApp
    </a>
  `;

  document.body.prepend(mobileNav);
  document.body.prepend(nav);

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobile-nav').classList.toggle('open');
  });

  // Set correct icon after DOM is ready
  _updateToggleIcon();

  // Mount cart drawer/overlay once, then sync badge with current cart state
  _ensureCartUI();
  _renderCartBadge();
}

function closeMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (nav) nav.classList.remove('open');
}

/* =============================================
   FOOTER
   ============================================= */
function injectFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="logo-wrap">
          <img src="assets/logo.png" alt="WokUp">
          <span class="brand-name">WokUp</span>
        </div>
        <p>Premium Chinese cuisine crafted with bold flavours and fresh ingredients. Dine in or order on WhatsApp — we bring the wok to you.</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/wokup_lhr" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://www.facebook.com/profile.php?id=61586208690025" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="https://wa.me/923096587000" target="_blank" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Navigate</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="menu.html">Full Menu</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Menu</h4>
        <ul>
          <li><a href="menu.html#soups">Soups</a></li>
          <li><a href="menu.html#momos">Momos</a></li>
          <li><a href="menu.html#fried">Fried Specials</a></li>
          <li><a href="menu.html#noodles">Noodles & Pasta</a></li>
          <li><a href="menu.html#rice">Rice Delights</a></li>
          <li><a href="menu.html#chefs">Chef's Specials</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <div class="footer-contact-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>Opposite Pakistan Mint, GT Road, Lahore</span>
        </div>
        <div class="footer-contact-item">
          <i class="fas fa-phone"></i>
          <a href="tel:03096587000">0309 6587000</a>
        </div>
        <div class="footer-contact-item">
          <i class="fab fa-whatsapp"></i>
          <a href="https://wa.me/923096587000" target="_blank">Order on WhatsApp</a>
        </div>
        <div class="footer-contact-item">
          <i class="fas fa-clock"></i>
          <span>Daily: 04:00 PM – 02:00 AM</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 WokUp Chinese Restaurant. All rights reserved.</span>
      <span>Made with <i class="fas fa-heart" style="color:var(--orange);"></i> in Lahore</span>
    </div>
  `;
  document.body.appendChild(footer);
}

/* =============================================
   CART — sessionStorage, structured WhatsApp checkout
   ============================================= */
const CART_KEY = 'wokup-cart';
const WA_NUMBER = '923096587000';

function _getCart() {
  try {
    const raw = sessionStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function _saveCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
  _renderCartBadge();
  _renderCartDrawer();
}

function _idFor(name, variation) {
  return (name + '|' + (variation || 'base')).toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function _cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function _cartCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/* Add item to cart — called from menu/home item cards */
function addToCart(name, variation, price) {
  const cart = _getCart();
  const id = _idFor(name, variation);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, variation: variation || null, price: Number(price), qty: 1 });
  }
  _saveCart(cart);
  _bumpCartIcon();
}

/* Generic handler wired to "Add" buttons on menu-item / menu-card elements */
function addToCartFromItem(btn) {
  const item = btn.closest('.menu-item, .menu-card');
  if (!item) return;
  const name = item.dataset.name;
  const selectedVar = item.querySelector('.var-btn.selected');
  let variation = null, price;
  if (selectedVar) {
    variation = selectedVar.dataset.label;
    price = parseFloat(selectedVar.dataset.price);
  } else {
    price = parseFloat(item.dataset.price);
    variation = item.dataset.variation || null;
  }
  if (isNaN(price)) return;

  addToCart(name, variation, price);

  // Button feedback
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Added';
  btn.disabled = true;
  setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 1100);
}

function changeQty(id, delta) {
  const cart = _getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  const updated = item.qty > 0 ? cart : cart.filter(i => i.id !== id);
  _saveCart(updated);
}

function removeCartItem(id) {
  const cart = _getCart().filter(i => i.id !== id);
  _saveCart(cart);
}

function clearCart() {
  sessionStorage.removeItem(CART_KEY);
  _renderCartBadge();
  _renderCartDrawer();
}

function _bumpCartIcon() {
  const btn = document.getElementById('cart-btn');
  if (!btn) return;
  btn.classList.remove('bump');
  void btn.offsetWidth; // restart animation
  btn.classList.add('bump');
  setTimeout(() => btn.classList.remove('bump'), 450);
}

function _renderCartBadge() {
  const cart = _getCart();
  const count = _cartCount(cart);
  const badge = document.getElementById('cart-badge');
  const badgeMobile = document.getElementById('cart-badge-mobile');
  [badge, badgeMobile].forEach(el => {
    if (!el) return;
    el.textContent = count;
    el.classList.toggle('hidden', count === 0);
  });
}

function _ensureCartUI() {
  if (document.getElementById('cart-drawer')) return; // already mounted

  const overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  overlay.id = 'cart-overlay';
  overlay.onclick = closeCart;

  const drawer = document.createElement('div');
  drawer.className = 'cart-drawer';
  drawer.id = 'cart-drawer';
  drawer.innerHTML = `
    <div class="cart-drawer-header">
      <h3><i class="fas fa-shopping-cart" style="margin-right:8px;"></i>Your Order</h3>
      <button class="cart-close-btn" onclick="closeCart()" aria-label="Close cart"><i class="fas fa-times"></i></button>
    </div>
    <div class="cart-items-list" id="cart-items-list"></div>
    <div class="cart-drawer-footer" id="cart-drawer-footer"></div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  _renderCartDrawer();
}

function _renderCartDrawer() {
  const list = document.getElementById('cart-items-list');
  const footer = document.getElementById('cart-drawer-footer');
  if (!list || !footer) return;

  const cart = _getCart();

  if (cart.length === 0) {
    list.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
        <a href="menu.html" onclick="closeCart()">Browse the Menu →</a>
      </div>
    `;
    footer.innerHTML = '';
    return;
  }

  list.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        ${item.variation ? `<span class="cart-item-variant">${item.variation}</span>` : ''}
      </div>
      <div class="cart-item-controls">
        <button onclick="changeQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
      </div>
      <div class="cart-item-price">Rs. ${item.qty * item.price}</div>
      <button class="cart-item-remove" onclick="removeCartItem('${item.id}')" aria-label="Remove item"><i class="fas fa-trash"></i></button>
    </div>
  `).join('');

  const total = _cartTotal(cart);
  footer.innerHTML = `
    <div class="cart-total-row">
      <span>Total</span>
      <span>Rs. ${total}</span>
    </div>
    <button class="cart-place-order-btn" onclick="placeOrderWhatsApp()">
      <i class="fab fa-whatsapp"></i> Place Order on WhatsApp
    </button>
    <button class="cart-clear-btn" onclick="clearCart()">Clear Cart</button>
  `;
}

function openCart() {
  _ensureCartUI();
  _renderCartDrawer();
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (overlay) overlay.classList.remove('open');
  if (drawer) drawer.classList.remove('open');
  document.body.style.overflow = '';
}

function placeOrderWhatsApp() {
  const cart = _getCart();
  if (cart.length === 0) return;

  const lines = cart.map((item, i) =>
    `${i + 1}. ${item.name}${item.variation ? ' (' + item.variation + ')' : ''} x${item.qty} — Rs. ${item.qty * item.price}`
  );
  const total = _cartTotal(cart);

  const message =
    `Hi WokUp! I'd like to place this order:\n\n` +
    lines.join('\n') +
    `\n\nTotal: Rs. ${total}`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');

  // Cart stays intact for the rest of the session — lets the customer
  // come back, edit quantities, and resend an updated order if needed.
  closeCart();
}

// Close cart on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCart();
});
