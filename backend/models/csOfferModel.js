import mongoose from 'mongoose'

const csOfferSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    item :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommunityService',
    },
    collectedFrom : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    collectedBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  }
)

const CSOffer = mongoose.model('csOffer', csOfferSchema)

export default CSOffer
