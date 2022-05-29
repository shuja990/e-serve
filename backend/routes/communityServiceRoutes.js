import express from 'express'
const router = express.Router()
import {
  getCommunityServiceProducts,
  getCommunityServiceProductById,
  deleteCommunityServiceProduct,
  createCommunityServiceProduct,
  updateCommunityServiceProduct,
  getUserPosts,
  deleteCommunityServiceProductAdmin,
  collectedItem,
  getOffers,
  createOffer,
  getCollectedByOffers,
  getCollectedFromOffers,
  getCollectedBy
} from '../controllers/communityServiceController.js'
import { protect,admin } from '../middleware/authMiddleware.js'

router.route('/').get(getCommunityServiceProducts).post(protect, createCommunityServiceProduct)
router
  .route('/:id')
  .get(getCommunityServiceProductById)
  .delete(protect, deleteCommunityServiceProduct)
  .put(protect, updateCommunityServiceProduct)
router.route('/myposts/:id').get(protect, getUserPosts)
router.route('/collectedbyme/:id').get(protect, getCollectedBy)

router
  .route('/admin/:id')
  .delete(protect,admin,deleteCommunityServiceProductAdmin)
router.route('/collectitem/:id').put(protect,collectedItem)

router.route('/offers').get(protect,getOffers).post(protect,createOffer)
router.route('/offers/collectedBy/:id').get(protect,getCollectedByOffers)
router.route('/collectedFrom/:id').get(protect,getCollectedFromOffers)

export default router
