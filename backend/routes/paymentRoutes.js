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
  // const customer = await stripe.customers.create({
  //   email: "shujaali1231@gmakkil.com",
  //   source: "tok_mastercard",
  // });
  // const token = await stripe.tokens.create(
  //   {
  //     customer: customer.id,
  //   },
  //   {
  //     stripeAccount: "acct_1L0UVZBQUuJbLgkA",
  //   }
  // );

  const customer = await stripe.customers.create({
    email: "aQ@gmcc.com",
    source: "tok_mastercard",
  });
  // console.log(c);
  const token = await stripe.tokens.create(
    {
      customer: customer.id,
      card:customer.default_source
    }, 
    {
      stripeAccount: 'acct_1L2RHEPk8AscI1sJ',
    }
  );
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    cancel_at:1661130586,
    items: [
      {
        price: "price_1L2NvTBqTtLhCjZjqax8HEQ6",
      },
    ],
    expand: ["latest_invoice.payment_intent"],
    transfer_data: {
      destination: "acct_1L2GGiPmMtL2CkuK",
    },
  });
  const charges = await stripe.charges.list({
  });
  let cs = []
  charges.data.forEach(element => {
    if(element.payment_intent===subscription.paymentIntent){
      cs.push(element)
    }
  });
  console.log(cs);
  res.json(subscription);
  // let cs = []
  // const invoices = await stripe.invoices.list({
  // });
  //   invoices.data.forEach(element => {
  //   if(element.subscription==='sub_1L3pXFBqTtLhCjZjbeWuR1QE'){
  //     cs.push(element)
  //   }
  // });
  // console.log(cs);
  // const refund = await stripe.refunds.create({
  //   charge: 'ch_3L2TsPBqTtLhCjZj1W2OefW6',
  //   reverse_transfer: true,
  // });
  // res.json(cs)

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
