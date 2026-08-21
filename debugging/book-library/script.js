let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();
  render();
});

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

// Get the form and its input elements
const bookForm = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");

// Add a new book when the form is submitted
bookForm.addEventListener("submit", function (event) {
  // Stop the page from refreshing when the form is submitted
  event.preventDefault();

  // Browser validation checks the required fields and page number
  if (!bookForm.checkValidity()) {
    bookForm.reportValidity();
    return;
  }

  const book = new Book(
    titleInput.value.trim(),
    authorInput.value.trim(),
    Number(pagesInput.value),
    checkInput.checked
  );

  myLibrary.push(book);

  render();

  // Clear the form after adding the book
  bookForm.reset();
});

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
      setTimeout(function () {
        alert(`You've deleted title: ${deletedTitle}`);
      }, 3);
    });
  }
}
