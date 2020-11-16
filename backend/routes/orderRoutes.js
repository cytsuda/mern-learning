import express from "express";
const router = express.Router();
import { addItemsOrder, getOrderById } from "../controller/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addItemsOrder);
router.route("/:id").get(protect, getOrderById);

export default router;
