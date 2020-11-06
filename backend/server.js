const express = require("express");
const dotenv = require("dotenv");
const products = require("./data/products.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

app.get("/", (req, res) => {
  res.send("API is runing...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/product/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(PORT, console.log(`Server is running in ${NODE_ENV} mode at: http://localhost:${PORT}/`));
