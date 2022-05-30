import mongoose from 'mongoose'

const rentContractSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    rentedItem :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rent',
    },
    rentedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    rentedFrom:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    contractStatus : {
        type: String,
        required: true,
        default: 'Not Started'
    },
    price: {
        type: Number,
        required: true
    },
    noOfMonths: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    priceId:{
      type:String,
    },
    contractImgBuyer:{
      type:String,
      default:"img"
    },
    contractImgSeller:{
      type:String,
      default:"img"

    },
    paymentResult: {
      type:String
    },
  },
  {
    timestamps: true,
  }
)

const RentContract = mongoose.model('RentContract', rentContractSchema)

export default RentContract
