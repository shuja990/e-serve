import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cors from 'cors'
import rentRoutes from './routes/rentRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import communityServiceRoutes from './routes/communityServiceRoutes.js'
import serviceRoutes from './routes/servicesRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import paidServiceRoutes from './routes/paidServiceRoutes.js'
import webAppVisitRoutes from './routes/webAppVisitRoutes.js'
import disputeRoutes from './routes/disputeRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import rentContractRoutes from './routes/rentContractRoutes.js'
import offerRoutes from './routes/offerRoutes.js'
import promotedRoutes from './routes/promotedPostRoutes.js'
import { deletePosts } from './controllers/promotedPostController.js'
import Stripe from "stripe";


dotenv.config()
connectDB()

const app = express()
app.use(cors())
export const stripe = new Stripe(
  "sk_test_51GvpJkBqTtLhCjZjfCL0xAlkOPdCoDdaLkdpVV1Dkg5qpB12oQqkAn0YgibmK8sdsvSIvV3e4MSYUWyNmSN9QVnL00xrX1AtDJ"
);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
// deletePosts()
app.use(express.json())
app.use(express.urlencoded()); //chat


// twilio delete later

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
// const twilioClient = require('twilio')(accountSid, authToken);

app.use('/api/rent', rentRoutes)
app.use('/api/users', userRoutes)
app.use('/api/communityservice', communityServiceRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/paidservice', paidServiceRoutes)
app.use('/api/offers', offerRoutes)
app.use('/api/promote', promotedRoutes)

app.use('/api/admin', adminRoutes)

// web app visits routes
app.use('/api/visits', webAppVisitRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/rentcontract', rentContractRoutes)


// dispute
app.use('/api/dispute', disputeRoutes)





const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
