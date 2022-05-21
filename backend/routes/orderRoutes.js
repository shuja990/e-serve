import express from "express";
const router = express.Router();
import {
  getBuyerOrders,
  getOrderById,
  getOrders,
  getSellerOrders,
  createOrder,
  makePayment,
  markAsPaid,
  markOrderComplete,
  deliverOrder
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getOrders).post(protect, createOrder);
router.route("/:id").get(getOrderById);
router.route("/buyer/:id").get(protect, getBuyerOrders);
router.route("/seller/:id").get(protect, getSellerOrders);
router.route("/pay/:id").post(protect, makePayment);
router.route("/markpaid/:id").post(protect, markAsPaid);
router.route("/complete/:id").post(protect, markOrderComplete);
router.route("/deliver/:id").post(protect, deliverOrder);

export default router;
