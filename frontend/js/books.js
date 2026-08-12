let books = [];

const bookContainer = document.getElementById("bookContainer");
const searchInput = document.getElementById("searchInput");
const categoryChips = document.querySelectorAll(".category-chip");

const params = new URLSearchParams(window.location.search);
const categoryFromUrl = params.get("category");

let selectedCategory = categoryFromUrl || "";

function setActiveCategory(category) {
    categoryChips.forEach(chip => {
        chip.classList.toggle(
            "active",
            chip.dataset.category === category
        );
    });
}

if (categoryFromUrl) {
    setActiveCategory(categoryFromUrl);
}

async function loadBooks() {
    bookContainer.innerHTML = "<p>Loading books...</p>";

    try {
        const response = await fetch(
            "https://catalog-service-uszt.onrender.com/api/books"
        );

        if (!response.ok) {
            throw new Error("Failed to load books.");
        }

        books = await response.json();
        filterBooks();

    } catch (error) {
        console.error(error);
        bookContainer.innerHTML =
            "<p>Books could not be loaded. Please try again.</p>";
    }
}

function displayBooks(bookList) {
    bookContainer.innerHTML = "";

    if (bookList.length === 0) {
        bookContainer.innerHTML =
            "<p class='no-books'>No books found.</p>";
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

            <strong>
                €${book.price.toFixed(2)}
            </strong>

            <a
                href="book-details.html?id=${book.id}"
                class="btn"
            >
                View Details
            </a>
        `;

        bookContainer.appendChild(bookCard);
    });
}

function filterBooks() {
    const searchText =
        searchInput.value.trim().toLowerCase();

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

categoryChips.forEach(chip => {
    chip.addEventListener("click", () => {
        selectedCategory = chip.dataset.category;

        setActiveCategory(selectedCategory);

        filterBooks();
    });
});

loadBooks();