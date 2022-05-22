import express from "express";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51GvpJkBqTtLhCjZjfCL0xAlkOPdCoDdaLkdpVV1Dkg5qpB12oQqkAn0YgibmK8sdsvSIvV3e4MSYUWyNmSN9QVnL00xrX1AtDJ"
);

var router = express.Router();

router.post("/", async (req, res) => {
  const product = await stripe.products.create({
    name: "Basic Dashboard",
    default_price_data: {
      unit_amount: 1000,
      currency: "usd",
      // recurring: {interval: 'month'},
    },
    expand: ["default_price"],
  });
  console.log(product);
  res.json(product);
});

router.post("/makepayment", async (req, res) => {
  const customer = await stripe.customers.create({
    email: "shujaali1231@gmakkil.com",
    source: "tok_mastercard",
  });
  const token = await stripe.tokens.create(
    {
      customer: customer.id,
    },
    {
      stripeAccount: "acct_1L0UVZBQUuJbLgkA",
    }
  );

  // const c = await stripe.customers.create({
  //   source: token.id,
  // }, {
  //   stripeAccount: 'acct_1L0UVZBQUuJbLgkA',
  // });
  // console.log(c);

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    cancel_at:1661130586,
    items: [
      {
        price: "price_1L1fubBqTtLhCjZjCMQGqKhX",
      },
    ],
    expand: ["latest_invoice.payment_intent"],
    transfer_data: {
      destination: "acct_1L0XjNB9Qn8xnxyH",
    },
  });
  res.json(subscription);
});

router.post("/makepayout", async (req, res) => {
  const payout = await stripe.payouts.create(
    {
      amount: 11800,
      currency: "usd",
      method: "instant",
    },
    {
      stripeAccount: "acct_1L0XjNB9Qn8xnxyH",
    }
  );
  console.log(payout);
  res.json(payout);
});

export default router;
