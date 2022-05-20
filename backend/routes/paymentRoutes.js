import express from "express";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51GvpJkBqTtLhCjZjfCL0xAlkOPdCoDdaLkdpVV1Dkg5qpB12oQqkAn0YgibmK8sdsvSIvV3e4MSYUWyNmSN9QVnL00xrX1AtDJ"
);

var router = express.Router();

router.post("/", async (req, res) => {
  const product = await stripe.products.create({
    name: 'Basic Dashboard',
    default_price_data: {
      unit_amount: 1000,
      currency: 'usd',
      // recurring: {interval: 'month'},
    },
    expand: ['default_price'],
  });
  console.log(product);
  res.json(product)
});

router.post("/makepayment", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1L0UgoBqTtLhCjZjmfpHum26",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5000/paymentsuccess",
    cancel_url: "http://localhost:5000/failure",
    payment_intent_data: {
      application_fee_amount: 500,
      transfer_data: {
        destination: "acct_1L0XjNB9Qn8xnxyH",
      },
    },
  });
  res.json(session);
});

router.post("/makepayout", async (req, res) => {
  const payout = await stripe.payouts.create({
    amount: 11800,
    currency: 'usd',
    method: 'instant',
  }, {
    stripeAccount: "acct_1L0XjNB9Qn8xnxyH",
  });
  console.log(payout);
  res.json(payout);
});

export default router;
