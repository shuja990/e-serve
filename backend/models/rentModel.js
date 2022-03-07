import mongoose from 'mongoose'

const rentSchema = mongoose.Schema(
  {
    title: { 
      type: String,
      required: true,
    },
    price:{
        type: Number,
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
    clicks: {
        type: Number
    },
    isMovable: {
        type: Boolean,
        required: true
    },
    isRented: {
        type: Boolean,
        required: true,
        default: false
    },
    promoted: {
        type: Boolean,
        default: false
    },
    promotionType: {
        type : String,
    },
    socialShares: {
        type: Number
    },
    createdBy : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    coordinates:{
      lat:{type:String},
      lon:{type:String}
    },
    promotedPostPayments: {
      paymentMethod: {
        type: String,
      },
      paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
      paidAt: {
        type: Date,
      },
    }
  },
  {
    timestamps: true,
  }
)

const Rent = mongoose.model('Rent', rentSchema)

export default Rent
