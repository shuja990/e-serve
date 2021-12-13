import express from 'express'
const router = express.Router()
import {
  getCommunityServiceProducts,
  getCommunityServiceProductById,
  deleteCommunityServiceProduct,
  createCommunityServiceProduct,
  updateCommunityServiceProduct,
  getUserPosts,
  deleteCommunityServiceProductAdmin
} from '../controllers/communityServiceController.js'
import { protect,admin } from '../middleware/authMiddleware.js'

router.route('/').get(getCommunityServiceProducts).post(protect, createCommunityServiceProduct)
router
  .route('/:id')
  .get(getCommunityServiceProductById)
  .delete(protect, deleteCommunityServiceProduct)
  .put(protect, updateCommunityServiceProduct)
router.route('/myposts/:id').get(protect, getUserPosts)
router
  .route('/admin/:id')
  .delete(protect,admin,deleteCommunityServiceProductAdmin)
export default router
