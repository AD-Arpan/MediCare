const express = require('express');
const router = express.Router();
const Order = require('../database/models/Order');
const Cart = require('../database/models/Cart');

// Get all orders for a user
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.product');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create order from cart
router.post('/', async (req, res) => {
    try {
        // Get user's cart
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total
        const total = cart.items.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);

        // Create order
        const order = new Order({
            user: req.user.id,
            items: cart.items,
            total,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod
        });

        const newOrder = await order.save();

        // Clear the cart
        cart.items = [];
        await cart.save();

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update order status (admin only)
router.patch('/:id/status', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = req.body.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router; 