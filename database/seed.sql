-- Authors
INSERT INTO authors (name)
VALUES
    ('George Orwell'),
    ('J.R.R. Tolkien'),
    ('Andy Weir'),
    ('William Gibson'),
    ('Matt Haig'),
    ('Frank Herbert');


-- Books
INSERT INTO books (
    title,
    published_year,
    rating,
    finished,
    author_id
)
VALUES
    ('The Hobbit', 1937, 5, true, 2),
    ('1984', 1949, 5, true, 1),
    ('The Martian', 2011, 5, true, 3),
    ('Project Hail Mary', 2021, 5, true, 3),
    ('Neuromancer', 1984, 3, true, 4),
    ('The Midnight Library', 2020, 3, false, 5),
    ('Dune', 1965, 4, true, 6);


-- Genres
INSERT INTO genres (name)
VALUES
    ('Science Fiction'),
    ('Fantasy'),
    ('Adventure');

INSERT INTO book_genres (book_id, genre_id)
VALUES
    (1, 2), 
    (1, 3),

    (2, 1), 

    (3, 1), 
    (3, 3), 

    (4, 1), 

    (5, 1), 

    (7, 1), 
    (7, 3); 