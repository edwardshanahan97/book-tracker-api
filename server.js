import express from "express";

const books = [
  {
    id: 1,
    title: "The hobbit",
    author: "J.R.R Tolkien",
    rating: "5",
    genres: ["Adventure"],
  },
];

const app = express();

app.get("/", (req, res) => {
  res.send("Book tracker api");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(3000, () => console.log("Server is running"));
