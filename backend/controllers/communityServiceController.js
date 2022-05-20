import asyncHandler from "express-async-handler";
import CommunityService from "../models/communityServiceModel.js";

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

export {
  getCommunityServiceProductById,
  getCommunityServiceProducts,
  deleteCommunityServiceProduct,
  createCommunityServiceProduct,
  updateCommunityServiceProduct,
  getUserPosts,
  deleteCommunityServiceProductAdmin,
};
