import express from "express";
const router = express.Router();
import {
createRentContract, getRentContractById, getRentContracts,makePayment, getRentedByContracts, getRentedFromContracts,uploadContract , markOrderComplete
} from "../controllers/rentContractController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getRentContracts).post(protect, createRentContract);
router.route("/:id").get(getRentContractById);
// ma warkari de
router.route("/rentedby/:id").get(protect, getRentedByContracts);
//from aghsti de
router.route("/rentedfrom/:id").get(protect, getRentedFromContracts); 
router.route("/contract/:id").post(protect, uploadContract);

router.route("/pay/:id").post( makePayment);
router.route("/complete/:id").post(protect, markOrderComplete);

export default router;
