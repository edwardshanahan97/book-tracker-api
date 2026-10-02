# Book Tracker API

A REST API for managing books, authors, and genres, built with Node.js, Express, and PostgreSQL.

This project was built to practice backend development with a relational database, including CRUD operations, SQL relationships, transactions, validation, and database connection management.

## Features

- Create, read, update, and delete books
- Store authors separately from books
- Automatically find or create authors
- Assign multiple genres to a book
- Automatically find or create genres
- Many-to-many relationship between books and genres
- PostgreSQL transactions for multi-step database operations
- Parameterized SQL queries
- Request validation
- Book ID validation
- Duplicate genre handling
- Consistent API error responses

## Tech Stack

- Node.js
- Express
- PostgreSQL
- node-postgres (`pg`)

## Database Structure

The database contains four tables:

```text
authors
   │
   │ one-to-many
   ▼
books
   │
   │ many-to-many
   ▼
book_genres
   │
   ▼
genres
```

### Authors

```text
id
name
```

### Books

```text
id
title
published_year
rating
finished
author_id
```

`author_id` references `authors.id`.

### Genres

```text
id
name
```

### Book Genres

```text
book_id
genre_id
```

`book_genres` is a junction table connecting books and genres.

## API Endpoints

### Get all books

```http
GET /api/books
```

Example response:

```json
[
  {
    "id": 1,
    "title": "The Hobbit",
    "published_year": 1937,
    "rating": 5,
    "finished": true,
    "author": "J.R.R. Tolkien",
    "genres": ["Fantasy", "Adventure"]
  }
]
```

### Get a book by ID

```http
GET /api/books/:id
```

Example:

```http
GET /api/books/1
```

Returns `404` if the book does not exist.

Invalid IDs return `400`.

### Create a book

```http
POST /api/books
```

Example request body:

```json
{
  "title": "Dune",
  "author": "Frank Herbert",
  "published_year": 1965,
  "rating": 5,
  "finished": true,
  "genres": ["Science Fiction", "Adventure"]
}
```

If the author or genres do not already exist, they are created automatically.

Duplicate genres in the request are removed before the relationships are created.

### Update a book

```http
PUT /api/books/:id
```

Example request body:

```json
{
  "title": "Dune",
  "author": "Frank Herbert",
  "published_year": 1965,
  "rating": 5,
  "finished": true,
  "genres": ["Science Fiction"]
}
```

Updating a book replaces its existing genre relationships with the genres supplied in the request.

An empty genre array is valid:

```json
{
  "genres": []
}
```

The complete book object must still include all other required fields.

### Delete a book

```http
DELETE /api/books/:id
```

The book's genre relationships are removed before the book is deleted.

Successful deletion returns:

```text
204 No Content
```

## Validation

Book requests require:

- `title` — non-empty string
- `author` — non-empty string
- `published_year` — integer
- `rating` — integer from 1 to 5
- `finished` — boolean
- `genres` — array containing only non-empty strings

Book IDs must be positive integers.

Invalid request data returns:

```text
400 Bad Request
```

A valid request for a book that does not exist returns:

```text
404 Not Found
```

Unexpected server or database errors return:

```text
500 Internal Server Error
```

## Transactions

Creating, updating, and deleting books can require multiple related database operations.

Transactions are used so that these operations either complete together or are rolled back together.

For example, creating a book can involve:

1. Finding or creating the author
2. Creating the book
3. Finding or creating each genre
4. Creating the book-to-genre relationships

If one of these operations fails, the transaction is rolled back rather than leaving partially completed data in the database.

## Project Structure

```text
book-tracker-api/
├── controllers/
├── database/
│   ├── db.js
│   ├── schema.sql
│   └── seed.sql
├── routes/
├── utils/
│   ├── databaseHelpers.js
│   └── validation.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Create the PostgreSQL database

```bash
createdb book_tracker
```

### 3. Create the database tables

```bash
psql book_tracker -f database/schema.sql
```

### 4. Add the development seed data

```bash
psql book_tracker -f database/seed.sql
```

### 5. Configure environment variables

Create a `.env` file based on `.env.example`.

Example:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=book_tracker
```

Depending on your PostgreSQL configuration, additional database credentials may be required.

### 6. Start the server

```bash
npm start
```

The API is available under:

```text
/api/books
```

## What I Learned

This project covers:

- Connecting Node.js to PostgreSQL with `pg`
- PostgreSQL connection pooling
- SQL CRUD operations
- Parameterized queries
- Primary and foreign keys
- One-to-many relationships
- Many-to-many relationships
- SQL joins and left joins
- Junction tables
- PostgreSQL transactions
- Relational writes
- Request validation
- HTTP status codes
- Express controllers and routers
- Refactoring repeated database logic into helper functions
