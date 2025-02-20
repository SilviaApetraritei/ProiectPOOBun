async function loadBooks() {
    const response = await fetch('/books');
    const books = await response.json();
    
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = book;
        bookList.appendChild(li);
    });
}

async function addBook() {
    const bookInput = document.getElementById('bookTitle');
    const bookTitle = bookInput.value.trim();
    
    if (bookTitle) {
        await fetch('/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: bookTitle })
        });
        bookInput.value = '';
        loadBooks();
    }
}

window.onload = loadBooks;
