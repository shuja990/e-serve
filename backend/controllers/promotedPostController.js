import asyncHandler from "express-async-handler";
import Promote from "../models/PromotedPostModel.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51GvpJkBqTtLhCjZjfCL0xAlkOPdCoDdaLkdpVV1Dkg5qpB12oQqkAn0YgibmK8sdsvSIvV3e4MSYUWyNmSN9QVnL00xrX1AtDJ"
);

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getPromotedPosts = asyncHandler(async (req, res) => {
  let b = []
  const promote = await Promote.find({})
    .populate({ path: "promotedBy", select: "_id name paymentDetails" })
    .populate({ path: "rentPost" })
    .populate({ path: "servicePost" });
  promote.sort(function (a, b) {
    return a.price - b.price;
  });
  let rentCounter = 0
  let serviceCounter = 0
  for (let index = promote.length-1; index > -1; index--) {
    if(b.length<6){
      if(promote[index].rentPost!==null && rentCounter<3){
        b.push(promote[index])
        rentCounter++
      }
      else if(promote[index].servicePost!==null && serviceCounter<3){
        b.push(promote[index])
        serviceCounter++
      }
    }    
  }
  res.json(b)
  res.json({ promote });
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const createPromotedPost = asyncHandler(async (req, res) => {
  const { postType, rentPost, servicePost, price, promotedBy, name } = req.body;
  // createdBy: req.user._id
  const p = await stripe.products.create({
    name: name,
    default_price_data: {
      unit_amount: Math.trunc(price * 100),
      currency: "usd",
    },
    expand: ["default_price"],
  });
  var session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: p.default_price.id,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/promotepaymentsuccess/${p.default_price.id}`,
    cancel_url: "http://localhost:3000/failure",
  });
  const product = new Promote({
    postType,
    rentPost,
    servicePost,
    price,
    promotedBy,
    name,
    priceId: p.default_price.id,
    paymentResult: session.id,
  });

  const createdProduct = await product.save();
  res.status(201).json({ createdProduct: createdProduct, url: session.url });
});
const markAsPaid = asyncHandler(async (req, res) => {
  const o = await Promote.findOneAndUpdate(
    { priceId: req.params.id },
    { isPaid: true }
  );
});
const deletePosts = asyncHandler(async (req, res) => {
  const documentToDelete = await Promote.deleteMany({});

  setTimeout(async () => {
    await deletePosts();
  }, 604800);
});

export { getPromotedPosts, createPromotedPost, deletePosts, markAsPaid };
