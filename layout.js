// ===== NAVBAR INJECTION =====
function injectNavbar(activePage) {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.innerHTML = `
    <a href="index.html" class="nav-logo">
      <img src="assets/logo.png" alt="WokUp Logo">
      <span>WokUp</span>
    </a>
    <ul class="nav-links">
      <li><a href="index.html" ${activePage==='home'?'class="active"':''}>Home</a></li>
      <li><a href="menu.html" ${activePage==='menu'?'class="active"':''}>Full Menu</a></li>
      <li><a href="about.html" ${activePage==='about'?'class="active"':''}>About Us</a></li>
      <li><a href="contact.html" ${activePage==='contact'?'class="active"':''}>Contact</a></li>
    </ul>
    <a href="https://wa.me/923096587000?text=I%20want%20to%20order%20from%20WokUp" target="_blank" class="nav-order-btn">
      <i class="fab fa-whatsapp"></i> Order Now
    </a>
    <button class="hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  `;

  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  mobileNav.id = 'mobile-nav';
  mobileNav.innerHTML = `
    <a href="index.html" ${activePage==='home'?'class="active"':''}>Home</a>
    <a href="menu.html" ${activePage==='menu'?'class="active"':''}>Full Menu</a>
    <a href="about.html" ${activePage==='about'?'class="active"':''}>About Us</a>
    <a href="contact.html" ${activePage==='contact'?'class="active"':''}>Contact</a>
    <a href="https://wa.me/923096587000?text=I%20want%20to%20order%20from%20WokUp" target="_blank" class="mobile-order">
      <i class="fab fa-whatsapp"></i> Order on WhatsApp
    </a>
  `;

  document.body.prepend(mobileNav);
  document.body.prepend(nav);

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobile-nav').classList.toggle('open');
  });
}

// ===== FOOTER INJECTION =====
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
          <li><a href="menu.html#chefs">Gravies</a></li>
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
      <span>Made with <i class="fas fa-heart" style="color:#ff4d00;"></i> in Lahore</span>
    </div>
  `;
  document.body.appendChild(footer);
}
