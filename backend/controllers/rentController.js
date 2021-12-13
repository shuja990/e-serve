import asyncHandler from 'express-async-handler'
import Rent from '../models/rentModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public


const  getRentProducts = asyncHandler(async (req, res) => {

  const products = await Rent.find({ })
  res.json({ products })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getRentProductById = asyncHandler(async (req, res) => {
  const product = await Rent.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteRentProduct = asyncHandler(async (req, res) => {
  const product = await Rent.findById(req.params.id)
  if(req.user._id.toString() == product.createdBy.toString()){
    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
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

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const createRentProduct = asyncHandler(async (req, res) => {
    const { title,price,thumbnailImage,images,location,category,description,isMovable, } = req.body
  const product = new Rent({
    title: title,
    price: price,
    createdBy: req.user._id,
    thumbnailImage: thumbnailImage,
    images: images,
    location: location,
    category: category,
    description: description,
    isMovable: isMovable
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateRentProduct = asyncHandler(async (req, res) => {
    const { title,price,thumbnailImage,images,location,category,description,isMovable, } = req.body


  const product = await Rent.findById(req.params.id)
    if(req.user._id.toString() == product.createdBy.toString()){
        if (product) {
            product.title = title
            product.price = price
            product.thumbnailImage = thumbnailImage
            product.images = images
            product.location = location
            product.category = category
            product.description = description
            product.isMovable = isMovable
        
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

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const getUserPosts = asyncHandler(async (req, res) => {
const products = []

const product = await Rent.find({createdBy:req.params.id})
  if (product) {
    product.forEach(element => {
      if(req.user._id.toString() == element.createdBy.toString()){
        products.push(product)
    }
    else{
      res.status(401)
      throw new Error('Not authorized')

    }
    });
  }
  else {
    res.status(404)
    throw new Error('Product not found')
  }
  if(products.length>0){
    res.status(200)
    res.json(products)
  }
  else{
    res.status(404)
    throw new Error('Products not found')
  }
})

// @desc    Delete Post
// @route   DELETE /api/services/admin/:id
// @access  Private/Admin
const deleteRentProductAdmin = asyncHandler(async (req, res) => {
  const product = await Rent.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getRentProducts,
  getRentProductById,
  deleteRentProduct,
  createRentProduct,
  updateRentProduct,
  getUserPosts,
  deleteRentProductAdmin
}
