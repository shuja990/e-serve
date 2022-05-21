import mongoose from "mongoose";

const PaidServiceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnailImage: {
      type: String,
      required: true,
    },
    images: [String],
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
    noOfUpdates: {
      type: Number,
      required: true,
      default: 0,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    fbShares: {
      type: Number,
      default: 0,
    },
    whatsappShares: {
      type: Number,
      default: 0,
    },
    emailShares: {
      type: Number,
      default: 0,
    },
    twitterShares: {
      type: Number,
      default: 0,
    },
    coordinates: {
      lat: { type: String },
      lon: { type: String },
    },
    serviceType: {
      type: String,
      enum: ["Digital", "Offline"],
    },
    noOfOrders: {
      type: Number,
      default: 0,
    },
    stripeProdId:{
      type:String
    },
    promotedPostPayments: {
      paymentMethod: {
        type: String,
      },
      paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
      paidAt: {
        type: Date,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const PaidService = mongoose.model("PaidService", PaidServiceSchema);

export default PaidService;
