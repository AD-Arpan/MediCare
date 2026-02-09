import { cartAPI } from './api.js';

// Cart functionality
let cart = [];
const cartCount = document.querySelector('.cart-count');

// Function to format price
function formatPrice(price) {
    return price.toString();
}

// Load cart from localStorage
async function loadCart() {
    const token = localStorage.getItem('token');
    if (!token) {
        // If no token, clear local cart data
        localStorage.removeItem('cart');
        cart = [];
        updateCartCount();
        updateCartDisplay();
        return;
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        // We still load from localStorage initially for quicker display,
        // but we will fetch from backend to get updated details.
        updateCartCount();
        updateCartDisplay();
    }

    // Fetch the latest cart data from the backend
    try {
        const response = await cartAPI.getCart();
        if (response.success) {
            cart = response.cart.items; // Assuming the backend returns { success: true, cart: { items: [...] } }
            localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage with full data
            updateCartCount();
            updateCartDisplay(); // Update display with data from backend
        } else {
            console.error('Failed to fetch cart from backend:', response.message);
            // Optionally, display an error message to the user
        }
    } catch (error) {
        console.error('Error fetching cart from backend:', error);
        // Optionally, display an error message to the user
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Function to update cart display
function updateCartDisplay() {
    const orderItems = document.querySelector('.order-items');
    if (!orderItems) return;

    orderItems.innerHTML = cart.map(item => {
        // Check if product data exists for the item
        if (!item.product) {
            console.error('Skipping item in cart display due to missing product data:', item);
            return ''; // Skip this item or render a placeholder
        }

        return `
        <div class="order-item">
            <div class="item-image">
                <img src="${item.product.image}" alt="${item.product.name}">
            </div>
            <div class="item-details">
                <div class="item-header">
                    <h3>${item.product.name}</h3>
                    <button class="remove-btn" data-product-id="${item.product._id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <p class="manufacturer">${item.product.manufacturer || ''}</p>
                <div class="price-qty">
                    <div class="price-info">
                        <span class="current-price">₹${item.product.price}</span>
                        ${item.product.originalPrice ? `<span class="original-price">₹${item.product.originalPrice}</span>` : ''}
                    </div>
                    <div class="qty-selector">
                        <label>QTY:</label>
                        <select class="qty-select" data-item-name="${item.product.name}">
                            ${[1,2,3,4,5].map(num =>
                                `<option value="${num}" ${item.quantity === num ? 'selected' : ''}>${num}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join('');

    updateTotals();

    // Add event listeners after the HTML is rendered
    const removeButtons = orderItems.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.currentTarget.dataset.productId;
            removeFromCart(productId);
        });
    });

    const qtySelects = orderItems.querySelectorAll('.qty-select');
    qtySelects.forEach(select => {
        select.addEventListener('change', (event) => {
            const itemName = event.currentTarget.dataset.itemName;
            const newQuantity = event.currentTarget.value;
            updateQuantity(itemName, newQuantity);
        });
    });
}

// Function to remove item from cart
async function removeFromCart(productId) {
    try {
        // Remove from local cart state
        cart = cart.filter(item => item.product._id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();

        // Call backend API to remove from database
        const response = await cartAPI.removeFromCart(productId);

        if (!response.success) {
            console.error('Failed to remove item from backend cart:', response.message);
            // Optionally, inform the user that backend removal failed
        }

    } catch (error) {
        console.error('Error removing item from cart:', error);
        // Optionally, inform the user about the error
    }
}

// Function to update quantity
function updateQuantity(itemName, newQuantity) {
    const item = cart.find(item => item.product.name === itemName);
    if (item) {
        item.quantity = parseInt(newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }
}

// Function to update totals
function updateTotals() {
    let mrpTotal = 0;
    let discount = 0;
    let shippingCharge = 0;

    cart.forEach(item => {
        const itemPrice = item.product.price;
        const itemOriginalPrice = item.product.originalPrice ? item.product.originalPrice : itemPrice;
        
        mrpTotal += itemOriginalPrice * item.quantity;
        discount += (itemOriginalPrice - itemPrice) * item.quantity;
    });

    // Add shipping charge if total is less than 100
    if (mrpTotal < 100) {
        shippingCharge = 50;
    }

    const totalPayable = mrpTotal + shippingCharge;

    // Update the display
    document.getElementById('mrp-total').textContent = `₹${mrpTotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `₹${shippingCharge.toFixed(2)}`;
    document.getElementById('total-payable').textContent = `₹${totalPayable.toFixed(2)}`;
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', loadCart);

// Make cart icon clickable to return to main page
const cartIcon = document.querySelector('.cart-btn');
if (cartIcon) {
    cartIcon.style.cursor = 'pointer';
    cartIcon.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Category functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categoryDetails = document.querySelectorAll('.category-details');

    // Show first category by default
    if (categoryDetails.length > 0) {
        categoryDetails[0].classList.add('active');
        categoryButtons[0].classList.add('active');
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Remove active class from all buttons and details
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            categoryDetails.forEach(detail => detail.classList.remove('active'));
            
            // Add active class to clicked button and corresponding detail
            this.classList.add('active');
            document.getElementById(category).classList.add('active');
        });
    });
}); 