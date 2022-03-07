import asyncHandler from 'express-async-handler'
import WebAppVisit from '../models/webAppVisit.js'

const  getVisitCounts = asyncHandler(async (req, res) => {

    const webVisits = await WebAppVisit.findById(req.params.id)
    res.json({ webVisits })
  })
  

  const addCount = asyncHandler(async (req, res) => {
    // createdBy: req.user._id
  const webVisits = await WebAppVisit.findById(req.params.id)
  webVisits.numOfVisits=webVisits.numOfVisits+1

  const updatedCount = await webVisits.save()
  res.status(201).json(updatedCount)
})


const createVisit = asyncHandler(async (req, res) => {
    // const { count } = req.body
    // createdBy: req.user._id
  const product = new WebAppVisit({
   numOfVisits: 0
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

export{
    getVisitCounts,
    addCount,
    createVisit
}