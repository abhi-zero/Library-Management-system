// Input values

// Display section
const displayBooksSection = document.querySelector(".jsViewBooks");
displayBooksSection.innerHTML = "";
const displayMsg = document.querySelector(".jsMsg");
displayMsg.innerHTML = "";

// Buttons
const btnAdd = document.querySelector(".jsAdd");
const btnUpdateBook = document.querySelector(".jsUpdate");
const btnDeleteBook = document.querySelector(".jsDelete");

// Empty array created
let library = [];

// Create book object with the help of class
class Book {
  constructor(bookTitle, authorName, year, bookId) {
    this.title = bookTitle;
    this.author = authorName;
    this.year = year;
    this.id = bookId;
  }
}

library = JSON.parse(localStorage.getItem("library")) || [];
viewAllBooks();

function clearInputFields() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#year").value = "";
  document.querySelector("#bookId").value = "";
}

// Adding a book object to array
function addBook() {
  const titleValue = document.querySelector("#title").value;
  const authorValue = document.querySelector("#author").value;
  const yearValue = document.querySelector("#year").value;
  const bookId = library.length + 1;

  if (!titleValue || !authorValue || !yearValue) {
    alert("Please fill in all fields");
    return;
  }

  if (isNaN(yearValue)) {
    alert("Please enter a valid year.");
    return;
  }

  console.log(titleValue, authorValue, yearValue, bookId);

  const book = new Book(titleValue, authorValue, yearValue, bookId);


  // Push the book object to the library array
  library.push(book);

  // Display book after adding

  viewAllBooks();
  simulateSaving()
    .then((msg) => {
      displayMsg.innerHTML= msg;
    })
    .catch((error) => {
      displayMsg.innerHTML= error;
    })
    clearInputFields();
}

// Display all books
function viewAllBooks() {
  if (library.length === 0) {
    displayBooksSection.innerHTML = `<p>No books available</p>`;
  } else {
    displayBooksSection.innerHTML = "";
    library.forEach((val) => {
      const displayBook = `<article>
           <h2>${val.title}</h2>
           <p>Author: ${val.author}</p>
           <p>Year: ${val.year}</p>
       </article>`;
       displayBooksSection.innerHTML += displayBook;
    });
    
  }
}



// Update book
function updateBook() {
  const titleValue = document.querySelector("#title").value;
  const authorValue = document.querySelector("#author").value;
  const yearValue = document.querySelector("#year").value;
  const idvalue = parseInt(document.querySelector("#bookId").value);

  if (!idvalue || isNaN(idvalue)) {
    alert("Please enter a valid book ID.");
    return;
  }

  const bookToUpdate = library.find((book) => book.id === idvalue);

  if (bookToUpdate) {
    bookToUpdate.title = titleValue;
    bookToUpdate.author = authorValue;
    bookToUpdate.year = yearValue;

    viewAllBooks();
    simulateSaving()
    .then((msg) => {
      alert(msg);
    })
    .catch((error) => {
      alert(error);
    })
  } else {
    alert("Book with this ID doesn't exist");
  }
  clearInputFields();
}

function deleteBook() {
  const idvalue = parseInt(document.querySelector("#bookId").value );

  if (!idvalue || isNaN(idvalue)) {
    alert("Please enter a valid book ID.");
    return;
  }

  const bookToDelete = library.findIndex((book) => book.id === idvalue);

  

  if (bookToDelete !== -1) {
    library.splice(bookToDelete, 1);
    viewAllBooks();
    simulateSaving()
    .then((msg) => {
      displayMsg.innerHTML= msg;
    })
    .catch((error) => {
      displayMsg.innerHTML= error;
    })
  } else {
    alert("Book with this ID doesn't exist");
  }
  clearInputFields();
}

// Save to storage
function saveLibrary() {
  localStorage.setItem("library", JSON.stringify(library));
}

//  save data automaticalt
function simulateSaving() {
  return new Promise((resolve, reject) => {
    const response = Math.random() > 0.3;
    setTimeout(() => {
      if (response){
        resolve("Data saved successfully");
        saveLibrary();
      }
      else{
        reject("Data is not saved");
      }
    }, 1000);
  })
}



// Add button functionality
btnAdd.addEventListener("click", addBook);

// Update button functionality
btnUpdateBook.addEventListener("click", updateBook);

// Delete button functionality
btnDeleteBook.addEventListener("click", deleteBook);
