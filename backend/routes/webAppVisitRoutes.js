import express from 'express'
import { addCount, createVisit, getVisitCounts } from '../controllers/webVisitsController.js'
const router = express.Router()

router
  .route('/:id')
  .get(getVisitCounts)
  .put(addCount)

  router.route('createvisit').post(createVisit)

  export default router