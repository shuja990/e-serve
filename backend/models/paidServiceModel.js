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
    // location: {
    //     type: String,
    //     required: true,
    // },
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
      ref: 'User',
    }
  },
  {
    timestamps: true,
  }
)

const PaidService = mongoose.model('PaidService', PaidServiceSchema)

export default PaidService
