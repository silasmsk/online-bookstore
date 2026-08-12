const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

const bookDetails = document.getElementById("bookDetails");

async function loadBookDetails() {
    try {
        const response = await fetch(`https://catalog-service-uszt.onrender.com/api/books/${bookId}`);

        if (!response.ok) {
            throw new Error("Book not found.");
        }

        const selectedBook = await response.json();

        bookDetails.innerHTML = `
            <div class="book-detail-card">
                <img src="${selectedBook.imageUrl}" alt="${selectedBook.title}">

                <div class="book-detail-info">
                    <h2>${selectedBook.title}</h2>
                    <p><strong>Author:</strong> ${selectedBook.author}</p>
                    <p><strong>Category:</strong> ${selectedBook.category}</p>
                    <p><strong>Price:</strong> €${selectedBook.price.toFixed(2)}</p>
                    <p><strong>Stock:</strong> ${selectedBook.stock}</p>
                    <p>${selectedBook.description}</p>

                    <button id="addToCartButton" class="btn">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;

        const addToCartButton =
            document.getElementById("addToCartButton");

        addToCartButton.addEventListener("click", () => {
            const cart =
                JSON.parse(localStorage.getItem("cart")) || [];

            const existingBook =
                cart.find(item => item.id === selectedBook.id);

            if (existingBook) {
                existingBook.quantity += 1;
            } else {
                cart.push({
                    id: selectedBook.id,
                    title: selectedBook.title,
                    author: selectedBook.author,
                    price: selectedBook.price,
                    image: selectedBook.imageUrl,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Book added to cart.");
        });

    } catch (error) {
        console.error(error);
        bookDetails.innerHTML = "<p>Book could not be loaded.</p>";
    }
}

loadBookDetails();