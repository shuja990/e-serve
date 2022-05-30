import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { createFeedback, getFeedbacks } from '../controllers/feedbackController.js'
const router = express.Router()

router
  .route('/')
  .post(protect,createFeedback)
  .get(protect, getFeedbacks)
  

  export default router