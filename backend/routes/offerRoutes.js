import express from "express";
const router = express.Router();
import {
    createOffer,getOffers,getRentedByOffers,getRentedFromOffers
} from "../controllers/offerController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getOffers).post(protect, createOffer);
router.route("/rentedby/:id").get(protect, getRentedByOffers);
router.route("/rentedfrom/:id").get(protect, getRentedFromOffers);

export default router;
