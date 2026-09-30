import express from "express";

import {
  addBook,
  deleteBook,
  editBook,
  getBookById,
  getBooks,
} from "../controllers/books.js";

const router = express.Router();

router.get("/", getBooks);

router.get("/:id", getBookById);

router.post("/", addBook);

router.put("/:id", editBook);

router.delete("/:id", deleteBook);

export default router;
