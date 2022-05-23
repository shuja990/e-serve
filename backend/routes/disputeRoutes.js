import express from "express";
import { createDispute, getMyDisputes, isUserService } from "../controllers/disputeController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/:id").post(protect, createDispute);
router.route("/:id").get(protect, getMyDisputes);
router.route("/:id/isuserservice").get(protect, isUserService);

export default router;