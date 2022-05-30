import mongoose from 'mongoose'

const CommunityServiceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnailImage : {
      type: String,
      required: true,
    },
    images : [String],
    location: {
        type: String,
        required: true,
    },
    coordinates:{
      lat:{type:String},
      lon:{type:String}
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    },
    collectedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdBy : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
  }
)
const CoordinatesSchema = mongoose.Schema(
  {
    lat:{type:String},
  }
)
const CommunityService = mongoose.model('CommunityService', CommunityServiceSchema)

export default CommunityService
