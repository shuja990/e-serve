import mongoose from 'mongoose'

const webAppVisitSchema = mongoose.Schema(
  {
    
    numOfVisits: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
)

const WebAppVisit = mongoose.model('webVisits', webAppVisitSchema)

export default WebAppVisit
