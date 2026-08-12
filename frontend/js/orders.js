const ordersContainer = document.getElementById("ordersContainer");

async function loadOrders() {
    ordersContainer.innerHTML = `
        <div class="orders-loading">
            Loading orders...
        </div>
    `;

    try {
        const response = await fetch(
            "https://order-service-0co6.onrender.com/api/orders"
        );

        if (!response.ok) {
            throw new Error("Orders could not be loaded.");
        }

        const orders = await response.json();

        displayOrders(orders);

    } catch (error) {
        console.error(error);

        ordersContainer.innerHTML = `
            <div class="orders-empty">
                <h3>Orders could not be loaded.</h3>
                <p>Please try again in a moment.</p>
            </div>
        `;
    }
}

function displayOrders(orders) {
    ordersContainer.innerHTML = "";

    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="orders-empty">
                <h3>No orders yet.</h3>
                <p>Your completed orders will appear here.</p>
                <a href="books.html" class="btn">Browse Books</a>
            </div>
        `;
        return;
    }

    [...orders].reverse().forEach(order => {
        const orderCard = document.createElement("div");
        orderCard.classList.add("order-card");

        orderCard.innerHTML = `
            <div class="order-card-header">

                <div>
                    <h3>Order #${order.id}</h3>
                    <p class="order-date">${order.orderDate}</p>
                </div>

                <span class="order-status">
                    ${order.status}
                </span>

            </div>

            <div class="order-items">
                <span class="order-label">Items</span>
                <p>${order.items}</p>
            </div>

            <div class="order-card-footer">
                <span>Total</span>

                <strong>
                    €${order.totalPrice.toFixed(2)}
                </strong>
            </div>
        `;

        ordersContainer.appendChild(orderCard);
    });
}

loadOrders();