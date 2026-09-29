import express from "express";

const books = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    rating: 5,
    finished: true,
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    rating: 4,
    finished: true,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    rating: 5,
    finished: true,
  },
  {
    id: 4,
    title: "The Martian",
    author: "Andy Weir",
    rating: 5,
    finished: true,
  },
  {
    id: 5,
    title: "Project Hail Mary",
    author: "Andy Weir",
    rating: 5,
    finished: true,
  },
  {
    id: 6,
    title: "Neuromancer",
    author: "William Gibson",
    rating: 3,
    finished: true,
  },
];

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Book tracker api");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

let nextId = 7;

app.post("/books/", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const rating = req.body.rating;
  const finished = req.body.finished;

  if (!req.body || !title || !author || !rating || finished === undefined) {
    return res
      .status(400)
      .json({ error: "Title, author, rating finished are required" });
  }

  const book = {
    id: nextId,
    title,
    author,
    rating,
    finished,
  };

  nextId++;
  books.push(book);
  res.status(201).json(book);
});

app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);
  const title = req.body.title;
  const author = req.body.author;
  const rating = req.body.rating;
  const finished = req.body.finished;

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  book.title = title;
  book.author = author;
  book.rating = rating;
  book.finished = finished;

  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex < 0) {
    return res.status(404).json({ error: "Book not found" });
  }

  books.splice(bookIndex, 1);

  res.status(204).end();
});

app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(3000, () => console.log("Server is running"));
