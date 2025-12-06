const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/books.json");

const readBooks = () => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};
const saveBooks = (book) => {
  fs.writeFileSync(filePath, JSON.stringify(book, null, 2));
};

exports.getBooks = (req, res) => {
  const books = readBooks();
  res.json(books);
};
exports.createBook = (req, res) => {
  const books = readBooks();
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    res.status(400).json({ message: "All Fields are required" });
  }

  const newBook = {
    id: Date.now(),
    title,
    author,
    year,
  };

  books.push(newBook);
  saveBooks(books);

  res.status(201).json({ message: "booked added" });
};
