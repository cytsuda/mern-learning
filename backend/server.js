const express = require("express");
const products = require("./data/products.js");

const app = express();

app.get("/", (req, res) => {
  res.send("API is runing...");
});

app.get("/API/products", (req, res) => {
  res.json(products);
});

app.get("/API/product/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(5000, console.log("Server is running at: http://localhost:5000/"));
