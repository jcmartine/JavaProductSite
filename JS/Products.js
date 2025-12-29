const products = [
  {
    id: 1,
    name: "Indian Food Pack",
    category: "Food",
    price: 29.99,
    rating: 4.5,
    reviews: 1200,
    stock: 24,
    badge: "Bestseller",
    description: "Curry flavored Indian cuiisine with Paneer and Naan."
  },
  {
    id: 2,
    name: "Mexican Food Pack",
    category: "Food",
    price: 24.99,
    rating: 4.2,
    reviews: 800,
    stock: 15,
    badge: "New",
    description: "Delicious tacos with your choise of meet and fresh salsa."
  },
  { 
    id: 3,
    name: "Italian Food Pack",
    category: "Food",
    price: 29.99,
    rating: 4.5,
    reviews: 1200,
    stock: 24,
    badge: "Bestseller",
    description: "Authentic Italian cuisine ingredients for a delicious meal."
  },
  {   
    id: 4,
    name: "Chinese Food Pack",
    category: "Food",
    price: 29.99,
    rating: 4.5,
    reviews: 1200,
    stock: 24,
    badge: "Bestseller",
    description: "Authentic Chinese cuisine ingredients for a delicious meal."   
  },
  {
    id: 5,
    name: "Japanese Food Pack",
    category: "Food",
    price: 29.99,
    rating: 4.5,
    reviews: 1200,
    stock: 24,
    badge: "Bestseller",
    description: "Authentic Japanese cuisine ingredients for a delicious meal."
  }
];

// Display products on the page
function displayProducts() {
  const productGrid = document.getElementById('product-grid');
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'bg-white rounded-lg shadow-md p-4';
    
    productCard.innerHTML = `
      <div class="relative">
        <span class="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm font-semibold">${product.badge}</span>
        <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
        <p class="text-gray-600 mb-3">${product.description}</p>
        <div class="flex justify-between items-center mb-3">
          <span class="text-2xl font-bold text-green-600">$${product.price}</span>
          <span class="text-sm text-gray-500">Stock: ${product.stock}</span>
        </div>
        <div class="flex items-center mb-3">
          <span class="text-yellow-500 font-semibold">${product.rating}★</span>
          <span class="text-gray-500 text-sm ml-2">(${product.reviews} reviews)</span>
        </div>
        <button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded add-to-cart-btn" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
    
    productGrid.appendChild(productCard);
    // attach click handler
    const btn = productCard.querySelector('.add-to-cart-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        if (typeof addToCart === 'function') {
          const ok = addToCart(product.id, 1);
          if (ok) alert(product.name + ' added to cart');
          // if not ok, addToCart already redirected to login
        } else {
          console.warn('Cart functions not loaded');
        }
      });
    }
  });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', displayProducts);