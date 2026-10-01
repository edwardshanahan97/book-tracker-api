import pool from "../database/db.js";

export const getBooks = async (req, res) => {
  try {
    const result = await pool.query(`
  SELECT
    books.id,
    books.title,
    books.published_year,
    books.rating,
    books.finished,
    authors.name AS author,
    genres.name AS genre
  FROM books
  JOIN authors ON authors.id = books.author_id
  LEFT JOIN book_genres ON books.id = book_genres.book_id
  LEFT JOIN genres ON book_genres.genre_id = genres.id
  ORDER BY books.id
`);

    const books = result.rows.reduce((acc, row) => {
      if (!acc[row.id]) {
        acc[row.id] = {
          id: row.id,
          title: row.title,
          published_year: row.published_year,
          rating: row.rating,
          finished: row.finished,
          author: row.author,
          genres: [],
        };
      }

      if (row.genre) {
        acc[row.id].genres.push(row.genre);
      }

      return acc;
    }, {});

    res.json(Object.values(books));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBookById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(
      `
  SELECT
    books.id,
    books.title,
    books.published_year,
    books.rating,
    books.finished,
    authors.name AS author,
    genres.name AS genre
  FROM books
  JOIN authors ON authors.id = books.author_id
  JOIN book_genres ON books.id = book_genres.book_id
  JOIN genres ON book_genres.genre_id = genres.id
  WHERE books.id = $1
`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    const firstRow = result.rows[0];

    const book = {
      id: firstRow.id,
      title: firstRow.title,
      published_year: firstRow.published_year,
      rating: firstRow.rating,
      finished: firstRow.finished,
      author: firstRow.author,
      genres: result.rows.map((row) => row.genre),
    };

    res.json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addBook = async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const published_year = req.body.published_year;
  const rating = req.body.rating;
  const finished = req.body.finished;
  const genres = req.body.genres;

  try {
    if (
      !req.body ||
      !title ||
      !author ||
      !published_year ||
      !rating ||
      finished === undefined ||
      !Array.isArray(genres)
    ) {
      return res.status(400).json({
        error:
          "Title, author, published year, rating and finished are required",
      });
    }

    const authorResult = await pool.query(
      "SELECT id FROM authors WHERE name = $1",
      [author],
    );

    let author_id;

    if (authorResult.rows.length > 0) {
      author_id = authorResult.rows[0].id;
    } else {
      const newAuthorResult = await pool.query(
        "INSERT INTO authors (name) VALUES ($1) RETURNING id",
        [author],
      );

      author_id = newAuthorResult.rows[0].id;
    }

    const result = await pool.query(
      "INSERT INTO books (title, author_id, published_year, rating, finished) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [title, author_id, published_year, rating, finished],
    );

    const book_id = result.rows[0].id;

    for (const genre of genres) {
      const genreResult = await pool.query(
        "SELECT id FROM genres WHERE name = $1",
        [genre],
      );

      let genre_id;

      if (genreResult.rows.length > 0) {
        genre_id = genreResult.rows[0].id;
      } else {
        const newGenreResult = await pool.query(
          "INSERT INTO genres (name) VALUES ($1) RETURNING id",
          [genre],
        );

        genre_id = newGenreResult.rows[0].id;
      }

      await pool.query(
        "INSERT INTO book_genres (book_id, genre_id) VALUES ($1, $2)",
        [book_id, genre_id],
      );
    }

    res.status(201).json({
      id: book_id,
      title,
      published_year,
      rating,
      finished,
      author,
      genres,
    });
  } catch (error) {
    console.error(error);
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
