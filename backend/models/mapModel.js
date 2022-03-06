import mongoose from 'mongoose'

const MapSchema = mongoose.Schema(
  {
    mapItems: {
        rentItems:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'rent'
        },
        communityServiceItems:{
            type: mongoose.Schema.Types.ObjectId,
        ref: 'communityService'
        },
        paidItems:{
            type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        }
        
    },
   
  },
  {
    timestamps: true,
  }
)

const MapService = mongoose.model('Map', CommunityServiceSchema)

export default MapService
