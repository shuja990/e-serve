import asyncHandler from 'express-async-handler'
import Service from '../models/ServiceModel.js'

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public


const  getServices = asyncHandler(async (req, res) => {

  const services = await Service.find({ })
  res.json({ services })
})

// @desc    Fetch single service
// @route   GET /api/services/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)

  if (service) {
    res.json(service)
  } else {
    res.status(404)
    throw new Error('service not found')
  }
})

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)
  if(req.user._id.toString() == service.createdBy.toString()){
    if (service) {
        await service.remove()
        res.json({ message: 'service removed' })
    } else {
        res.status(404)
        throw new Error('service not found')
    }
  }
  else{
      res.status(401)
      throw new Error('Not authorized')
  }
})

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin

const createService = asyncHandler(async (req, res) => {
    const { title,price,thumbnailImage,images,category,description,keywords,serviceType } = req.body
  const service = new Service({
    title: title,
    price: price,
    createdBy: req.user._id,
    thumbnailImage: thumbnailImage,
    images: images,
    category: category,
    description: description,
    keywords: keywords,
    serviceType: serviceType
  })

  const createdservice = await service.save()
  res.status(201).json(createdservice)
})

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
    const { title,price,thumbnailImage,images,category,description, keywords } = req.body


  const service = await Service.findById(req.params.id)
    if(service.noOfTimesEdited===3){
        res.status(405)
        throw new Error('You cannot edit a post more than 3 times')
    } 
    if(req.user._id.toString() == service.createdBy.toString()){
        if (service) {
            service.title = title
            service.price = price
            service.thumbnailImage = thumbnailImage
            service.images = images
            service.keywords = keywords
            service.category = category
            service.description = description
            service.noOfTimesEdited = service.noOfTimesEdited + 1
        
            const updatedservice = await service.save()
            res.json(updatedservice)
          } else {
            res.status(404)
            throw new Error('service not found')
          }
    }
    else{
      res.status(401)
      throw new Error('Not authorized')

    }
  
})

// @desc    Create new review
// @route   POST /api/services/:id/reviews
// @access  Private
const createserviceReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
  
    const service = await Service.findById(req.params.id)
  
    if (service) {
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        ratedBy: req.user._id,
      }
  
      service.review.push(review)  
      await service.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('service not found')
    }
  })

  const getUserPosts = asyncHandler(async (req, res) => {
    const services = []
    
    const service = await Service.find({createdBy:req.params.id})
      if (service) {
        service.forEach(element => {
          if(req.user._id.toString() == element.createdBy.toString()){
            services.push(service)
        }
        else{
          res.status(401)
          throw new Error('Not authorized')
    
        }
        });
      }
      else {
        res.status(404)
        throw new Error('service not found')
      }
      if(services.length>0){
        res.status(200)
        res.json(services)
      }
      else{
        res.status(404)
        throw new Error('services not found')
      }
})

// @desc    Delete Post
// @route   DELETE /api/services/admin/:id
// @access  Private/Admin
const deleteServiceAdmin = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)

  if (service) {
    await service.remove()
    res.json({ message: 'Service removed' })
  } else {
    res.status(404)
    throw new Error('Service not found')
  }
})
    
export {
  getServices,
  getServiceById,
  deleteService,
  createService,
  updateService,
  createserviceReview,
  getUserPosts,
  deleteServiceAdmin
}
