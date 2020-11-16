import express from "express";
const router = express.Router();
import { addItemsOrder } from "../controller/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addItemsOrder);

export default router;
