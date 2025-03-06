document.addEventListener("DOMContentLoaded", function () {
    loadCart();
    document.getElementById("clear-cart-btn").addEventListener("click", clearCart);
});

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerHTML = '';
        return;
    }

    cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <p><strong>${item.name}</strong> - ₹${item.price}</p>
            <button class="decrease-btn" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="increase-btn" data-index="${index}">+</button>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(div);
        total += item.price * item.quantity;
    });

    cartTotal.innerHTML = `Total: ₹${total.toFixed(2)}`;

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

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function clearCart() {
    localStorage.removeItem("cart");
    document.getElementById("cart-items").innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById("cart-total").innerHTML = '';
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    let cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = totalCount;
    }
}

window.onload = loadCart;