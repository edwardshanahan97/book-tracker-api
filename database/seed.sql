-- INSERT INTO books (title, author, published_year) 
-- VALUES ('The Hobbit', 'J.R.R. Tolkien', 1937),
-- ('Dune', 'Frank Herbert', 1965);

-- UPDATE books SET finished = false, rating = 4 WHERE id = 2;

DELETE FROM books  WHERE id = 2 RETURNING *;