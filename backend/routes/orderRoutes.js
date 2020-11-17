import express from "express";
const router = express.Router();
import {
  addItemsOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controller/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addItemsOrder);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
