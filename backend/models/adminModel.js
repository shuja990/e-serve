import mongoose from 'mongoose'

const complaintsSchema = mongoose.Schema(
    {
        message: { type: String },
        status: { type: String },
        adminMessage: { type: String }
    }, 
    { 
        timestamps: true 
    }
)

const feebackSchema = mongoose.Schema(
    {
        message: { type: String },
        status: { type: String },
        adminMessage: { type: String }
    }, 
    { 
        timestamps: true 
    }
)

const adminSchema = mongoose.Schema(
  {
    complaints: [complaintsSchema],
    feedback: [feebackSchema],
    inAppropriateWords: [String],
    websiteVisits: {
        type: Number,
        default: 0
    },
    numberOfOrders: {
        type: Number,
        default: 0
    },
    numberOfSocialShares: {
        type: Number,
        default: 0
    }
  },
  {
    timestamps: true,
  }
)

const Admin = mongoose.model('AdminSchema', adminSchema)

export default Admin
