import mongoose from 'mongoose'

const conflictEvidence = mongoose.Schema(
  {
    message: { type: String },
    sentBy: {
    name: { type: String },
    id: { type: mongoose.Schema.Types.ObjectId }
    }
  }, 
  { 
      timestamps: true 
  }
)
const disputeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    disputeType:{
        type: String,
        required: true,
    },
    isOpened: {
      type: Boolean,
      required: true,
      default: true
    },
    disputeService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      default: null
    },
    disputeRent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RentContract',
        default: null
      },
      disputeOrderId:{
      type: String,
      default: null
      },
      disputeStatus: {
      type: String,
      required: true,
      default: 'InProgress',
    },
    buyerEvidence:{
      type: String,
     
      default: null
    },
    sellerEvidence:{
      type: String,
      
      default: null

    },
    disputeCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    disputeCreatedAgainst: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  adminResponse:{
    type: String,
   
    default: null
  },
  // disputeAgainstOrder:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Order"
  // }
  },
  {
    timestamps: true,
  }
)

const Dispute = mongoose.model('Disputes', disputeSchema)

export default Dispute
