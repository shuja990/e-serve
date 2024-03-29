import asyncHandler from 'express-async-handler'
import PaidService from '../models/paidServiceModel.js'
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51GvpJkBqTtLhCjZjfCL0xAlkOPdCoDdaLkdpVV1Dkg5qpB12oQqkAn0YgibmK8sdsvSIvV3e4MSYUWyNmSN9QVnL00xrX1AtDJ"
);

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const  getPaidServices = asyncHandler(async (req, res) => {

  const paidServices = await PaidService.find({ }).populate('createdBy', 'name')
  res.json({ paidServices })
})

// @desc    Fetch single Paid Service
// @route   GET /api/paidservice/:id
// @access  Public
const getPaidServiceById = asyncHandler(async (req, res) => {
  const product = await PaidService.findById(req.params.id).populate('createdBy', 'name review')

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a delete Paid Service
// @route   DELETE /api/paidservice/:id
// @access  Private/Admin
const deletePaidService = asyncHandler(async (req, res) => {
  const product = await PaidService.findById(req.params.id)
  if(req.user._id.toString() == product.createdBy.toString()){
    if (product) {
        await product.remove()
        res.json({ message: 'Paid Service removed' })
    } else {
        res.status(404)
        throw new Error('Paid Service not found')
    }
  }
  else{
      res.status(401)
      throw new Error('Not authorized')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const createPaidService = asyncHandler(async (req, res) => {
    const { title,thumbnailImage,images,location,category,description, createdBy, price, serviceType, coordinates } = req.body
    // createdBy: req.user._id
    const p = await stripe.products.create({
      name: title,
      default_price_data: {
        unit_amount: Math.trunc(price*100),
        currency: 'usd',
        // recurring: {interval: 'month'},
      },
      expand: ['default_price'],
    });
  const product = new PaidService({
    title: title,
    createdBy: req.user._id,
    thumbnailImage: thumbnailImage,
    // images: images,
    stripeProdId:p.default_price.id,
    location: location,
    category: category,
    description: description,
    price: price,
    clicks: 0,
    fbShares: 0,
    twitterShares: 0,
    emailShares: 0,
    whatsappShares: 0,
    serviceType,
    coordinates

  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updatePaidService = asyncHandler(async (req, res) => {
    const { title,thumbnailImage,images,location,category,description, noOfUpdates, clicks, fbShares, whatsappShares, emailShares, twitterShares, coordinates, serviceType } = req.body


  const product = await PaidService.findById(req.params.id)
    if(req.user._id.toString() == product.createdBy.toString()){
        if (product) {
            product.title = title
            product.thumbnailImage = thumbnailImage
            product.images = images
            product.location = location
            product.clicks = clicks
            product.category = category
            product.description = description
            product.noOfUpdates= noOfUpdates
            product.fbShares= fbShares
            product.whatsappShares= whatsappShares
            product.emailShares= emailShares,
            product.twitterShares=twitterShares
            product.coordinates= coordinates
            product.serviceType= serviceType
            const updatedProduct = await product.save()
            res.json(updatedProduct)
          } else {
            res.status(404)
            throw new Error('Product not found')
          }
    }
    else{
      res.status(401)
      throw new Error('Not authorized')

    }
  
})

const getUserPaidService = asyncHandler(async (req, res) => {
  
  const product = await PaidService.find({createdBy:req.params.id})
    if (product) {
      res.json(product)
    }
    else{
      res.status(404)
      throw new Error('Products not found')
    }
  })

// @desc    Delete Post
// @route   DELETE /api/services/admin/:id
// @access  Private/Admin
const deletePaidServiceAdmin = asyncHandler(async (req, res) => {
  const product = await PaidService.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateClicksPaidProduct = asyncHandler(async (req, res) => {
  const {  clicks, whatsappShares, emailShares, twitterShares, fbShares  } = req.body


const product = await PaidService.findById(req.params.id)

  if(true){
      if (product) {
         
          product.clicks= clicks || product.clicks
          product.whatsappShares= whatsappShares || product.whatsappShares
          product.emailShares= emailShares || product.emailShares
          product.twitterShares= twitterShares || product.twitterShares
          product.fbShares= fbShares || product.fbShares
      
          const updatedProduct = await product.save()
          res.json(updatedProduct)
        } else {
          res.status(404)
          throw new Error('Product not found')
        }
  }
  else{
    res.status(401)
    throw new Error('Not authorized')

  }

})


export {
  getPaidServiceById,
  getPaidServices,
  deletePaidService,
  createPaidService,
  updatePaidService,
  getUserPaidService,
  deletePaidServiceAdmin,
  updateClicksPaidProduct
}
