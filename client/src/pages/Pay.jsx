import React, { useEffect, useState } from "react";
import "./Pay.css";
import StripeCheckout from "react-stripe-checkout";
import { logo } from "../data";
import axios from "axios";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);

  // const KEY = "pk_test_51MCzfVSCUl7TzaqZOwgokhyicYqLFEoxg7eKJ2o5qHOCdqtFpxXbbhXqYyd4T0wtDiVUVh45HRih3q9SBNtep79i001l3cVmDW"
  const KEY =
    "pk_test_51MCzfVSCUl7TzaqZOwgokhyicYqLFEoxg7eKJ2o5qHOCdqtFpxXbbhXqYyd4T0wtDiVUVh45HRih3q9SBNtep79i001l3cVmDW";

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      console.log(stripeToken.id);
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 500,
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    stripeToken && makeRequest();
    
  }, [stripeToken]);

  return (
    <div className="pay-container">
      <StripeCheckout
        name="Bazaar"
        image={logo}
        billingAddress
        shippingAddress
        description="Description  here"
        amount={500}
        token={onToken}
        stripeKey={KEY}
      >
        <button className="pay-button">Pay Now</button>
      </StripeCheckout>
    </div>
  );
};

export default Pay;
