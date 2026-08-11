const ordersContainer = document.getElementById("ordersContainer");

async function loadOrders() {
    try {
        const response = await fetch("http://localhost:8081/api/orders");

        if (!response.ok) {
            throw new Error("Orders could not be loaded.");
        }

        const orders = await response.json();

        displayOrders(orders);

    } catch (error) {
        console.error(error);
        ordersContainer.innerHTML = "<p>Orders could not be loaded.</p>";
    }
}

function displayOrders(orders) {
    ordersContainer.innerHTML = "";

    if (orders.length === 0) {
        ordersContainer.innerHTML = "<p>No orders found.</p>";
        return;
    }

    orders.forEach(order => {
        const orderCard = document.createElement("div");
        orderCard.classList.add("order-card");

        orderCard.innerHTML = `
            <h3>Order #${order.id}</h3>

            <p>
                <strong>Date:</strong>
                ${order.orderDate}
            </p>

            <p>
                <strong>Status:</strong>
                ${order.status}
            </p>

            <p>
                <strong>Items:</strong>
                ${order.items}
            </p>

            <p>
                <strong>Total:</strong>
                €${order.totalPrice.toFixed(2)}
            </p>
        `;

        ordersContainer.appendChild(orderCard);
    });
}

loadOrders();