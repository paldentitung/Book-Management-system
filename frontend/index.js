let bookData = null;
const bookTableTbody = document.querySelector(".book-table-tbody");
let bookTableHtml = "";

async function getBooks() {
  try {
    let res = await fetch("http://localhost:5000/api/books");
    let data = await res.json();
    bookData = data;
    console.log(data);
    renderBooks();
  } catch (error) {
    alert(error);
  }
}

function renderBooks() {
  bookData.forEach((book) => {
    bookTableHtml += `
                 <tr>
                  <td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.year}</td>
                  <td class="actions-btns">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                  </td>
                </tr>
    
    `;
  });
  bookTableTbody.innerHTML = bookTableHtml;
}

const form = document.querySelector(".form");
const bookAuthor = document.getElementById("book-author");
const bookTitle = document.getElementById("book-title");
const bookYear = document.getElementById("year");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newBook = {
    title: bookTitle.value,
    author: bookAuthor.value,
    year: bookYear.value,
  };

  if (!newBook.title || !newBook.author || !newBook.year) {
    alert("enter valid info");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/books", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newBook),
    });
    if (!res.ok) {
      alert("Error adding book");
      return;
    }
    // Clear form fields
    bookTitle.value = "";
    bookAuthor.value = "";
    bookYear.value = "";

    // Refresh table
    getBooks();
  } catch (error) {
    alert(error);
  }
});

getBooks();
