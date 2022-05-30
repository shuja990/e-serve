import Feedback from "../models/feedbackModel.js";
import asyncHandler from "express-async-handler";


const createFeedback = asyncHandler(async (req, res) => {
    const {
      title,
      description,
      feedbackProvider
    } = req.body;
    const feedback = new Feedback({
      title: title,
      description: description,
      feedbackProvider: feedbackProvider
    });
  
    const createdFeedback = await feedback.save();
    res.status(201).json(createdFeedback);
  });

  
const getFeedbacks = asyncHandler(async (req, res) => {
    const feedbacks = await Feedback.find({}).populate({ path: "feedbackProvider", select: "_id name" })
    if (feedbacks) {
      res.json(feedbacks);
    } else {
      res.status(404);
      throw new Error("feedbacks not found");
    }
     
    res.status(201).json(feedbacks);
  });

  export{
    createFeedback,
    getFeedbacks
  }