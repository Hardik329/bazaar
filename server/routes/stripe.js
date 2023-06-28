import express from "express";
const router = express.Router();

import dotenv from 'dotenv'

dotenv.config()
const KEY = process.env.STRIPE_KEY;
import stripeApp from "stripe";

const stripe = stripeApp(KEY);

router.post("/payment", async(req, res) => {
  console.log(req.body);
  // stripe.charges.create(
  //   {
  //     source: req.body.tokenId,
  //     amount: req.body.amount,
  //     currency: "inr",
  //   },
  //   (stripeErr, stripeRes) => {
  //     if (stripeErr) {
  //       console.log(stripeErr);
  //       res.status(500).json(stripeErr);
  //     } else {
  //       res.status(200).json(stripeRes);
  //     }
  //   }
  // );
  // automatic_payment_methods: {enabled: true},
   await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'inr',
    payment_method_types: ['card'],
  },async (stripeErr,stripeRes)=>{
    if(stripeErr){
      res.status(500).json(stripeErr);
      console.log(stripeErr)
    }
    else{
      // res.status(200).json(stripeRes);


      console.log(stripeRes)
      const id = stripeRes.id
      const paymentIntent = await stripe.paymentIntents.confirm(id,{source:req.body.tokenId,payment_method: req.body.token.card.id});
      console.log(paymentIntent);
      res.status(200).json(paymentIntent)
      
    }
  }
  
  );
});


// router.post("/charge", async (req, res) => {
//   var charged;
//   try {
//     charged = await stripe.paymentIntents.create({
//       amount: req.body,
//       currency: "inr",
//       payment_method_types: ["card"],
//     });
//   } catch (err) {
//     return res.status(500).send(err);
//   }

//   console.log(charged);
//   try {
//     const paymentConfirm = await stripe.paymentIntents.confirm(
//       charged.id,
//       { payment_method: "pm_card_visa" }
//     );
//     res.status(200).send(paymentConfirm);
//   } catch (err) {
//     return res.status(500).send(err);
//   }

// });




export default router;
