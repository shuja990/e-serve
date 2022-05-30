import express from 'express'
const router = express.Router()
import {
  getRentProducts,
  getRentProductById,
  deleteRentProduct,
  createRentProduct,
  updateRentProduct,
  getUserPosts,
  deleteRentProductAdmin,
  updateClicksRentProduct
} from '../controllers/rentController.js'
import { protect,admin } from '../middleware/authMiddleware.js'

router.route('/').get(getRentProducts).post(protect, createRentProduct)
router
  .route('/:id')
  .get(getRentProductById)
  .delete(protect, deleteRentProduct)
  .put(protect, updateRentProduct)
router
  .route('/myposts/:id')
  .get(protect,getUserPosts)
router
  .route('/admin/:id')
  .delete(protect,admin,deleteRentProductAdmin)

router.route('/updateclicks/:id').put(updateClicksRentProduct)

export default router
