// ================================================================
//  ZESTRO — Interactive Food Ordering Page
//  Project 3: Interactive Web Elements
//  Demonstrates: DOM manipulation, event listeners, state mgmt
// ================================================================

// ── STATE ────────────────────────────────────────────────────────
// All application data lives here. The UI is always a reflection
// of this state — never the other way around.
const state = {
  cart:       [],        // Array of { ...item, qty }
  filter:     'all',     // Active category filter
  search:     '',        // Current search query
  darkMode:   false,     // Dark mode toggle state
  wishlist:   new Set(), // Set of wishlisted item IDs
};

// ── DATA: MENU ITEMS ─────────────────────────────────────────────
const menuItems = [
  { id: 1,  category: 'starters', name: 'Crispy Veg Spring Rolls',  desc: 'Golden-fried rolls stuffed with spiced veggies & glass noodles.',  price: 149, emoji: '🥚', rating: '4.5 ★' },
  { id: 2,  category: 'starters', name: 'Paneer Tikka Skewers',     desc: 'Chargrilled cottage cheese with smoky tandoor spices.',              price: 199, emoji: '🧆', rating: '4.7 ★' },
  { id: 3,  category: 'starters', name: 'Garlic Mushroom Toast',    desc: 'Sautéed mushrooms on sourdough with herb butter.',                   price: 129, emoji: '🍄', rating: '4.3 ★' },
  { id: 4,  category: 'mains',    name: 'Butter Chicken Masala',    desc: 'Slow-cooked chicken in a rich tomato-cream gravy.',                  price: 299, emoji: '🍲', rating: '4.8 ★' },
  { id: 5,  category: 'mains',    name: 'Dal Makhani',              desc: 'Overnight-simmered black lentils in butter and cream.',              price: 229, emoji: '🥘', rating: '4.6 ★' },
  { id: 6,  category: 'mains',    name: 'Paneer Kadai',             desc: 'Cottage cheese tossed in a bold, spiced bell-pepper gravy.',         price: 259, emoji: '🫕', rating: '4.5 ★' },
  { id: 7,  category: 'mains',    name: 'Veg Biryani',              desc: 'Fragrant basmati rice layered with spiced vegetables & saffron.',    price: 249, emoji: '🍚', rating: '4.4 ★' },
  { id: 8,  category: 'burgers',  name: 'Classic Chicken Burger',   desc: 'Juicy grilled chicken patty with lettuce, cheese & chipotle mayo.', price: 179, emoji: '🍔', rating: '4.6 ★' },
  { id: 9,  category: 'burgers',  name: 'Crispy Veg Burger',        desc: 'Crunchy veggie patty with pickled jalapeños & sriracha.',           price: 149, emoji: '🥙', rating: '4.3 ★' },
  { id: 10, category: 'burgers',  name: 'BBQ Beef Smash Burger',    desc: 'Double smash patty with smoky BBQ sauce & caramelised onions.',     price: 229, emoji: '🍖', rating: '4.9 ★' },
  { id: 11, category: 'pizza',    name: 'Margherita Classic',       desc: 'San Marzano tomato, fresh mozzarella, and basil on thin crust.',    price: 299, emoji: '🍕', rating: '4.7 ★' },
  { id: 12, category: 'pizza',    name: 'Spicy Arrabbiata',         desc: 'Fiery tomato base with chilli flakes, olives & roasted peppers.',   price: 329, emoji: '🌶', rating: '4.5 ★' },
  { id: 13, category: 'pizza',    name: 'BBQ Chicken Loaded',       desc: 'Smoky BBQ chicken, red onions, corn & mozzarella.',                 price: 349, emoji: '🐔', rating: '4.8 ★' },
  { id: 14, category: 'desserts', name: 'Warm Gulab Jamun',         desc: 'Soft milk-solid dumplings soaked in rose & cardamom syrup.',        price: 99,  emoji: '🍯', rating: '4.9 ★' },
  { id: 15, category: 'desserts', name: 'Mango Kulfi',              desc: 'Creamy frozen dessert with alphonso mango & pistachio crumble.',    price: 119, emoji: '🍦', rating: '4.8 ★' },
  { id: 16, category: 'desserts', name: 'Chocolate Lava Cake',      desc: 'Warm dark chocolate cake with a molten centre & vanilla ice cream.',price: 149, emoji: '🎂', rating: '4.7 ★' },
  { id: 17, category: 'drinks',   name: 'Mango Lassi',              desc: 'Thick blended yoghurt with fresh Alphonso mangoes.',                price: 89,  emoji: '🥭', rating: '4.8 ★' },
  { id: 18, category: 'drinks',   name: 'Masala Chai',              desc: 'Spiced milk tea brewed with ginger, cardamom & clove.',             price: 49,  emoji: '☕', rating: '4.6 ★' },
  { id: 19, category: 'drinks',   name: 'Fresh Lime Soda',          desc: 'Chilled lime juice with soda, black salt & mint.',                  price: 69,  emoji: '🥤', rating: '4.4 ★' },
  { id: 20, category: 'drinks',   name: 'Watermelon Cooler',        desc: 'Freshly pressed watermelon with a hint of basil & chaat masala.',   price: 79,  emoji: '🍉', rating: '4.5 ★' },
];

// ── DOM REFERENCES ───────────────────────────────────────────────
// Using const for DOM refs (they won't be reassigned)
const menuGrid      = document.getElementById('js-menu-grid');
const filterBtns    = document.querySelectorAll('.js-filter');
const searchInput   = document.getElementById('js-search');
const searchClear   = document.querySelector('.js-search-clear');
const resultInfo    = document.querySelector('.js-result-info');
const emptyState    = document.querySelector('.js-empty');

const cartOpenBtn   = document.querySelector('.js-cart-open');
const cartCloseBtn  = document.querySelector('.js-cart-close');
const cartOverlay   = document.querySelector('.js-cart-overlay');
const cartDrawer    = document.querySelector('.js-cart-drawer');
const cartBody      = document.querySelector('.js-cart-body');
const cartCount     = document.querySelector('.js-cart-count');
const subtotalEl    = document.querySelector('.js-subtotal');
const deliveryEl    = document.querySelector('.js-delivery');
const totalEl       = document.querySelector('.js-total');
const checkoutBtn   = document.querySelector('.js-checkout');

const darkToggleBtn = document.querySelector('.js-dark-toggle');
const darkIcon      = document.querySelector('.js-dark-icon');
const toastEl       = document.querySelector('.js-toast');

// ── RENDER: MENU GRID ────────────────────────────────────────────
// Pure function: derives what to show from current state
function getFilteredItems() {
  return menuItems.filter(item => {
    const matchFilter = state.filter === 'all' || item.category === state.filter;
    const matchSearch = item.name.toLowerCase().includes(state.search.toLowerCase()) ||
                        item.desc.toLowerCase().includes(state.search.toLowerCase());
    return matchFilter && matchSearch;
  });
}

function renderMenu() {
  const items = getFilteredItems();

  // Update result count
  const total = menuItems.length;
  resultInfo.textContent = state.search
    ? `Showing ${items.length} result${items.length !== 1 ? 's' : ''} for "${state.search}"`
    : `${items.length} of ${total} dishes`;

  // Show / hide empty state
  emptyState.classList.toggle('is-hidden', items.length > 0);
  menuGrid.classList.toggle('is-hidden', items.length === 0);

  // Build cards
  menuGrid.innerHTML = '';
  items.forEach((item, i) => {
    const inCart    = state.cart.find(c => c.id === item.id);
    const isWished  = state.wishlist.has(item.id);

    // Create card element via DOM API (document.createElement)
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.style.animationDelay = `${i * 0.05}s`;
    card.dataset.id = item.id;

    card.innerHTML = `
      <div class="card-img-wrap">
        <div class="card-img">${item.emoji}</div>
        <button
          class="card-wish js-wish ${isWished ? 'is-wished' : ''}"
          data-id="${item.id}"
          aria-label="${isWished ? 'Remove from wishlist' : 'Add to wishlist'}"
          aria-pressed="${isWished}"
        >${isWished ? '❤️' : '🤍'}</button>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-category">${item.category}</span>
          <span class="card-rating">${item.rating}</span>
        </div>
        <h3 class="card-name">${item.name}</h3>
        <p class="card-desc">${item.desc}</p>
        <div class="card-footer">
          <div class="card-price">₹${item.price} <span>per serving</span></div>
          ${inCart
            ? `<div class="qty-control">
                <button class="qty-btn js-qty" data-id="${item.id}" data-action="dec" aria-label="Decrease">−</button>
                <span class="qty-num">${inCart.qty}</span>
                <button class="qty-btn js-qty" data-id="${item.id}" data-action="inc" aria-label="Increase">+</button>
               </div>`
            : `<button class="js-add-btn" data-id="${item.id}" aria-label="Add ${item.name} to cart">+ Add</button>`
          }
        </div>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

// ── RENDER: CART DRAWER ──────────────────────────────────────────
function renderCart() {
  // Cart count badge
  const totalQty = state.cart.reduce((sum, c) => sum + c.qty, 0);
  cartCount.textContent = totalQty;
  cartCount.classList.toggle('is-hidden', totalQty === 0);

  // Animate count badge
  cartCount.classList.remove('pop');
  void cartCount.offsetWidth; // force reflow
  cartCount.classList.add('pop');

  // Build cart items
  if (state.cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <p>🛒</p>
        <p>Your cart is empty</p>
        <p style="font-size:.82rem;margin-top:.3rem">Add something delicious!</p>
      </div>`;
    checkoutBtn.disabled = true;
  } else {
    cartBody.innerHTML = '';
    state.cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="cart-item-emoji">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price} each</div>
          <div class="cart-item-controls">
            <button class="qty-btn js-cart-qty" data-id="${item.id}" data-action="dec" aria-label="Decrease">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn js-cart-qty" data-id="${item.id}" data-action="inc" aria-label="Increase">+</button>
          </div>
        </div>
        <div class="cart-item-total">₹${item.price * item.qty}</div>
      `;
      cartBody.appendChild(cartItem);
    });
    checkoutBtn.disabled = false;
  }

  // Update totals
  const subtotal = state.cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const delivery = subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 49;
  subtotalEl.textContent = `₹${subtotal}`;
  deliveryEl.textContent = delivery === 0 ? (subtotal > 0 ? 'FREE 🎉' : '₹0') : `₹${delivery}`;
  totalEl.textContent    = `₹${subtotal + delivery}`;
}

// ── CART HELPERS ─────────────────────────────────────────────────
function addToCart(id) {
  const item = menuItems.find(m => m.id === id);
  const existing = state.cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...item, qty: 1 });
  }
  renderCart();
  renderMenu(); // refresh add/qty buttons
}

function changeQty(id, action) {
  const idx = state.cart.findIndex(c => c.id === id);
  if (idx === -1) return;

  if (action === 'inc') {
    state.cart[idx].qty += 1;
  } else {
    state.cart[idx].qty -= 1;
    if (state.cart[idx].qty <= 0) {
      state.cart.splice(idx, 1); // remove from cart
    }
  }
  renderCart();
  renderMenu();
}

// ── CART DRAWER OPEN / CLOSE ─────────────────────────────────────
function openCart() {
  cartDrawer.classList.add('is-open');
  cartOverlay.classList.add('is-open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  cartOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('is-open');
  cartOverlay.classList.remove('is-open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  cartOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// ── DARK MODE ────────────────────────────────────────────────────
function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  document.body.classList.toggle('is-dark', state.darkMode);
  darkIcon.textContent = state.darkMode ? '☀️' : '🌙';
}

// ── WISHLIST TOGGLE ──────────────────────────────────────────────
function toggleWishlist(id) {
  if (state.wishlist.has(id)) {
    state.wishlist.delete(id);
  } else {
    state.wishlist.add(id);
  }
  renderMenu();
}

// ── TOAST ────────────────────────────────────────────────────────
function showToast() {
  toastEl.classList.remove('is-hidden');
  toastEl.classList.add('is-visible');
  setTimeout(() => {
    toastEl.classList.remove('is-visible');
    setTimeout(() => toastEl.classList.add('is-hidden'), 400);
  }, 3000);
}

// ── EVENT LISTENERS ──────────────────────────────────────────────

// 1. Filter pills
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update state
    state.filter = btn.dataset.filter;
    // Update active class on all pills
    filterBtns.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    // Re-render
    renderMenu();
  });
});

// 2. Search input (input event fires on every keystroke)
searchInput.addEventListener('input', (e) => {
  state.search = e.target.value;
  searchClear.classList.toggle('is-hidden', state.search.length === 0);
  renderMenu();
});

// 3. Search clear button
searchClear.addEventListener('click', () => {
  state.search = '';
  searchInput.value = '';
  searchClear.classList.add('is-hidden');
  searchInput.focus();
  renderMenu();
});

// 4. Menu grid — event delegation (one listener for all cards)
// Instead of attaching N listeners to N buttons, we attach ONE
// to the parent and check the target. This is more performant.
menuGrid.addEventListener('click', (e) => {
  // Add to cart
  const addBtn = e.target.closest('.js-add-btn');
  if (addBtn) {
    addToCart(Number(addBtn.dataset.id));
    return;
  }
  // Qty change (on menu card)
  const qtyBtn = e.target.closest('.js-qty');
  if (qtyBtn) {
    changeQty(Number(qtyBtn.dataset.id), qtyBtn.dataset.action);
    return;
  }
  // Wishlist toggle
  const wishBtn = e.target.closest('.js-wish');
  if (wishBtn) {
    toggleWishlist(Number(wishBtn.dataset.id));
    return;
  }
});

// 5. Cart drawer qty buttons (event delegation on cart body)
cartBody.addEventListener('click', (e) => {
  const qtyBtn = e.target.closest('.js-cart-qty');
  if (qtyBtn) {
    changeQty(Number(qtyBtn.dataset.id), qtyBtn.dataset.action);
  }
});

// 6. Open / close cart
cartOpenBtn.addEventListener('click', openCart);
cartCloseBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// 7. Close cart on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCart();
});

// 8. Dark mode toggle
darkToggleBtn.addEventListener('click', toggleDarkMode);

// 9. Checkout button
checkoutBtn.addEventListener('click', () => {
  // Clear cart state
  state.cart = [];
  renderCart();
  renderMenu();
  closeCart();
  showToast();
});

// ── INIT ─────────────────────────────────────────────────────────
// Render the initial page state on load
renderMenu();
renderCart();
