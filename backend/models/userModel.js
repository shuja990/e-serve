import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    contact:{
      type:Number,
      required: true,
      unique:true
    },
    cnic: {
      type: Number,
      required: true,
      unique: true
    },
    rentFavorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rent'
      }
    ],
    communityFavorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommunityService'
      }
    ],
    serviceFavorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Services'
      }
    ],
    itemsRented: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rent',
      }
    ],
    itemsRentedOut: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rent',
      }
    ],
    collectionRequestsSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommunityService',
      }
    ],
    itemsCollected: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommunityService',
      }
    ],
    servicesOrdered: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Services'
      }
    ],
    paymentDetails: {
      type: String
    },
    paymentsEnabled:{
      type: Boolean,
      default: false
    },
    address: { type: String },
    isDisputeResolutionStaff: {
      type: String,
      default: false
    },
    review: [
      {
          name: {type:String},
          rating: { type: Number },
          comment: { type: String },
          ratedBy: { type : mongoose.Schema.Types.ObjectId, ref: 'User' }
      }
    ]
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
