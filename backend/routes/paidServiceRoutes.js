import express from 'express'
const router = express.Router()
import {
    getPaidServiceById,
    getPaidServices,
    deletePaidService,
    createPaidService,
    updatePaidService,
    getUserPaidService,
    deletePaidServiceAdmin
} from '../controllers/paidServiceController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPaidServices).post( createPaidService)

// router.route('/').get(getPaidServices).post(protect, admin, createPaidService)
// router.route('/:id/reviews').post(protect, createProductReview)
// router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getPaidServiceById)
  .delete(protect, admin, deletePaidService)
  .put(protect, admin, updatePaidService)

export default router
