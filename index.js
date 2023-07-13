class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('bookCollection')) || [];
  }

  displayBooks() {
    const bookListDiv = document.getElementById('bookList');
    bookListDiv.innerHTML = '';

    this.books.forEach((book, index) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book-details');
      bookDiv.innerHTML = `
        <strong>${book.title}</strong> By: ${book.author}
      `;

      const removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-btn');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => this.removeBook(index));

      bookDiv.appendChild(removeBtn);
      bookListDiv.appendChild(bookDiv);
    });
  }

  addBook(event) {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');

    const title = titleInput.value;
    const author = authorInput.value;

    if (title && author) {
      const newBook = {
        title,
        author,
      };

      this.books.push(newBook);

      localStorage.setItem('bookCollection', JSON.stringify(this.books));

      titleInput.value = '';
      authorInput.value = '';

      this.displayBooks();
    }
  }

  removeBook(index) {
    this.books.splice(index, 1);

    localStorage.setItem('bookCollection', JSON.stringify(this.books));

    this.displayBooks();
  }
}

const bookCollection = new BookCollection();

const addBookForm = document.getElementById('addBookForm');
addBookForm.addEventListener('submit', (event) => bookCollection.addBook(event));

bookCollection.displayBooks();
