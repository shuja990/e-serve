import mongoose from 'mongoose'

const feedbackSchema = mongoose.Schema(
  {
    
    title: {
      type: String,
    },
     
    description: {
        type: String,
      },

    feedbackProvider:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      }
  },
  {
    timestamps: true,
  }
)

const Feedback = mongoose.model('feedbacks', feedbackSchema)

export default Feedback
