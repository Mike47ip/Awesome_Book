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
        <div>
        <strong>${book.title}</strong> By: ${book.author}
        </div>
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

// Displaying the navitems individually

const mainLink = document.getElementById('Main-Link');
const addLink = document.getElementById('Add-Page-Link');
const contactLink = document.getElementById('Contact_Link');

const awesomeBooks = document.querySelector('.books-content-top');
const contactPage = document.querySelector('.contact-container');
const formPage = document.querySelector('.form-container');

mainLink.addEventListener('click', () => {
  mainLink.classList.toggle('clicked');
  contactLink.classList.remove('clicked3');
  addLink.classList.remove('clicked2');
  formPage.classList.add('less');
  formPage.classList.remove('remove');

  contactPage.classList.remove('add');
  awesomeBooks.classList.add('more');
});

addLink.addEventListener('click', () => {
  addLink.classList.toggle('clicked2');
  mainLink.classList.remove('clicked');
  contactLink.classList.remove('clicked3');
  awesomeBooks.classList.remove('more');
  contactPage.classList.remove('add');
  formPage.classList.remove('less', 'remove');
});

contactLink.addEventListener('click', () => {
  addLink.classList.remove('clicked2');
  contactLink.classList.toggle('clicked3');
  mainLink.classList.remove('clicked');
  awesomeBooks.classList.remove('more');
  contactPage.classList.add('add');
  formPage.classList.add('remove');
});

const dateTime = document.querySelector('.date-time');
dateTime.innerHTML = new Date().toString().slice(0, 34);