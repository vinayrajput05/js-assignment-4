const searchInput = document.getElementById("searchInput");
const booksContainer = document.getElementById("booksContainer");
const listBtn = document.getElementById("list");
const gridBtn = document.getElementById("grid");
const sortBtn = document.getElementById("sort");

let pageNo = 1;
let isLoading = false;
let scrollHeight = booksContainer.scrollHeight;
let books = [];

listBtn.addEventListener("click", function () {
    gridBtn.classList.remove('bg-gray-700');
    this.classList.add('bg-gray-700');
    booksContainer.classList.remove("md:grid-cols-3");
    booksContainer.classList.add("md:grid-cols-1");
});
gridBtn.addEventListener("click", function () {
    listBtn.classList.remove('bg-gray-700');
    this.classList.add('bg-gray-700');
    booksContainer.classList.remove("md:grid-cols-1");
    booksContainer.classList.add("md:grid-cols-3");
});

// Fist sort by title a -> z, then by published date newest to oldest
sortBtn.addEventListener("click", function () {
    const sortedBook = [...books];
    if (!this.classList.contains("bg-gray-700")) {
        sortedBook
            .sort((a, b) => a.volumeInfo.title > b.volumeInfo.title ? 1 : -1)
            .sort((a, b) => new Date(b.volumeInfo.publishedDate) > new Date(a.volumeInfo.publishedDate) ? 1 : -1)
    }
    renderBooks(sortedBook);
    this.classList.toggle('bg-gray-700');
});

searchInput.addEventListener('input', function () {
    const filteredBooks = books.filter(book => {
        const search = this.value.toLowerCase();
        const title = book.volumeInfo.title.toLowerCase();
        const author = book.volumeInfo.authors.join(" ").toLowerCase();
        return title.includes(search) || author.includes(search);
    })
    renderBooks(filteredBooks);
    if (this.value === "") {
        renderBooks(books);
    };
})

window.addEventListener("scroll", () => {
    const isPageBottom = window.scrollY + window.innerHeight >= scrollHeight;
    if (isPageBottom) {
        debounce(getBooks, 1000)();
    }
});

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function bookCard(book) {
    const info = book.volumeInfo
    return (`
                <a href="${info?.infoLink}" target="_blank" class="flex items-end w-full cursor-pointer transform hover:scale-105 transition">
                    <img class="w-28 h-40 rounded-lg shadow-md"
                        src="${info?.imageLinks?.thumbnail}" alt="">
                    <div class="bg-white/16 backdrop-blur-sm p-4 w-full flex flex-col justify-end h-34 rounded-tr-xl rounded-br-xl shadow-lg">
                        <p class="text-xl font-semibold line-clamp-2">${info?.title}</p>
                        <p class="text-gray-300 text-sm line-clamp-1">${info?.authors.join(", ")}</p>
                        <div class="text-gray-400 text-xs flex justify-between gap-4 mt-3">
                            <span>${info?.publisher}</span>
                            <span>${info?.publishedDate}</span>
                        </div>
                    </div>
                </a>
                `);
}

function renderBooks(data) {
    booksContainer.innerHTML = "";
    data.forEach(book => {
        booksContainer.innerHTML += bookCard(book)
    })
    scrollHeight = booksContainer.scrollHeight;
    isLoading = false;
}

function getBooks() {
    if (isLoading) return;
    isLoading = true;

    fetch(`https://api.freeapi.app/api/v1/public/books?page=${pageNo}&limit=20`)
        .then(res => res.json())
        .then(res => {
            books = pageNo === 1 ? res.data.data : [...books, ...res.data.data];
            renderBooks(books)
            if (res.data.nextPage) pageNo++;
        })
        .catch(err => {
            console.log(err);
            isLoading = false;
        });
}
getBooks();