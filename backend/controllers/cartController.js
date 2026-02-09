const Cart = require('../database/models/Cart');
const Product = require('../database/models/Product');

// @desc    Add product to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res) => {
    const { productName, quantity } = req.body;
    const userId = req.user.id; // User ID is available from the protect middleware

    try {
        // Find the product by name
        const product = await Product.findOne({ name: productName });

        if (!product) {
            console.log(`Product not found: ${productName}`);
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Log successful product find
        console.log(`Found product: ${product.name} with ID: ${product._id}`);
        
        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            // Cart exists for the user
            // Use product._id for comparison
            const itemIndex = cart.items.findIndex(item => item.product && item.product.toString() === product._id.toString());

            if (itemIndex > -1) {
                // Product already exists in cart, update quantity
                cart.items[itemIndex].quantity += quantity;
                console.log(`Updated quantity for product ${productName} in cart for user ${userId}`);
            } else {
                // Product does not exist in cart, add new item
                // Store product._id instead of productName
                cart.items.push({ product: product._id, quantity });
                console.log(`Added product ${productName} to cart for user ${userId}`);
            }
            // Recalculate total amount - the schema pre-save hook will do this
            await cart.save();
            console.log(`Cart saved for user ${userId}`);
            // Populate the added/updated item before sending the response
             const populatedCart = await Cart.findOne({ user: userId }).populate('items.product', 'name price image');
            res.status(200).json({ success: true, message: 'Product added to cart', cart: populatedCart });

        } else {
            // No cart exists for the user, create a new one
            // Store product._id instead of productName
            cart = await Cart.create({
                user: userId,
                items: [{ product: product._id, quantity }]
            });
            console.log(`New cart created and saved for user ${userId}`);
            // Recalculate total amount - the schema pre-save hook will do this
            // Populate the added item before sending the response
             const populatedCart = await Cart.findOne({ user: userId }).populate('items.product', 'name price image');
             res.status(201).json({ success: true, message: 'Product added to cart', cart: populatedCart });
        }

    } catch (error) {
        console.error('Error adding to cart:', error.message, error.stack);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getUserCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price image manufacturer');

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        res.status(200).json({ success: true, cart });

    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Remove product from cart
// @route   DELETE /api/cart/:productId
// @access  Private
exports.removeFromCart = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user.id; // User ID is available from the protect middleware

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        // Filter out the item to be removed
        const initialItemCount = cart.items.length;
        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        // Check if an item was actually removed
        if (cart.items.length === initialItemCount) {
             return res.status(404).json({ success: false, message: 'Product not found in cart' });
        }

        await cart.save();

        // Populate the updated cart before sending the response
        const populatedCart = await Cart.findOne({ user: userId }).populate('items.product', 'name price image');

        res.status(200).json({ success: true, message: 'Product removed from cart', cart: populatedCart });

    } catch (error) {
        console.error('Error removing from cart:', error.message, error.stack);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};