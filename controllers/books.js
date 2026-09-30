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

export const addBook = async (req, res) => {
  const title = req.body.title;
  const author_id = req.body.author_id;
  const published_year = req.body.published_year;
  const rating = req.body.rating;
  const finished = req.body.finished;

  try {
    if (
      !req.body ||
      !title ||
      !author_id ||
      !published_year ||
      !rating ||
      finished === undefined
    ) {
      return res
        .status(400)
        .json({ error: "Title, author, rating finished are required" });
    }

    const result = await pool.query(
      "INSERT INTO books (title, author_id, published_year, rating, finished) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, author_id, published_year, rating, finished],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const editBook = async (req, res) => {
  const id = Number(req.params.id);
  const title = req.body.title;
  const author_id = req.body.author_id;
  const published_year = req.body.published_year;
  const rating = req.body.rating;
  const finished = req.body.finished;

  try {
    const result = await pool.query(
      "UPDATE books SET title = $1, author_id = $2, published_year = $3, rating = $4, finished = $5 WHERE id = $6 RETURNING *",
      [title, author_id, published_year, rating, finished, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBook = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query("DELETE FROM books WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
