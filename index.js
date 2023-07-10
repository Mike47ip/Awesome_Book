// Retrieve book collection from localStorage or create a new one
let bookCollection = JSON.parse(localStorage.getItem('bookCollection')) || [];

// Function to display all books in the collection
function displayBooks() {
  const bookListDiv = document.getElementById('bookList');
  bookListDiv.innerHTML = '';

  // Function to remove a book from the collection
  function removeBook(index) {
    bookCollection = bookCollection.filter((_, i) => i !== index);

    // Save the updated book collection to localStorage
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));

    displayBooks();
  }

  bookCollection.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.innerHTML = `<strong>${book.title}</strong> by ${book.author}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => removeBook(index));

    bookDiv.appendChild(removeBtn);
    bookListDiv.appendChild(bookDiv);
  });
}

// Function to add a new book to the collection
function addBook(event) {
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

    bookCollection.push(newBook);

    // Save the updated book collection to localStorage
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));

    // Reset input fields
    titleInput.value = '';
    authorInput.value = '';

    displayBooks();
  }
}

// Event listener for form submission
const addBookForm = document.getElementById('addBookForm');
addBookForm.addEventListener('submit', addBook);

// Display the books initially
displayBooks();
