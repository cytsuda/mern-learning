import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// Routes
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is runing...");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server is running in ${NODE_ENV} mode at: http://localhost:${PORT}/`.yellow
      .bold
  )
);
