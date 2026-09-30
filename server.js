import express from "express";
import router from "./routes/routes.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method + " " + req.url);

  next();
});

app.use("/api/books", router);

app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(3000, () => console.log("Server is running"));
