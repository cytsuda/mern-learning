import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createNewReview,
} from "../controller/productController.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createNewReview);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
