const myLibrary = [];

const bookForm = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");

// Put the code that runs when the page starts in one place
function setup() {
  populateStorage();
  render();

  bookForm.addEventListener("submit", handleSubmit);
}

window.addEventListener("load", setup);

function populateStorage() {
  if (myLibrary.length === 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);

    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );

    myLibrary.push(book1);
    myLibrary.push(book2);
  }
}

// Add a new book when the form is submitted
function handleSubmit(event) {
  // Stop the page from refreshing when the form is submitted
  event.preventDefault();

  // Remove spaces before checking the title and author
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  // Check that title and author are not empty
  if (title === "" || author === "") {
    alert("Please enter a title and author.");
    return;
  }

  // Browser validation checks the required fields and page number
  if (!bookForm.checkValidity()) {
    bookForm.reportValidity();
    return;
  }

  const book = new Book(
    title,
    author,
    Number(pagesInput.value),
    checkInput.checked
  );

  myLibrary.push(book);

  render();

  // Clear the form after adding the book
  bookForm.reset();
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const tableBody = document.querySelector("#display tbody");

  // Delete the old rows before rendering the updated list
  tableBody.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const row = tableBody.insertRow();

    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);

    // Add the book information to the table
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    // Add a button for changing the read status
    const changeButton = document.createElement("button");

    changeButton.className = "btn btn-success";
    changeButton.textContent = myLibrary[i].check ? "Yes" : "No";

    wasReadCell.appendChild(changeButton);

    changeButton.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    // Add a delete button to the row
    const deleteButton = document.createElement("button");

    deleteButton.className = "btn btn-warning";
    deleteButton.textContent = "Delete";

    deleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", function () {
      const deletedTitle = myLibrary[i].title;

      myLibrary.splice(i, 1);

      render();

      // Show the message after the book has been removed
      alert(`You've deleted title: ${deletedTitle}`);
    });
  }
}
