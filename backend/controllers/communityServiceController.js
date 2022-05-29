import asyncHandler from "express-async-handler";
import CommunityService from "../models/communityServiceModel.js";
import CSOffer from "../models/csOfferModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getCommunityServiceProducts = asyncHandler(async (req, res) => {
  const products = await CommunityService.find({}).populate({
    path: "createdBy",
    select: "name _id",
  });
  res.json({ products });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getCommunityServiceProductById = asyncHandler(async (req, res) => {
  const product = await CommunityService.findById(req.params.id).populate({
    path: "createdBy",
    select: "name _id",
  });

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteCommunityServiceProduct = asyncHandler(async (req, res) => {
  const product = await CommunityService.findById(req.params.id);
  if (req.user._id.toString() == product.createdBy.toString()) {
    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const createCommunityServiceProduct = asyncHandler(async (req, res) => {
  const {
    title,
    thumbnailImage,
    images,
    location,
    category,
    description,
    coordinates,
  } = req.body;
  const product = new CommunityService({
    title: title,
    createdBy: req.user._id,
    thumbnailImage: thumbnailImage,
    images: images,
    location: location,
    coordinates: coordinates,
    category: category,
    description: description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateCommunityServiceProduct = asyncHandler(async (req, res) => {
  const {
    title,
    thumbnailImage,
    images,
    location,
    category,
    description,
    coordinates,
  } = req.body;

  const product = await CommunityService.findById(req.params.id);
  if (req.user._id.toString() == product.createdBy.toString()) {
    if (product) {
      product.title = title;
      product.thumbnailImage = thumbnailImage;
      product.images = images;
      product.coordinates = coordinates;
      product.location = location;
      product.category = category;
      product.description = description;
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

const getUserPosts = asyncHandler(async (req, res) => {
  const product = await CommunityService.find({ createdBy: req.params.id });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

// @desc    Delete Post
// @route   DELETE /api/services/admin/:id
// @access  Private/Admin
const deleteCommunityServiceProductAdmin = asyncHandler(async (req, res) => {
  const product = await CommunityService.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getCollectedBy = asyncHandler(async (req, res) => {
  const product = await CommunityService.find({ collectedBy: req.params.id })
    .populate({ path: "createdBy", select: "_id name" })
    .populate({ path: "collectedBy", select: "_id name" });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

const collectedItem = asyncHandler(async (req, res) => {
  const { collectedBy, offerId } = req.body;
  try {
    const product = await CommunityService.findById(req.params.id);
    if (product) {
      const deleteOffer = await CSOffer.findByIdAndDelete(offerId);
      (product.collectedBy = collectedBy), (product.available = false);
      const update = await product.save();
      res.json(update);
    } else {
      res.status(404);
      throw new Error("Community Service Product Not Found");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const getOffers = asyncHandler(async (req, res) => {
  const rent = await CSOffer.find({})
    .populate({ path: "item" })
    .populate({ path: "collectedBy", select: "_id name " })
    .populate({ path: "collectedFrom", select: "_id name " });

  res.json({ rent });
});
const getCollectedByOffers = asyncHandler(async (req, res) => {
  const order = await CSOffer.find({ collectedBy: req.params.id })
    .populate({ path: "item" })
    .populate({ path: "collectedBy", select: "_id name " })
    .populate({ path: "collectedFrom", select: "_id name " });

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

const getCollectedFromOffers = asyncHandler(async (req, res) => {
  const order = await CSOffer.find({ collectedFrom: req.params.id })
    .populate({ path: "item" })
    .populate({ path: "collectedBy", select: "_id name " })
    .populate({ path: "collectedFrom", select: "_id name " });

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});
const createOffer = asyncHandler(async (req, res) => {
  const { collectedBy, collectedFrom, item, title } = req.body;
  const order = new CSOffer({
    title,
    collectedBy,
    collectedFrom,
    item,
  });

  const createdProduct = await order.save();
  res.status(201).json(createdProduct);
});
export {
  getCommunityServiceProductById,
  getCommunityServiceProducts,
  deleteCommunityServiceProduct,
  createCommunityServiceProduct,
  updateCommunityServiceProduct,
  getUserPosts,
  deleteCommunityServiceProductAdmin,
  collectedItem,
  createOffer,
  getCollectedByOffers,
  getCollectedFromOffers,
  getOffers,
  getCollectedBy,
};
