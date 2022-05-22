import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import Offer from "../models/OfferModel.js";

const stripe = new Stripe(
  "sk_test_51GvpJkBqTtLhCjZjfCL0xAlkOPdCoDdaLkdpVV1Dkg5qpB12oQqkAn0YgibmK8sdsvSIvV3e4MSYUWyNmSN9QVnL00xrX1AtDJ"
);

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getOffers = asyncHandler(async (req, res) => {
  const rent = await Offer.find({})
    .populate({ path: "rentedItem" })
    .populate({ path: "rentedBy", select: "_id name paymentDetails" })
    .populate({ path: "rentedFrom", select: "_id name paymentDetails" });

  res.json({ rent });
});
const getRentedByOffers = asyncHandler(async (req, res) => {
    const order = await Offer.find({ rentedBy: req.params.id })
    .populate({ path: "rentedItem" })
    .populate({ path: "rentedBy", select: "_id name paymentDetails" })
    .populate({ path: "rentedFrom", select: "_id name paymentDetails" });
  
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Products not found");
    }
  });
  
  const getRentedFromOffers = asyncHandler(async (req, res) => {
    const order = await Offer.find({ rentedFrom: req.params.id })
    .populate({ path: "rentedItem" })
    .populate({ path: "rentedBy", select: "_id name paymentDetails" })
    .populate({ path: "rentedFrom", select: "_id name paymentDetails" });
  
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Products not found");
    }
  });
const createOffer = asyncHandler(async (req, res) => {
  const { rentedBy, rentedFrom, rentedItem, price, noOfMonths, title } =
    req.body;
  const order = new Offer({
    title,
    rentedBy,
    rentedFrom,
    rentedItem,
    price,
    noOfMonths,
  });

  const createdProduct = await order.save();
  res.status(201).json(createdProduct);
});

export { createOffer,getOffers,getRentedByOffers,getRentedFromOffers };
