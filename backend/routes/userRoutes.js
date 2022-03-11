import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  addTofavorites,
  removeFromFavorites,
  getFavorites,
  createUserReview,
  deleteUserAdmin,
  addAdmin,
  getUserById
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  router.route('/:id').get(getUserById)
router
  .route('/admin/:id')
  .delete(protect, admin, deleteUserAdmin)
  .post(protect,admin,addAdmin)
router
  .route('/favorites/:id')
  .post(protect,addTofavorites)
  .delete(protect,removeFromFavorites)
router
  .route('/favorites/')
  .get(protect,getFavorites)
router
  .route('/review/:id')
  .post(protect,createUserReview)

export default router
