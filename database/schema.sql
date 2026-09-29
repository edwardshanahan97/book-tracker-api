-- CREATE TABLE books (
--     id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     title TEXT NOT NULL,
--     author TEXT NOT NULL,
--     published_year INTEGER,
--     rating INTEGER,
--     finished BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE authors (
--     id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     name TEXT UNIQUE NOT NULL
-- )

-- ALTER TABLE books ADD COLUMN author_id INTEGER REFERENCES authors(id);

-- CREATE TABLE genres (
--     id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     name TEXT UNIQUE NOT NULL
-- );

CREATE TABLE book_genres (
    book_id INTEGER  REFERENCES books(id),
    genre_id INTEGER REFERENCES genres(id),
    PRIMARY KEY (book_id, genre_id)
);