document.addEventListener("DOMContentLoaded", function () {
    loadCart(); // Load cart when page loads
    document.getElementById("clear-cart-btn").addEventListener("click", clearCart); // Add event listener for the clear cart button
});


function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = ''; // Clear any existing items
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerHTML = '';
        return;
    }

    // Loop through each item in the cart and display it
    cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <p><strong>${item.name}</strong></p>
                <p>Price: ₹${item.price}</p>
                <p>Old Price: ₹${item.oldPrice}</p>
            </div>
            <div class="cart-item-actions">
                <button class="decrease-btn" data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-btn" data-index="${index}">+</button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
        cartItems.appendChild(div);
        total += item.price * item.quantity; // Calculate total based on price * quantity
    });

    // Update the total price displayed
    cartTotal.innerHTML = `Total: ₹${total.toFixed(2)}`;

    // Event listeners for buttons to modify cart items
    document.querySelectorAll(".increase-btn").forEach(button => {
        button.addEventListener("click", function () {
            increaseQuantity(this.getAttribute("data-index"));
        });
    });

    document.querySelectorAll(".decrease-btn").forEach(button => {
        button.addEventListener("click", function () {
            decreaseQuantity(this.getAttribute("data-index"));
        });
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            removeFromCart(this.getAttribute("data-index"));
        });
    });
}

// Increase quantity of an item in the cart
function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Reload cart to show updated data
    updateCartCount(); // Update cart count
}

// Decrease quantity of an item in the cart
function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1); // Remove item if quantity becomes 0
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Reload cart to show updated data
    updateCartCount(); // Update cart count
}

// Remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item by index
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Reload cart to show updated data
    updateCartCount(); // Update cart count
}

// Clear all items in the cart
function clearCart() {
    localStorage.removeItem("cart"); // Remove cart from local storage
    document.getElementById("cart-items").innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById("cart-total").innerHTML = '';
    updateCartCount(); // Update cart count
}

// Update the total number of items in the cart
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0); // Sum up all item quantities
    let cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = totalCount; // Display total item count
    }
}

window.onload = loadCart; // Call loadCart on page load
