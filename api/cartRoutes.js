const express = require('express');
const router = express.Router();

// Add item to the cart
router.post('/add', (req, res) => {
    const { id, name, price, quantity } = req.body;

    // Get cart from localStorage (simulated with memory here)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
        // If item exists, update quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // If item doesn't exist, add it to the cart
        cart.push({ id, name, price, quantity });
    }

    // Save the updated cart back to localStorage (simulated with memory here)
    localStorage.setItem("cart", JSON.stringify(cart));

    res.status(200).json({ message: 'Item added to cart', cart });
});

// Remove item from the cart
router.post('/remove', (req, res) => {
    const { id } = req.body;

    // Get cart from localStorage (simulated with memory here)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Filter out the item to be removed
    cart = cart.filter(item => item.id !== id);

    // Save the updated cart back to localStorage (simulated with memory here)
    localStorage.setItem("cart", JSON.stringify(cart));

    res.status(200).json({ message: 'Item removed from cart', cart });
});

// Update item quantity
router.post('/update', (req, res) => {
    const { id, quantity } = req.body;

    // Get cart from localStorage (simulated with memory here)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        // Update item quantity if exists
        cart[itemIndex].quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        res.status(200).json({ message: 'Item quantity updated', cart });
    } else {
        res.status(404).json({ message: 'Item not found in cart' });
    }
});

// Get cart contents
router.get('/', (req, res) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    res.status(200).json({ cart });
});

// Clear the entire cart
router.post('/clear', (req, res) => {
    // Clear cart from localStorage (simulated with memory here)
    localStorage.removeItem("cart");
    res.status(200).json({ message: 'Cart cleared' });
});

module.exports = router;
