import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51GvpJkBqTtLhCjZjfCL0xAlkOPdCoDdaLkdpVV1Dkg5qpB12oQqkAn0YgibmK8sdsvSIvV3e4MSYUWyNmSN9QVnL00xrX1AtDJ"
);

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate({
      path: "orderItem",
      populate: {
        path: "product",
        model: "PaidService",
      },
    })
    .populate({ path: "buyer", select: "_id name" })
    .populate({ path: "seller", select: "_id name paymentDetails" });

  res.json({ orders });
});

// @desc    Fetch single Paid Service
// @route   GET /api/paidservice/:id
// @access  Public
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate({
      path: "orderItem",
      populate: {
        path: "product",
        model: "PaidService",
      },
    })
    .populate({ path: "buyer", select: "_id name" })
    .populate({ path: "seller", select: "_id name paymentDetails" });
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

const createOrder = asyncHandler(async (req, res) => {
  const { buyer, seller, orderItem, duration } = req.body;

  const order = new Order({
    buyer,
    seller,
    orderItem,
    duration,
  });

  const createdProduct = await order.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updatePaidService = asyncHandler(async (req, res) => {
  const {
    title,
    thumbnailImage,
    images,
    location,
    category,
    description,
    noOfUpdates,
    clicks,
    fbShares,
    whatsappShares,
    emailShares,
    twitterShares,
    coordinates,
    serviceType,
  } = req.body;

  const product = await Order.findById(req.params.id);
  if (req.user._id.toString() == product.createdBy.toString()) {
    if (product) {
      product.title = title;
      product.thumbnailImage = thumbnailImage;
      product.images = images;
      product.location = location;
      product.clicks = clicks;
      product.category = category;
      product.description = description;
      product.noOfUpdates = noOfUpdates;
      product.fbShares = fbShares;
      product.whatsappShares = whatsappShares;
      (product.emailShares = emailShares),
        (product.twitterShares = twitterShares);
      product.coordinates = coordinates;
      product.serviceType = serviceType;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

const getBuyerOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ buyer: req.params.id })
  .populate({
    path: "orderItem",
    populate: {
      path: "product",
      model: "PaidService",
    },
  })
  .populate({ path: "buyer", select: "_id name" })
  .populate({ path: "seller", select: "_id name paymentDetails" });
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

const getSellerOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ seller: req.params.id }).populate({
    path: "orderItem",
    populate: {
      path: "product",
      model: "PaidService",
    },
  })
  .populate({ path: "buyer", select: "_id name" })
  .populate({ path: "seller", select: "_id name paymentDetails" });
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});
const makePayment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    var session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: req.body.price,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/paymentsuccess/${req.params.id}`,
      cancel_url: "http://localhost:3000/failure",
      payment_intent_data: {
        application_fee_amount: 500,
        transfer_data: {
          destination: req.body.account,
        },
      },
    });
    order.paymentResult = session.id || order.paymentResult;
  }
  const updatedOrder = await order.save();
  res.json({
    order: updatedOrder,
    url: session.url,
  });
});
const markAsPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
  }
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});
const deliverOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = new Date();
    order.deliverables = req.body.img;
  }
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});
const markOrderComplete = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.orderStatus = "Complete";
    // const transfer = await stripe.payouts.create(
    //   {
    //     amount: Math.trunc(req.body.amount*100),
    //     currency: "usd",
    //   },
    //   {
    //     stripeAccount: req.body.account,
    //   }
    // );
  }
  // if(transfer.id){
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  // }
});

export {
  getBuyerOrders,
  getOrderById,
  getOrders,
  getSellerOrders,
  createOrder,
  makePayment,
  markAsPaid,
  deliverOrder,
  markOrderComplete
};
