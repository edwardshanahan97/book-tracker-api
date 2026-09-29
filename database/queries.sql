-- SELECT * FROM authors;
-- SELECT * FROM books;

-- SELECT books.title, authors.name
-- FROM books
-- JOIN authors ON books.author_id = authors.id;

-- SELECT books.title, authors.name, books.published_year, rating
-- FROM books
-- JOIN authors ON books.author_id = authors.id;

-- SELECT authors.name, books.title, rating
-- FROM books
-- JOIN authors ON books.author_id = authors.id WHERE authors.name = 'Andy Weir' ORDER BY rating DESC;

-- SELECT * FROM genres;

-- SELECT * FROM book_genres;

-- SELECT books.title, genres.name 
-- FROM books
-- JOIN book_genres ON books.id = book_genres.book_id
-- JOIN genres ON book_genres.genre_id = genres.id;

SELECT books.title 
FROM books
JOIN book_genres ON books.id = book_genres.book_id
JOIN genres ON book_genres.genre_id = genres.id
WHERE genres.name = 'Science Fiction';
