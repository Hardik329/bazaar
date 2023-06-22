
import { useSelector } from "react-redux";
// import styled from "styled-components";
// import Announcement from "../components/Announcement";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import { mobile } from "../responsive";
// import StripeCheckout from "react-stripe-checkout";
// import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Announcement from "../components/announcement/Announcement";
import Footer from "../components/footer/Footer";
// import { userRequest } from "../requestMethods";
// import { useHistory } from "react-router";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './Cart.css'

// const KEY = process.env.REACT_APP_STRIPE;

// const Container = styled.div``;

// const Wrapper = styled.div`
//   padding: 20px;
//   ${mobile({ padding: "10px" })}
// `;

// const Title = styled.h1`
//   font-weight: 300;
//   text-align: center;
// `;

// const Top = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 20px;
// `;

// const TopButton = styled.button`
//   padding: 10px;
//   font-weight: 600;
//   cursor: pointer;
//   border: ${(props) => props.type === "filled" && "none"};
//   background-color: ${(props) =>
//     props.type === "filled" ? "black" : "transparent"};
//   color: ${(props) => props.type === "filled" && "white"};
// `;

// const TopTexts = styled.div`
//   ${mobile({ display: "none" })}
// `;
// const TopText = styled.span`
//   text-decoration: underline;
//   cursor: pointer;
//   margin: 0px 10px;
// `;

// const Bottom = styled.div`
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ flexDirection: "column" })}
// `;

// const Info = styled.div`
//   flex: 3;
// `;

// const Product = styled.div`
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ flexDirection: "column" })}
// `;

// const ProductDetail = styled.div`
//   flex: 2;
//   display: flex;
// `;

// const Image = styled.img`
//   width: 200px;
// `;

// const Details = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
// `;

// const ProductName = styled.span``;

// const ProductId = styled.span``;

// const ProductColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
// `;

// const ProductSize = styled.span``;

// const PriceDetail = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const ProductAmountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const ProductAmount = styled.div`
//   font-size: 24px;
//   margin: 5px;
//   ${mobile({ margin: "5px 15px" })}
// `;

// const ProductPrice = styled.div`
//   font-size: 30px;
//   font-weight: 200;
//   ${mobile({ marginBottom: "20px" })}
// `;

// const Hr = styled.hr`
//   background-color: #eee;
//   border: none;
//   height: 1px;
// `;

// const Summary = styled.div`
//   flex: 1;
//   border: 0.5px solid lightgray;
//   border-radius: 10px;
//   padding: 20px;
//   height: 50vh;
// `;

// const SummaryTitle = styled.h1`
//   font-weight: 200;
// `;

// const SummaryItem = styled.div`
//   margin: 30px 0px;
//   display: flex;
//   justify-content: space-between;
//   font-weight: ${(props) => props.type === "total" && "500"};
//   font-size: ${(props) => props.type === "total" && "24px"};
// `;

// const SummaryItemText = styled.span``;

// const SummaryItemPrice = styled.span``;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: black;
//   color: white;
//   font-weight: 600;
// `;

const Cart = () => {
  // const cart = useSelector((state) => state.cart);
  const cart=[]
  // const [stripeToken, setStripeToken] = useState(null);
  // const history = useHistory();

  // const onToken = (token) => {
  //   setStripeToken(token);
  // };

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await userRequest.post("/checkout/payment", {
  //         tokenId: stripeToken.id,
  //         amount: 500,
  //       });
  //       history.push("/success", {
  //         stripeData: res.data,
  //         products: cart, });
  //     } catch {}
  //   };
  //   stripeToken && makeRequest();
  // }, [stripeToken, cart.total, history]);

  const topButtonStyle = {
    border: "none",
    backgroundColor: "black",
    color: "white",
  };
  return (
    <div className="cart-container">
      <Navbar />
      <Announcement />
      <div className="cart-wrapper">
        <h1 className="cart-title">YOUR BAG</h1>
        <div className="cart-top">
          <button className="cart-top-button" >
            CONTINUE SHOPPING
          </button>
          <div className="cart-top-texts">
            <span className="cart-top-text">Shopping Bag(2)</span>
            <span className="cart-top-text">Your Wishlist (0)</span>
          </div>
          <button className="cart-top-button" style={topButtonStyle}>
            CHECKOUT NOW
          </button>
        </div>
        <div className="cart-bottom">
          <div className="cart-info">
            {cart.products?.map((product) => (
              <div className="cart-product">
                <div className="cart-product-detail">
                  <img className="cart-image" src={product.img} />
                  <div className="cart-details">
                    <span className="cart-product-name">
                      <b>Product:</b> {product.title}
                    </span>
                    <span className="cart-product-id">
                      <b>ID:</b> {product._id}
                    </span>
                    <div
                      className="cart-product-color"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="cart-product-size">
                      <b>Size:</b> {product.size}
                    </span>
                  </div>
                </div>
                <div className="cart-price-detail">
                  <div className="product-amount-container">
                    <AddIcon />
                    <div className="cart-product-amount">
                      {product.quantity}
                    </div>
                    <RemoveIcon />
                  </div>
                  <div className="cart-product-price">
                    $ {product.price * product.quantity}
                  </div>
                </div>
              </div>
            ))}
            <hr className="hr" />
          </div>
          <div className="summary">
            <h1 className="summary-title">ORDER SUMMARY</h1>
            <div className="summary-item">
              <span className="summary-item-text">Subtotal</span>
              <span className="summary-item-price">$ {cart.total}</span>
            </div>
            <div className="summary-item">
              <span className="summary-item-text">Estimated Shipping</span>
              <span className="summary-item-price">$ 5.90</span>
            </div>
            <div className="summary-item">
              <span className="summary-item-text">Shipping Discount</span>
              <span className="summary-item-price">$ -5.90</span>
            </div>
            <div
              className="summary-item"
              style={{ fontSize: "24px", fontWeight: "500" }}
            >
              <span className="summary-item-text">Total</span>
              <span className="summary-item-price">$ {cart.total}</span>
            </div>
            {/* <StripeCheckout
              name="Hardik Aggarwal"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            > */}
              <button className="cart-button">CHECKOUT NOW</button>
            {/* </StripeCheckout> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
