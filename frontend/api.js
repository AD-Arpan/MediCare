const API_URL = 'http://localhost:3000/api';

// Authentication API calls
export const authAPI = {
    signup: async (userData) => {
        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            console.log('Attempting login with:', credentials);
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            console.log('Login response status:', response.status);
            return await response.json();
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
};

// Cart API calls
export const cartAPI = {
    getCart: async () => {
        try {
            const response = await fetch(`${API_URL}/cart`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Get cart error:', error);
            throw error;
        }
    },

    addToCart: async (productName, quantity) => {
        try {
            const response = await fetch(`${API_URL}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ productName, quantity })
            });
            return await response.json();
        } catch (error) {
            console.error('Add to cart error:', error);
            throw error;
        }
    },

    removeFromCart: async (productId) => {
        try {
            const response = await fetch(`${API_URL}/cart/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Remove from cart error:', error);
            throw error;
        }
    }
};