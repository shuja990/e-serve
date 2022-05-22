import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import dotenv from 'dotenv'
import stream, {connect} from 'getstream';
import crypto from 'crypto';
import {StreamChat} from'stream-chat'
import bcrypt from 'bcryptjs'
import User from "../models/userModel.js";
import Stripe from "stripe";




// import StreamChat from ('stream-chat').StreamChat;


// require('dotenv').config();
dotenv.config()

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;



const stripe = new Stripe(
  "sk_test_51GvpJkBqTtLhCjZjfCL0xAlkOPdCoDdaLkdpVV1Dkg5qpB12oQqkAn0YgibmK8sdsvSIvV3e4MSYUWyNmSN9QVnL00xrX1AtDJ"
);

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body

  const user = await User.findOne({ email })
console.log(user);
  if (user && (await user.matchPassword(password))) {
    
  // chat auth start
   const serverClient = stream.connect(api_key, api_secret, app_id);
   const client = StreamChat.getInstance(api_key, api_secret, app_id);
 
   const { users } = await client.queryUsers({ name: username });
 
   if(!users.length) return res.status(400).json({ message: 'User not found' });
 
   const success = await bcrypt.compare(password, users[0].password);
   console.log(success);
 
   const streamToken = serverClient.createUserToken(users[0].id);

  
 
   if(success) {
client.connectUser({name:users[0].name, email:email, password: users[0].password, contact:users[0].name, cnic:users[0].name, address:users[0].address, username, id: users[0].id})

     
 


    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      contact: user.contact,
      cnic: user.cnic,
      favorites: user.favorites,
      itemsRented: user.itemsRented,
      itemsRentedOut: user.itemsRentedOut,
      collectionRequestsSent: user.collectionRequestsSent,
      itemsCollected: user.itemsCollected,
      servicesOrdered: user.servicesOrdered,
      paymentDetails: user.paymentDetails,
      paymentsEnabled:user.paymentsEnabled,
      address: user.address,
      token: generateToken(user._id),
      streamToken,
      username,
      userId: users[0].id

    })
  }
   
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, contact, cnic, address, username} = req.body
  

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
// try

// try end
const userId = crypto.randomBytes(16).toString('hex');

const serverClient = connect(api_key, api_secret, app_id);
let p= password
const hashedPassword = await bcrypt.hash(p, 10);

const token = serverClient.createUserToken(userId);
const chatClient = StreamChat.getInstance(api_key, api_secret, app_id);
// chatClient.disconnectUser({id: userId})
chatClient.connectUser({name, email, password: hashedPassword, contact, cnic, address, username, id: userId})





  const account = await stripe.accounts.create({ type: "express" });
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: "http://localhost:3000/",
    return_url: "http://localhost:3000/onboardsuccess",
    type: "account_onboarding",
  });
  const update = await stripe.accounts.update(
    account.id,
    {settings: {payouts: {schedule: {interval: 'manual'}}}}
  );
  let paymentDetails = account.id
  const user = await User.create({
    name,
    username,
    email,
    password,
    contact,
    cnic,
    address,
    hashedPassword,

    paymentDetails
  });

  console.log(accountLink.url);

  if (user) {
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email, 
     
      isAdmin: user.isAdmin, 
      contact: user.contact,
      cnic: user.cnic,
      favorites: user.favorites,   
      itemsRented: user.itemsRented,
      itemsRentedOut: user.itemsRentedOut,
      collectionRequestsSent: user.collectionRequestsSent,
      itemsCollected: user.itemsCollected, 
      servicesOrdered: user.servicesOrdered,
      paymentDetails: user.paymentDetails,
      address: user.address,
      paymentsEnabled: user.paymentsEnabled,
      redirectUrl:accountLink.url,
      token: generateToken(user._id),
      streamToken: token,
      userId:userId, 
      hashedPassword:hashedPassword,
      fullName: user.name, 

    })
    
   
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      contact: user.contact,
      cnic: user.cnic,
      favorites: user.favorites,
      itemsRented: user.itemsRented,
      itemsRentedOut: user.itemsRentedOut,
      collectionRequestsSent: user.collectionRequestsSent,
      itemsCollected: user.itemsCollected,
      servicesOrdered: user.servicesOrdered,
      paymentDetails: user.paymentDetails, 
      address: user.address
   
     
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (req.user._id.toString() !== req.body.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.contact = req.body.contact || user.contact;
    user.cnic = user.cnic;
    user.address = req.body.address || user.address;
    user.paymentDetails = req.body.paymentDetails || user.paymentDetails;
    user.paymentsEnabled = req.body.paymentsEnabled || user.paymentsEnabled
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      contact: updatedUser.contact,
      cnic: updatedUser.cnic,
      favorites: updatedUser.favorites,
      itemsRented: updatedUser.itemsRented,
      itemsRentedOut: updatedUser.itemsRentedOut,
      collectionRequestsSent: updatedUser.collectionRequestsSent,
      itemsCollected: updatedUser.itemsCollected,
      servicesOrdered: updatedUser.servicesOrdered,
      paymentDetails: updatedUser.paymentDetails,
      address: updatedUser.address,
      paymentsEnabled:user.paymentsEnabled,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/User
const deleteUser = asyncHandler(async (req, res) => {
  if (req.user._id.toString() !== req.params.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const addTofavorites = asyncHandler(async (req, res) => {
  const { type } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    if (type === "Service") {
      user.serviceFavorites.push(req.params.id);
      const a = await user.save();
      res.status(200);
      res.json(a);
    } else if (type === "CommunityService") {
      user.communityFavorites.push(req.params.id);
      const a = await user.save();
      res.status(200);
      res.json(a);
    } else if (type === "Rent") {
      user.rentFavorites.push(req.params.id);
      const a = await user.save();
      res.status(200);
      res.json(a);
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const removeFromFavorites = asyncHandler(async (req, res) => {
  const { type } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    if (type === "Service") {
      let filtered = user.serviceFavorites.filter(
        (e) => e._id.toString() == req.params.id.toString()
      );
      user.serviceFavorites = filtered;
      let a = await user.save();
      res.status(200);
      res.json(a);
    } else if (type === "CommunityService") {
      let filtered = user.communityFavorites.filter(
        (e) => e._id.toString() !== req.params.id.toString()
      );
      user.communityFavorites = filtered;
      let a = await user.save();
      res.status(200);
      res.json(a);
    } else if (type === "Rent") {
      let filtered = user.rentFavorites.filter(
        (e) => e._id.toString() == req.params.id.toString()
      );
      user.rentFavorites = filtered;
      let a = await user.save();
      res.status(200);
      res.json(a);
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getFavorites = asyncHandler(async (req, res) => {
  let favorites = [];
  const service = await User.find().populate("serviceFavorites").exec();
  service.forEach((e) => {
    favorites.push(e.serviceFavorites);
  });
  const community = await User.find().populate("communityFavorites").exec();
  community.forEach((e) => {
    favorites.push(e.communityFavorites);
  });
  const rent = await User.find().populate("rentFavorites").exec();
  rent.forEach((e) => {
    favorites.push(e.rentFavorites);
  });
  res.status(200);
  res.json(favorites);
});

const createUserReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const user = await User.findById(req.params.id);

  if (user) {
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      ratedBy: req.user._id,
    };

    user.review.push(review);
    await user.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUserAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const addAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isAdmin = true;
    user.save();
    res.json({ message: "User added as admin" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  deleteUserAdmin,
  getFavorites,
  removeFromFavorites,
  addTofavorites,
  createUserReview,
  addAdmin,
};
