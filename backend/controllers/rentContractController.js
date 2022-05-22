import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import RentContract from "../models/rentContractModel.js";

const stripe = new Stripe(
  "sk_test_51GvpJkBqTtLhCjZjfCL0xAlkOPdCoDdaLkdpVV1Dkg5qpB12oQqkAn0YgibmK8sdsvSIvV3e4MSYUWyNmSN9QVnL00xrX1AtDJ"
);

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getRentContracts = asyncHandler(async (req, res) => {
  const rent = await RentContract.find({})
    .populate({ path: "rentedItem" })
    .populate({ path: "rentedBy", select: "_id name paymentDetails" })
    .populate({ path: "rentedFrom", select: "_id name paymentDetails" });

  res.json({ rent });
});

// @desc    Fetch single Paid Service
// @route   GET /api/paidservice/:id
// @access  Public
const getRentContractById = asyncHandler(async (req, res) => {
  const order = await RentContract.findById(req.params.id)
    .populate({ path: "rentedItem" })
    .populate({ path: "rentedBy", select: "_id name paymentDetails" })
    .populate({ path: "rentedFrom", select: "_id name paymentDetails" });

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const createRentContract = asyncHandler(async (req, res) => {
  const { rentedBy, rentedFrom, rentedItem, price, noOfMonths, title } =
    req.body;
  const p = await stripe.products.create({
    name: title,
    default_price_data: {
      unit_amount: Math.trunc(price * 100),
      currency: "usd",
      //   cancel_at:(new Date("13/08/22").getTime())/1000,
      recurring: { interval: "month" },
    },
    expand: ["default_price"],
  });
  const order = new RentContract({
    title,
    rentedBy,
    rentedFrom,
    rentedItem,
    price,
    noOfMonths,
    priceId: p.default_price.id,
  });

  const createdProduct = await order.save();
  res.status(201).json(createdProduct);
});

const getRentedByContracts = asyncHandler(async (req, res) => {
  const order = await RentContract.find({ rentedBy: req.params.id })
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

const getRentedFromContracts = asyncHandler(async (req, res) => {
  const order = await RentContract.find({ rentedFrom: req.params.id })
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
const makePayment = asyncHandler(async (req, res) => {
  const order = await RentContract.findById(req.params.id); 
  if (order) {
    const customer = await stripe.customers.create({
      email: req.body.email,
      source: "tok_mastercard",
    });
    const token = await stripe.tokens.create(
      {
        customer: customer.id,
        card:customer.default_source
      }, 
      {
        stripeAccount: req.body.payfrom,
      }
    );
    console.log(req.body.date);
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      cancel_at: req.body.date,
      items: [
        {
          price: req.body.price,
        },
      ],
      expand: ["latest_invoice.payment_intent"],
      transfer_data: {
        destination: req.body.payto,
      },
    });
    if (subscription) {
      order.contractStatus = "Started";
      order.isPaid = true;
      order.paymentResult = subscription.id;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(400);
      throw new Error("Payment unsuccessful");
    }
  }
});

const markOrderComplete = asyncHandler(async (req, res) => {
  const order = await RentContract.findById(req.params.id);
  if (order) {
    order.contractStatus = "Complete";
  }
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

export {
  createRentContract,
  getRentContractById,
  getRentContracts,
  makePayment,
  getRentedByContracts,
  getRentedFromContracts,
  markOrderComplete
};
