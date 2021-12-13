import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email, 
      isAdmin: user.isAdmin,
      contact: user.contact,
      cnic: user.cnic,
      favorites: user.favorites,
      itemsRented: user.itemsRented,
      itemsRentedOut : user.itemsRentedOut,
      collectionRequestsSent: user.collectionRequestsSent,
      itemsCollected: user.itemsCollected,
      servicesOrdered: user.servicesOrdered,
      paymentDetails: user.paymentDetails,
      address: user.address,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, contact, cnic, address} = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    contact,
    cnic,
    contact,
    address
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email, 
      isAdmin: user.isAdmin,
      contact: user.contact,
      cnic: user.cnic,
      favorites: user.favorites,
      itemsRented: user.itemsRented,
      itemsRentedOut : user.itemsRentedOut,
      collectionRequestsSent: user.collectionRequestsSent,
      itemsCollected: user.itemsCollected,
      servicesOrdered: user.servicesOrdered,
      paymentDetails: user.paymentDetails,
      address: user.address,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email, 
      isAdmin: user.isAdmin,
      contact: user.contact,
      cnic: user.cnic,
      favorites: user.favorites,
      itemsRented: user.itemsRented,
      itemsRentedOut : user.itemsRentedOut,
      collectionRequestsSent: user.collectionRequestsSent,
      itemsCollected: user.itemsCollected,
      servicesOrdered: user.servicesOrdered,
      paymentDetails: user.paymentDetails,
      address: user.address
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if(req.user._id.toString() !== req.params.id)
  {
    res.status(401)
    throw new Error('Not authorized')
  }
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.contact = req.body.contact || user.contact
    user.cnic = user.cnic
    user.address = req.body.address || user.address
    user.paymentDetails = req.body.paymentDetails || user.paymentDetails
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email, 
      isAdmin: updatedUser.isAdmin,
      contact: updatedUser.contact,
      cnic: updatedUser.cnic,
      favorites: updatedUser.favorites,
      itemsRented: updatedUser.itemsRented,
      itemsRentedOut : updatedUser.itemsRentedOut,
      collectionRequestsSent: updatedUser.collectionRequestsSent,
      itemsCollected: updatedUser.itemsCollected,
      servicesOrdered: updatedUser.servicesOrdered,
      paymentDetails: updatedUser.paymentDetails,
      address: updatedUser.address,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/User
const deleteUser = asyncHandler(async (req, res) => {
  if(req.user._id.toString() !== req.params.id)
  {
    res.status(401)
    throw new Error('Not authorized')
  }
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const addTofavorites = asyncHandler(async(req,res) => {
  const { type } = req.body
  const user = await User.findById(req.user._id)
  if(user){
    if(type === 'Service'){
      user.serviceFavorites.push(req.params.id)
      const a = await user.save()
      res.status(200)
      res.json(a)
    }
    else if(type === 'CommunityService'){
      user.communityFavorites.push(req.params.id)
      const a = await user.save()
      res.status(200)
      res.json(a)
    }
    else if(type === 'Rent'){
      user.rentFavorites.push(req.params.id)
      const a = await user.save()
      res.status(200)
      res.json(a)
    }

  }
  else {
    res.status(404)
    throw new Error('User not found')
  }
})

const removeFromFavorites = asyncHandler(async(req,res) => {
  const { type } = req.body
  const user = await User.findById(req.user._id)
  if(user){
    if(type==='Service'){
      let filtered = user.serviceFavorites.filter(e => e._id.toString() == req.params.id.toString())
      user.serviceFavorites = filtered
      let a = await user.save()
      res.status(200)
      res.json(a)
    }
    else if(type==='CommunityService'){
      let filtered = user.communityFavorites.filter(e => e._id.toString() !== req.params.id.toString())
      user.communityFavorites = filtered
      let a = await user.save()
      res.status(200)
      res.json(a)
    }
    else if(type==='Rent'){
      let filtered = user.rentFavorites.filter(e => e._id.toString() == req.params.id.toString())
      user.rentFavorites = filtered
      let a = await user.save()
      res.status(200)
      res.json(a)
    }

  }
  else {
    res.status(404)
    throw new Error('User not found')
  }
})

const getFavorites = asyncHandler(async(req,res) => {
  let favorites = []
  const service = await User.
  find().
  populate('serviceFavorites').
  exec()
  service.forEach(e => {
    favorites.push(e.serviceFavorites)
  })
  const community = await User.
  find().
  populate('communityFavorites').
  exec()
  community.forEach(e => {
    favorites.push(e.communityFavorites)
  })
  const rent = await User.
  find().
  populate('rentFavorites').
  exec()
  rent.forEach(e => {
    favorites.push(e.rentFavorites)
  })
  res.status(200)
  res.json(favorites)

})

const createUserReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const user = await User.findById(req.params.id)

  if (user) {

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      ratedBy: req.user._id,
    }

    user.review.push(review)  
    await user.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUserAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const addAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.isAdmin = true
    user.save()
    res.json({ message: 'User added as admin' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  deleteUserAdmin,
  getFavorites,
  removeFromFavorites,
  addTofavorites,
  createUserReview,
  addAdmin
}
