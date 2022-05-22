import mongoose from 'mongoose'

const contractSchema = mongoose.Schema(
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
    price: {
        type: Number,
        required: true
    },
    noOfMonths: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
)

const Offer = mongoose.model('offers', contractSchema)

export default Offer
