import express from 'express'
const router = express.Router()
import {
    addWords,addWord
} from '../controllers/adminController.js'
import { protect,admin } from '../middleware/authMiddleware.js'

router.route('/inappropriatedwords').post(protect,admin,addWords)
router.route('/inappropriatedword').post(protect,admin,addWord)

export default router
