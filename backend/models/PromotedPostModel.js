import mongoose from 'mongoose'

const PromotePostSchema = mongoose.Schema(
  {
    rentPost :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rent',
        default:null
    },
    servicePost:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaidService',
      default:null,
    },
    price: {
        type: Number,
        required: true
    },
    postType: {
        type: String,
        required: true,
    },
    priceId:{
      type:String,
    },
    isPaid:{
      type:Boolean,
      required:true,
      default:false
    },
    paymentResult: {
      type:String
    },
    name:{
      type:String
    },
    promotedBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  }
)

const Promote = mongoose.model('promote', PromotePostSchema)

export default Promote
