-- INSERT INTO books (title, author, published_year, rating, finished) 
-- VALUES ('1984', 'George Orwell', 1949, 5, TRUE),
-- ('The Hobbit', 'J.R.R. Tolkien', 1937, 5, TRUE),
-- ('The Martian', 'Andy Weir', 2011, 5, TRUE),
-- ('Project Hail Mary', 'Andy Weir', 2021, 5, TRUE),
-- ('Neuromancer', 'William Gibson', 1984, 3, TRUE),
-- ('The Midnight Library', 'Matt Haig', 2020, 3, FALSE),
-- ('Dune', 'Frank Herbert', 1965, 4, TRUE);

-- INSERT INTO author (name) 
-- VALUES ('George Orwell'),
--  ('J.R.R. Tolkien'), 
--  ('Andy Weir'), 
--  ('William Gibson'), 
--  ('Matt Haig'), 
--  ('Frank Herbert')

-- UPDATE books SET author_id = 4 WHERE title = 'Neuromancer';

-- INSERT INTO genres (name) 
-- VALUES ('Science Fiction'),
-- ('Fantasy'),
-- ('Adventure');

INSERT INTO book_genres (book_id, genre_id) values(3, 1);