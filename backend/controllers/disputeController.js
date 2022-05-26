import asyncHandler from "express-async-handler";
import Dispute from "../models/disputeModel.js";
import PaidService from '../models/paidServiceModel.js'
import Rent from '../models/rentModel.js'
import Order from "../models/orderModel.js";



const createDispute = asyncHandler(async (req, res) => {
      disputeCreatedAgainst
    const { title, message,disputeType, buyerEvidence ,sellerEvidence, disputeCreatedBy,disputeCreatedAgainst  } = req.body;
  
    const dispute = new Dispute({
      title,
      disputeType,
      message,
      buyerEvidence,
      sellerEvidence,
      disputeCreatedBy,
      disputeCreatedAgainst
    });
  console.log(buyerEvidence)
  console.log(sellerEvidence)
    const createdProduct = await dispute.save();
    res.status(201).json(createdProduct);
  });

  const isUserService = asyncHandler(async (req, res) => {
    // const { productId } = req.body;
    console.log(req.params.id);
    const service = await Order.findById(req.params.id).populate('seller', 'name _id')
    // const rentService = await Rent.findById(req.params.id).populate('createdBy', 'name')
    console.log(service)
    // console.log(rentService)

    
  
    
    return res.send(200, {service})
   
  
    // const createdProduct = await order.save();
    // res.status(201).json(createdProduct);
  });

  
  const getMyDisputes = asyncHandler(async (req, res) => {
    // const { productId } = req.body;
    const service = await Dispute.find({disputeCreatedBy: req.params.id })
    // const rentService = await Rent.findById(req.params.id).populate('createdBy', 'name')
    console.log(service)
    // console.log(rentService)

    
  
    
    return res.send(200, {service})
   
  
    // const createdProduct = await order.save();
    // res.status(201).json(createdProduct);
  });

  export {
    createDispute,
    isUserService,
    getMyDisputes
  };
  