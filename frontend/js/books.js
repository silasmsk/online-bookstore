let books = [];

const bookContainer = document.getElementById("bookContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

async function loadBooks() {
    try {
        const response = await fetch("http://localhost:8080/api/books");

        if (!response.ok) {
            throw new Error("Failed to load books.");
        }

        books = await response.json();

        displayBooks(books);
    } catch (error) {
        console.error(error);
        bookContainer.innerHTML = "<p>Books could not be loaded.</p>";
    }
}

function displayBooks(bookList) {
    bookContainer.innerHTML = "";

    if (bookList.length === 0) {
        bookContainer.innerHTML = "<p>No books found.</p>";
        return;
    }

    bookList.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
            <img src="${book.imageUrl}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.category}</p>
            <strong>€${book.price.toFixed(2)}</strong>
            <br>
            <a href="book-details.html?id=${book.id}" class="btn">
                View Details
            </a>
        `;

        bookContainer.appendChild(bookCard);
    });
}

function filterBooks() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredBooks = books.filter(book => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchText) ||
            book.author.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "" ||
            book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayBooks(filteredBooks);
}

searchInput.addEventListener("input", filterBooks);
categoryFilter.addEventListener("change", filterBooks);

loadBooks();