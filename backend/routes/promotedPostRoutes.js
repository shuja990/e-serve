import express from 'express'
const router = express.Router()
import {
    createPromotedPost,getPromotedPosts, markAsPaid
} from '../controllers/promotedPostController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPromotedPosts).post( protect, createPromotedPost)
router.route('/:id').post(protect,markAsPaid)
export default router
