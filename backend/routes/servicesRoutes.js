import express from 'express'
const router = express.Router()
// import {
//   getServices,
//   getServiceById,
//   deleteService,
//   createService,
//   updateService,
//   createserviceReview,
//   getUserPosts,
//   deleteServiceAdmin
// } from '../controllers/serviceController.js'
import { protect,admin } from '../middleware/authMiddleware.js'

// router.route('/').get(getServices).post(protect, createService)
// router.route('/:id/reviews').post(protect, createserviceReview)
// router
//   .route('/:id')
//   .get(getServiceById)
//   .delete(protect, deleteService)
//   .put(protect, updateService)
// router.route('/myposts/:id').get(protect, getUserPosts)
// router
//   .route('/admin/:id')
//   .delete(protect,admin,deleteServiceAdmin)

export default router
