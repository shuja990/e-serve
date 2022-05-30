import express from "express";

import { cancelSubscription, createDispute, getDispute, getMyDisputes, ifInDisputes, isUserService, refundOrder, updateDispute, resolveDispute } from "../controllers/disputeController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/:id").post(protect, createDispute);
router.route("/:id").get(protect, getMyDisputes);
router.route("/disputes/:id").get(protect, getDispute);
router.route("/:id/isuserservice").get(protect, isUserService);
router.route("/ifindisputes/:id").get(protect, ifInDisputes);
router.route("/update/:id").post(protect, updateDispute);
router.route("/resolve/:id").post(protect, resolveDispute);
router.route("/refund/:id").post(refundOrder);
router.route("/cacncel/:id").post(cancelSubscription);


export default router;