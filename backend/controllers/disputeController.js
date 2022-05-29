import asyncHandler from "express-async-handler";
import Dispute from "../models/disputeModel.js";
import PaidService from '../models/paidServiceModel.js'
import Rent from '../models/rentModel.js'
import Order from "../models/orderModel.js";



const createDispute = asyncHandler(async (req, res) => {
    const { title, message,disputeType, buyerEvidence ,sellerEvidence, disputeCreatedBy,disputeCreatedAgainst  } = req.body;
  
    const dispute = new Dispute({
      title,
      disputeType,
      disputeService: disputeType == 'paid service'? req.params.id : null,
      disputeRent: disputeType == 'rental'? req.params.id : null,
      message,
      buyerEvidence,
      sellerEvidence, 
      disputeCreatedBy, 
      disputeCreatedAgainst,
      isOpened: true,
      disputeOrderId: req.params.id,
      adminResponse: null
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
    console.log(req.params.id);
    const service = await Dispute.find(
      {$or:[{disputeCreatedAgainst: req.params.id},{disputeCreatedBy: req.params.id }]}
      )
    // const service = await Dispute.find({disputeCreatedBy: req.params.id})
    // const rentService = await Rent.findById(req.params.id).populate('createdBy', 'name')
    console.log(service)
    // console.log(rentService)

    
  
    
    return res.status(200).send({service})
   
  
    // const createdProduct = await order.save();
    // res.status(201).json(createdProduct);
  });


  const ifInDisputes= asyncHandler(async(req,res)=>{
    const ifInDisputesBool = await Dispute.find(
      {$or:[{disputeService: req.params.id},{disputeRent: req.params.id }]}
      )
      console.log("disputes if in conttreoler")
      console.log(ifInDisputesBool)
  })


  
  const getDispute = asyncHandler(async (req, res) => {

    // const dispute = await Dispute.findOne( {$or:[{disputeService: req.params.id},{disputeRent: req.params.id }]})
    const dispute = await Dispute.findById(req.params.id)
   
    console.log("dispute:" +dispute)
     
    return res.status(200).send({dispute})
   
  }); 
  
  
  const updateDispute = asyncHandler(async (req, res) => {
    const {
      title, message,disputeType, buyerEvidence ,sellerEvidence, disputeCreatedBy,disputeCreatedAgainst
    } = req.body;
  
    const dispute = await Dispute.findById(req.params.id);
    // req.user._id.toString() == dispute.disputeCreatedBy.toString() || req.user._id.toString() == dispute.disputeCreatedAgainst.toString()
    console.log('to updated dispute', dispute)
    if (true) {
      if (dispute) {
        dispute.title = title;
        dispute.message = message;
        dispute.disputeType = disputeType;
        dispute.buyerEvidence = buyerEvidence;
        dispute.sellerEvidence = sellerEvidence;
        // dispute.disputeCreatedBy = disputeCreatedBy;
        // dispute.disputeCreatedAgainst = disputeCreatedAgainst;
        
        const updatedDispute = await dispute.save();
        console.log('dispute updated')
        res.json(updatedDispute);
      } else {
        res.status(404);
        throw new Error("Dispute not found");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized");
    }
  }); 

  
  const resolveDispute = asyncHandler(async (req, res) => {
    const {
     adminResponse
    } = req.body;
  
    const dispute = await Dispute.findById(req.params.id);
    // req.user._id.toString() == dispute.disputeCreatedBy.toString() || req.user._id.toString() == dispute.disputeCreatedAgainst.toString()
    console.log('to updated dispute', dispute)
    if (true) {
      if (dispute) {
        dispute.adminResponse = adminResponse;
        dispute.isOpened = false;
        dispute.disputeStatus="Resolved"
        
        const updatedDispute = await dispute.save();
        console.log('dispute updated')
        res.json(updatedDispute);
      } else {
        res.status(404);
        throw new Error("Dispute not found");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized");
    }
  }); 
  

  export {
    createDispute,
    isUserService,
    getMyDisputes,
    ifInDisputes,
    getDispute,
    updateDispute,
    resolveDispute
  };
  