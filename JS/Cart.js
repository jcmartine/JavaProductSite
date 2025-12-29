// Cart utility functions
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id, qty = 1) {
  // require logged-in user
  const userAvailable = (typeof getUser === 'function');
  const user = userAvailable ? getUser() : null;
  if (!user) {
    alert('Please log in to add items to the cart.');
    window.location.href = 'Login.html';
    return false;
  }

  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) item.qty += qty;
  else cart.push({ id, qty });
  saveCart(cart);
  return true;
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
}

function updateQuantity(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = qty;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    saveCart(cart);
  }
}

function getCartItemCount() {
  return getCart().reduce((s, i) => s + i.qty, 0);
}

function getTotal(productsList) {
  const cart = getCart();
  return cart.reduce((sum, ci) => {
    const p = productsList.find(px => px.id === ci.id);
    return sum + (p ? p.price * ci.qty : 0);
  }, 0);
}

function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = getCartItemCount();
}

function clearCart() {
  saveCart([]);
}

function checkout() {
  const user = (typeof getUser === 'function') ? getUser() : null;
  if (!user) {
    alert('Please log in to checkout.');
    window.location.href = 'Login.html';
    return;
  }

  const total = getTotal(products);
  if (total <= 0) {
    alert('Your cart is empty.');
    return;
  }

  const ok = confirm(`Proceed to checkout — total $${total.toFixed(2)}?`);
  if (!ok) return;

  // In a real app we'd call a backend here. For this demo, clear the cart and show success.
  clearCart();
  updateCartCount();
  renderCartPage();
  alert('Thank you — your order has been placed.');
  window.location.href = 'Index.html';
}

// Render cart page (Cart.html should include Products.js then Cart.js)
function renderCartPage() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (!container || !totalEl) return;
  const cart = getCart();
  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    totalEl.textContent = '$0.00';
    return;
  }

  cart.forEach(ci => {
    const p = products.find(px => px.id === ci.id);
    if (!p) return;
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between border-b py-3';
    row.innerHTML = `
      <div>
        <div class="font-semibold">${p.name}</div>
        <div class="text-sm text-gray-600">$${p.price.toFixed(2)}</div>
      </div>
      <div class="flex items-center space-x-2">
        <button class="px-2 py-1 bg-gray-200" data-action="dec" data-id="${p.id}">-</button>
        <input class="w-12 text-center border rounded" type="number" min="1" value="${ci.qty}" data-id="${p.id}" />
        <button class="px-2 py-1 bg-gray-200" data-action="inc" data-id="${p.id}">+</button>
        <button class="px-2 py-1 bg-red-500 text-white" data-action="remove" data-id="${p.id}">Remove</button>
      </div>
    `;
    container.appendChild(row);
  });

  // attach handlers
  container.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = parseInt(btn.getAttribute('data-id'));
      const action = btn.getAttribute('data-action');
      const input = container.querySelector(`input[data-id="${id}"]`);
      const current = input ? parseInt(input.value) : 1;
      if (action === 'inc') updateQuantity(id, current + 1);
      if (action === 'dec') updateQuantity(id, Math.max(1, current - 1));
      if (action === 'remove') removeFromCart(id);
      renderCartPage();
    });
  });

  container.querySelectorAll('input[type="number"]').forEach(inp => {
    inp.addEventListener('change', e => {
      const id = parseInt(inp.getAttribute('data-id'));
      const v = parseInt(inp.value) || 0;
      updateQuantity(id, v);
      renderCartPage();
    });
  });

  totalEl.textContent = '$' + getTotal(products).toFixed(2);
}

// Expose functions globally
window.getCart = getCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.updateCartCount = updateCartCount;
window.renderCartPage = renderCartPage;

// update count on load
document.addEventListener('DOMContentLoaded', updateCartCount);

window.clearCart = clearCart;
window.checkout = checkout;
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountEl = document.getElementById('cart-count'); 
    cartCountEl.textContent = cartItems.length;
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCart);
