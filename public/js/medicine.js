document.addEventListener("DOMContentLoaded", function () {
    function initializeSlider(containerClass) {
        const sliders = document.querySelectorAll(`.${containerClass} .product-slider`);
        const prevButtons = document.querySelectorAll(`.${containerClass} .prev-slide`);
        const nextButtons = document.querySelectorAll(`.${containerClass} .next-slide`);

        if (sliders.length === 0 || prevButtons.length === 0 || nextButtons.length === 0) return;

        sliders.forEach((slider, index) => {
            const prev = prevButtons[index];
            const next = nextButtons[index];

            next.addEventListener("click", () => {
                slider.scrollBy({ left: 300, behavior: "smooth" });
            });

            prev.addEventListener("click", () => {
                slider.scrollBy({ left: -300, behavior: "smooth" });
            });
        });
    }

    // Initialize the sliders 4 times for both "products" and "products1"
    for (let i = 0; i < 4; i++) {
        initializeSlider("products");
        initializeSlider("products1");
    }

    // Image carousel slider
    let index = 0;
    function moveSlide(step) {
        const slides = document.querySelector('.slides');
        if (!slides) return;

        const totalSlides = slides.children.length;
        index = (index + step + totalSlides) % totalSlides;

        // Ensure the slider moves correctly
        slides.style.transform = `translateX(${-index * slides.clientWidth}px)`;
    }

    // Make moveSlide globally accessible
    window.moveSlide = moveSlide;
});


document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    
    document.querySelectorAll(".add-to-cart, .add-to-cart1").forEach(button => {
        button.addEventListener("click", (event) => {
            let product = event.target.closest(".product-card");
            let name = product.getAttribute("data-name");
            let price = parseFloat(product.getAttribute("data-price"));
            addToCart(name, price);
            showCartMessage();
        });
    });
});

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalCount;
}

function showCartMessage() {
    let message = document.createElement("div");
    message.textContent = "Added to cart successfully!";
    message.style.position = "fixed";
    message.style.bottom = "20px";
    message.style.right = "20px";
    message.style.background = "#28a745";
    message.style.color = "white";
    message.style.padding = "10px 20px";
    message.style.borderRadius = "5px";
    message.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}