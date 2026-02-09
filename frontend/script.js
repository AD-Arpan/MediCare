import { cartAPI } from './api.js';

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.querySelector('.cart-btn');

// Make cart clickable
cartIcon.style.cursor = 'pointer';
cartIcon.addEventListener('click', () => {
    window.location.href = 'order-summary.html';
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', async function(e) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                showNotification('Please login to add items to cart');
                return;
            }

            const card = e.target.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            const quantity = 1;

            // Call the backend API to add item to cart
            const response = await cartAPI.addToCart(productName, quantity);
            
            if (response.success) {
                // Update local cart data from the response
                if (response.cart && response.cart.items) {
                    cart = response.cart.items; // Use the cart data from the add to cart response
                    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
                    console.log('Frontend cart updated from add to cart response:', cart);
                }

                // Update cart count
                console.log('Calling updateCartCount after adding item.');
                updateCartCount(); // Call updateCartCount
                
                // Show success notification
                showNotification('Product added to cart!');
                
                // Update button state
                button.textContent = '✓ ADDED';
                button.style.backgroundColor = '#4CAF50';
            } else {
                showNotification(response.message || 'Error adding to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            showNotification('Error adding to cart');
        }
    });
});

// Update cart count
function updateCartCount() {
    console.log('Inside updateCartCount. Current cart:', cart);
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    console.log('Calculated total items:', totalItems);
    cartCount.textContent = totalItems;
}

// Load cart data when page loads
window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (token) {
        // If logged in, fetch cart from backend
        try {
            const response = await cartAPI.getCart();
            if (response.success && response.cart && response.cart.items) {
                cart = response.cart.items; // Update local cart variable
                localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
                console.log('Frontend cart updated from backend:', cart);
                updateCartCount(); // Update cart count based on backend data

                // Update button states based on backend cart
                const backendCartItems = response.cart.items;
                const addToCartButtons = document.querySelectorAll('.add-to-cart');
                addToCartButtons.forEach(button => {
                    const card = button.closest('.product-card');
                    const productName = card.querySelector('h3').textContent.trim();
                    const isInCart = backendCartItems.some(item =>
                        item.product && item.product.name && item.product.name.trim() === productName
                    );
                    if (isInCart) {
                        button.textContent = '✓ ADDED';
                        button.style.backgroundColor = '#4CAF50';
                        button.disabled = true;
                    } else {
                         button.textContent = 'ADD TO CART';
                         button.style.backgroundColor = '';
                         button.disabled = false;
                    }
                });

            } else {
                console.error('Failed to fetch initial cart data:', response ? response.message : 'Unknown error');
                // If fetching fails for logged in user, clear local storage as a fallback
                cart = [];
                localStorage.removeItem('cart');
                updateCartCount();
                 // Optionally show an error to the user
            }
        } catch (error) {
            console.error('Error fetching initial cart data:', error);
            // If fetching fails for logged in user, clear local storage as a fallback
            cart = [];
            localStorage.removeItem('cart');
            updateCartCount();
            // Optionally show an error to the user
        }
    } else {
        // If not logged in, ensure cart is empty and count is 0
        cart = [];
        localStorage.removeItem('cart');
        updateCartCount();
         // Also reset button states if not logged in
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.textContent = 'ADD TO CART';
            button.style.backgroundColor = '';
            button.disabled = false;
        });
    }

    updateAuthButton(); // This function handles updating the Sign In/Sign Out button
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Search functionality
const searchInput = document.querySelector('.search-input input');
const productCards = document.querySelectorAll('.product-card');
const categoryButtons = document.querySelectorAll('.category-btn');
const categoryDetails = document.querySelectorAll('.category-details');

searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    let foundInCategory = null;
    
    // First, hide all products
    productCards.forEach(card => {
        card.style.display = 'none';
    });
    
    // Search through all products and find matches
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const manufacturer = card.querySelector('.manufacturer').textContent.toLowerCase();
        const categoryContainer = card.closest('.category-details');
        
        if (productName.includes(searchTerm) || manufacturer.includes(searchTerm)) {
            card.style.display = '';
            // If this product is in a different category than the current active one
            if (!categoryContainer.classList.contains('active')) {
                foundInCategory = categoryContainer.id;
            }
        }
    });
    
    // If we found products in a different category, switch to that category
    if (foundInCategory) {
        // Remove active class from all buttons and details
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        categoryDetails.forEach(detail => detail.classList.remove('active'));
        
        // Add active class to the category button and corresponding detail
        const targetButton = document.querySelector(`.category-btn[data-category="${foundInCategory}"]`);
        const targetDetails = document.getElementById(foundInCategory);
        
        if (targetButton && targetDetails) {
            targetButton.classList.add('active');
            targetDetails.classList.add('active');
        }
    }
});

// Add hover effect to category cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

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

// Initialize the cart count
updateCartCount();

// Sign In/Sign Up Button Handling
const authBtn = document.querySelector('.auth-btn');

function updateAuthButton() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
        // User is signed in
        const userData = JSON.parse(user);
        
        // Create profile image element
        const profileImg = document.createElement('img');
        profileImg.src = 'pictures/profile picture.png'; 
        profileImg.alt = 'User Profile';
        profileImg.classList.add('profile-img'); // Add a class for styling
        profileImg.title = userData.name; // Show username on hover
        profileImg.style.cssText = 'width: 40px; height: 40px; border-radius: 50%; cursor: pointer; vertical-align: middle;'; // Basic inline styling, move to CSS file later

        // Replace the existing button with the image
        if (authBtn && authBtn.parentNode) {
            authBtn.parentNode.replaceChild(profileImg, authBtn);

            // Add click listener to redirect to profile page
            profileImg.addEventListener('click', () => {
                // NOTE: Redirect to your actual profile page URL
                window.location.href = 'profile.html'; 
            });
        }
    } else {
        // User is not signed in, ensure the Sign In button exists and is visible
         if (authBtn) {
             authBtn.style.display = ''; // Make sure it's visible
             authBtn.textContent = 'Login'; // Ensure text is correct
             authBtn.onclick = () => { window.location.href = 'login.html'; };
         }
    }
}

// Original authBtn listener (keep this for when the user is NOT logged in initially)
authBtn.addEventListener('click', () => {
    window.location.href = 'login.html'; // Navigate to the login page
}); 