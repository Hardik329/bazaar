import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import Announcement from "../components/announcement/Announcement";
import Footer from "../components/footer/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./Cart.css";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../useFetch";
import StripeCheckout from "react-stripe-checkout";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

import { CDN_URL } from "../utils/constants";

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const user = useSelector((state) => state.user);
  const currentUser = user?.currentUser;
  const dispatch = useDispatch();

  const { userRequest } = makeRequest(currentUser?.accessToken);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const KEY =
    "pk_test_51MCzfVSCUl7TzaqZOwgokhyicYqLFEoxg7eKJ2o5qHOCdqtFpxXbbhXqYyd4T0wtDiVUVh45HRih3q9SBNtep79i001l3cVmDW";

  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const handleClick = ([operation, product]) => {
    if (operation === "add") {
      dispatch(addToCart({ ...product, quantity: 1 }));
    } else {
      dispatch(removeFromCart(product));
    }
  };

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
          {cart.products.length > 0 && (
            <button className="cart-top-button" onClick={() => navigate("/")}>
              CONTINUE SHOPPING
            </button>
          )}
          <div className="cart-top-texts">
            <span className="cart-top-text" onClick={() => navigate("/cart")}>
              Shopping Bag({cart.quantity})
            </span>
            <span
              className="cart-top-text"
              onClick={() => navigate("/wishlist")}
            >
              Your Wishlist({wishlist.products.length})
            </span>
          </div>
          {cart.products.length > 0 && (
            <button className="cart-top-button" style={topButtonStyle}>
              CHECKOUT NOW
            </button>
          )}
        </div>
        <div className="cart-bottom">
          <Zoom duration={500} cascade>
            <div className="cart-info">
              {cart.products.length === 0 && (
                <>
                  <div className="empty-container">
                    <div className="empty-text">Your bag is empty!</div>
                    <button
                      className="cart-button"
                      style={{ width: "max-content", padding: "12px" }}
                      onClick={() => navigate("/")}
                    >
                      SHOP NOW
                    </button>
                  </div>
                </>
              )}
              {cart.products?.map((product) => (
                <div className="cart-product" key={product.id}>
                  <div
                    className="cart-product-detail"
                    onClick={() => navigate("/product/" + product.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="cart-image"
                      src={CDN_URL + "products/" + product.image_id + ".jpg"}
                      alt={product.title}
                    />
                    <div className="cart-details">
                      <span className="cart-product-name">
                        <b>Product:</b> {product.title}
                      </span>
                      <div
                        className="cart-product-color"
                        style={{ backgroundColor: product.color }}
                      />
                      {product.size && product.size.length !== 0 && (
                        <span className="cart-product-size">
                          <b>Size:</b> {product.size}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="cart-price-detail">
                    <div className="cart-product-amount-container">
                      <AddIcon
                        onClick={() => {
                          handleClick(["add", product]);
                        }}
                      />
                      <div className="cart-product-amount">
                        {product.quantity}
                      </div>

                      <RemoveIcon
                        onClick={() => {
                          handleClick(["remove", product]);
                        }}
                      />
                    </div>
                    <div className="cart-product-price">
                      ₹{" "}
                      {Number(
                        product.price * product.quantity
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}

              <hr className="hr" />
            </div>
          </Zoom>
          <Fade delay={500}>
            {cart.products.length > 0 && (
              <div className="summary">
                <h1 className="summary-title">ORDER SUMMARY</h1>
                <div className="summary-item">
                  <span className="summary-item-text">Subtotal</span>
                  <span className="summary-item-price">
                    ₹ {Number(cart.total).toLocaleString()}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-item-text">Estimated Shipping</span>
                  <span className="summary-item-price">₹ 40</span>
                </div>
                <div className="summary-item">
                  <span className="summary-item-text">Shipping Discount</span>
                  <span className="summary-item-price">₹ -40</span>
                </div>
                <div
                  className="summary-item"
                  style={{ fontSize: "24px", fontWeight: "500" }}
                >
                  <span className="summary-item-text">Total</span>
                  <span className="summary-item-price">
                    ₹ {Number(cart.total).toLocaleString()}
                  </span>
                </div>
                <StripeCheckout
                  name="BAZAAR"
                  image={CDN_URL + "/logos/cartLogo.png"}
                  billingAddress
                  shippingAddress
                  description={`Your total is ₹${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <button className="cart-button">CHECKOUT NOW</button>
                </StripeCheckout>
              </div>
            )}
          </Fade>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
