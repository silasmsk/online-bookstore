let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cartContainer");
const cartTotal = document.getElementById("cartTotal");
const cartSubtotal = document.getElementById("cartSubtotal");
const placeOrderButton = document.getElementById("placeOrderButton");

function displayCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty.</h3>
                <p>Browse our collection and find your next read.</p>
                <a href="books.html" class="btn">Browse Books</a>
            </div>
        `;

        cartTotal.textContent = "0.00";
        cartSubtotal.textContent = "0.00";
        placeOrderButton.disabled = true;
        return;
    }

    placeOrderButton.disabled = false;

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">

            <div class="cart-item-info">
                <h3>${item.title}</h3>

                <p class="cart-author">${item.author}</p>

                <p class="cart-price">
                    €${item.price.toFixed(2)}
                </p>

                <div class="cart-actions">
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${item.id})">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${item.id})">+</button>
                    </div>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>
                </div>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    cartSubtotal.textContent = total.toFixed(2);
    cartTotal.textContent = total.toFixed(2);
}

function increaseQuantity(id) {
    const item = cart.find(book => book.id === id);

    if (item) {
        item.quantity += 1;
    }

    saveCart();
}

function decreaseQuantity(id) {
    const item = cart.find(book => book.id === id);

    if (item && item.quantity > 1) {
        item.quantity -= 1;
    }

    saveCart();
}

function removeFromCart(id) {
    cart = cart.filter(book => book.id !== id);
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

displayCart();

placeOrderButton.addEventListener("click", async () => {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const itemsText = cart.map(item => {
        return `${item.title} x${item.quantity}`;
    }).join(", ");

    const newOrder = {
        items: itemsText,
        totalPrice: total,
        orderDate: new Date().toLocaleDateString(),
        status: "Pending"
    };

    try {
        placeOrderButton.disabled = true;
        placeOrderButton.textContent = "Processing...";

        // 1. Create the order in Order Service
        const response = await fetch(
            "https://order-service-0co6.onrender.com/api/orders",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newOrder)
            }
        );

        if (!response.ok) {
            throw new Error("Order could not be created.");
        }

        const createdOrder = await response.json();

        // 2. Call the Cloudflare serverless confirmation function
        const confirmationResponse = await fetch(
            "https://order-confirmation.zynpslsmsk.workers.dev/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderId: createdOrder.id,
                    totalPrice: createdOrder.totalPrice
                })
            }
        );

        if (!confirmationResponse.ok) {
            throw new Error("Order confirmation could not be created.");
        }

        const confirmation =
            await confirmationResponse.json();

        // 3. Clear the cart
        cart = [];

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        // 4. Show the message returned by the serverless function
        alert(confirmation.message);

        // 5. Go to order history
        window.location.href = "orders.html";

    } catch (error) {
        console.error(error);

        alert(
            "An error occurred while placing the order. Please try again."
        );

        placeOrderButton.disabled = false;
        placeOrderButton.textContent = "Place Order";
    }
});