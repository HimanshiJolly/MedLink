document.addEventListener("DOMContentLoaded", function () {
    loadCart(); // Load cart on page load
    document.getElementById("clear-cart-btn").addEventListener("click", clearCart); // Clear cart button
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerHTML = '';
        return;
    }


}


function clearCart() {
    localStorage.removeItem("cart");
    document.getElementById("cart-items").innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById("cart-total").innerHTML = '';
    updateCartCount();
}


