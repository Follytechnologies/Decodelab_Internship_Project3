# ⚡ Zestro — Interactive Food Ordering Page
### DecodeLabs Internship · Frontend Development · Project 3

---

## 📋 Project Overview

**Zestro** is a fully interactive food ordering webpage built with pure Vanilla JavaScript and DOM manipulation — no frameworks, no libraries. It demonstrates the complete **Input → Process → Output (IPO)** loop taught in Project 3, with real-world features like menu filtering, cart management, dark mode, wishlist, and live order summary.

---

## 📁 File Structure

```
project-3/
├── p3_index.html    → HTML structure & semantic markup
├── p3_style.css     → Styling, dark mode theme, animations
├── p3_script.js     → All JavaScript: state, events, DOM manipulation
└── README.md        → This file
```

> Keep all four files in the **same folder**. Open `p3_index.html` in any modern browser.

---

## ✅ Project Requirements Checklist

| Requirement | Implementation |
|---|---|
| **Buttons / Toggles** | Filter pills, Add-to-Cart, Qty +/−, Dark Mode toggle, Wishlist ❤️ |
| **Basic User Interaction** | Click, input, keydown events throughout |
| **Dynamic Content Update** | Menu re-renders, cart updates, counter badge — all via DOM manipulation |
| **JavaScript Basics** | Variables (`const`/`let`), functions, arrays, conditionals, loops |
| **DOM Manipulation** | `querySelector`, `createElement`, `appendChild`, `classList`, `textContent` |

---

## 🎮 Interactive Features

### 1. Category Filters
Click any filter pill (Starters, Mains, Burgers, Pizza, Desserts, Drinks) to instantly filter the menu. Uses `classList.toggle('is-active')` and array `.filter()`.

### 2. Live Search
Type in the search bar to search menu items by name or description in real-time. The `input` event fires on every keystroke, updating state and re-rendering.

### 3. Add to Cart / Quantity Control
- Click **+ Add** to add an item — the button transforms into a qty `−` / `+` control
- Qty changes in both the menu card and the cart drawer stay in sync
- Items with qty 0 are automatically removed from the cart

### 4. Cart Drawer
- Opens/closes with a smooth CSS transform animation
- Triggered by the cart button, overlay click, or `Escape` key
- Live subtotal, delivery fee (FREE over ₹499!), and total

### 5. Dark Mode Toggle
Single click toggles the entire page theme using `body.classList.toggle('is-dark')`. CSS variables handle all color changes — only one class flip needed.

### 6. Wishlist
Click the heart on any card to toggle it as a favourite. State is maintained in a JavaScript `Set`.

### 7. Order Placement
Click **Place Order** to clear the cart and show a success toast notification.

---

## 🧠 Key JavaScript Concepts Demonstrated

### State Management
```javascript
const state = {
  cart:     [],
  filter:   'all',
  search:   '',
  darkMode: false,
  wishlist: new Set(),
};
// UI always reflects state — never the other way around
```

### Event Delegation (Performance Pattern)
```javascript
// ONE listener on the parent instead of N listeners on N cards
menuGrid.addEventListener('click', (e) => {
  const addBtn = e.target.closest('.js-add-btn');
  if (addBtn) addToCart(Number(addBtn.dataset.id));
});
```

### DOM Mutation via classList
```javascript
// JS handles behavior, CSS handles the animation
document.body.classList.toggle('is-dark', state.darkMode);
cartDrawer.classList.add('is-open');
```

### Dynamic Node Creation
```javascript
const card = document.createElement('article');
card.className = 'menu-card';
card.innerHTML = `...`;
menuGrid.appendChild(card);
```

### `const` vs `let` Convention
```javascript
const menuGrid = document.querySelector('#js-menu-grid'); // DOM ref — never reassigns
let   totalQty = state.cart.reduce((sum, c) => sum + c.qty, 0); // mutable calc
```

---

## 🎨 Design Notes

- **Theme:** Warm orange/amber food aesthetic with dark mode support
- **Fonts:** `Playfair Display` (display) + `Outfit` (body)
- **Responsive:** Works on mobile (360px) through desktop (1140px+)
- **Accessible:** `aria-label`, `aria-hidden`, `aria-pressed`, `aria-live` on dynamic regions

---

## 📚 Resources

- [MDN — addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN — classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- [MDN — createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [MDN — Event Delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)

---

*Built with ⚡ for DecodeLabs · Batch 2026*
