const express = require('express');
const router = express.Router();
const { addToCart, getUserCart, removeFromCart } = require('../controllers/cartController');

const { protect } = require('../middleware/auth');

router.route('/').post(protect, addToCart).get(protect, getUserCart);
router.route('/:productId').delete(protect, removeFromCart);

module.exports = router; 