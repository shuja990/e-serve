import mongoose from 'mongoose'

const PaidServiceSchema = mongoose.Schema(
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
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    },
    noOfUpdates: {
      type: Number,
      required: true,
      default: 0
  },
  clicks: {
    type: Number,
    default: 0
},
fbShares: {
  type: Number,
 default: 0
},
whatsappShares: {
type: Number,
default: 0
},
emailShares: {
type: Number,
default: 0
},
twitterShares: {
type: Number,
default: 0
},
    collectedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdBy : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  }
)

const PaidService = mongoose.model('PaidService', PaidServiceSchema)

export default PaidService
