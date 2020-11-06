import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// Routes
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

app.get("/", (req, res) => {
  res.send("API is runing...");
});
app.use("/api/products", productRoutes);

app.listen(
  PORT,
  console.log(
    `Server is running in ${NODE_ENV} mode at: http://localhost:${PORT}/`.yellow
      .bold
  )
);
