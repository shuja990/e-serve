import express from 'express'
const router = express.Router()
import {
    getPaidServiceById,
    getPaidServices,
    deletePaidService,
    createPaidService,
    updatePaidService,
    getUserPaidService,
    deletePaidServiceAdmin,
    updateClicksPaidProduct
} from '../controllers/paidServiceController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPaidServices).post( protect, createPaidService)
router
  .route('/:id')
  .get(getPaidServiceById)
  .delete(protect, deletePaidService)
  .put(protect, updatePaidService)
router.route('/admin/:id').delete(protect,admin,deletePaidServiceAdmin)
router.route('/myposts/:id').get(protect, getUserPaidService)
router.route('/updateclicks/:id').put(updateClicksPaidProduct)

// router.route('/').get(getPaidServices).post(protect, admin, createPaidService)
// router.route('/:id/reviews').post(protect, createProductReview)
// router.get('/top', getTopProducts)
// router
//   .route('/:id')
//   .get(getPaidServiceById)
//   .delete(protect, deletePaidService)
//   .put(protect, admin, updatePaidService)

export default router
