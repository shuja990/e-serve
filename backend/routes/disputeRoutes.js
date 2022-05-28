import express from "express";
import { createDispute, getDispute, getMyDisputes, ifInDisputes, isUserService, updateDispute } from "../controllers/disputeController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/:id").post(protect, createDispute);
router.route("/:id").get(protect, getMyDisputes);
router.route("/disputes/:id").get(protect, getDispute);
router.route("/:id/isuserservice").get(protect, isUserService);
router.route("/ifindisputes/:id").get(protect, ifInDisputes);
router.route("/update/:id").post(protect, updateDispute);


export default router;