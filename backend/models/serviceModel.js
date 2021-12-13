import mongoose from 'mongoose'

const serviceSchema = mongoose.Schema(
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
    keywords: [String],
    category: {
        type: String,
        required: true,
    },
    noOfTimesEdited : {
        type: Number,
        default: 0
    },
    noOfOrders: {
        type: Number,
        default: 0
    },
    clicks: {
        type: Number,
        default: 0
    },
    serviceType: {
      type: String,
      enum : ['Digital','Physical'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    review: [
        {
            name: {type:String},
            rating: { type: Number },
            comment: { type: String },
            ratedBy: { type : mongoose.Schema.Types.ObjectId, ref: 'User' }
        }
    ],
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
          required: true,
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

const Service = mongoose.model('Services', serviceSchema)

export default Service
