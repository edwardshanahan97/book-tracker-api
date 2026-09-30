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
import pool from "../database/db.js";

export const getBooks = async (req, res) => {
  try {
    const result = await pool.query("Select * FROM books");

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBookById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

let nextId = 7;

export const addBook = (req, res) => {
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
};

export const editBook = (req, res) => {
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
};

export const deleteBook = (req, res) => {
  const id = Number(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex < 0) {
    return res.status(404).json({ error: "Book not found" });
  }

  books.splice(bookIndex, 1);

  res.status(204).end();
};
