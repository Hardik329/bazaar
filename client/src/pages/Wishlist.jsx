import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import Announcement from "../components/announcement/Announcement";
import Footer from "../components/footer/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./Wishlist.css";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const dispatch = useDispatch();


  const handleClick = ([operation, product]) => {
    if (operation === "add") {
      dispatch(addToWishlist({ ...product, quantity: 1 }));
    } else {
      dispatch(removeFromWishlist(product));
    }
  };

  const topButtonStyle = {
    border: "none",
    backgroundColor: "black",
    color: "white",
  };

  return (
    <div className="wishlist-container">
      <Navbar />
      <Announcement />
      <div className="wishlist-wrapper">
        <h1 className="wishlist-title">WISHLIST</h1>
        <div className="wishlist-top">
          {wishlist.products.length > 0 && (
            <button className="wishlist-top-button" onClick={() => navigate("/")}>
              CONTINUE SHOPPING
            </button>
          )}
          <div className="wishlist-top-texts">
            <span className="wishlist-top-text" onClick={()=>navigate('/cart')}>Shopping Bag({wishlist.quantity})</span>
            <span className="wishlist-top-text" onClick={()=>navigate('/wishlist')}>Your Wishlist(0)</span>
          </div>
          {wishlist.products.length > 0 && (
            <button className="wishlist-top-button" style={topButtonStyle}>
              CHECKOUT NOW
            </button>
          )}
        </div>
        <div className="wishlist-bottom">
          <div className="wishlist-info">
            {wishlist.products.length === 0 && (
              <>
                <div className="empty-container">
                  <div className="empty-text">Your wishlist is empty!</div>
                  <button
                    className="wishlist-button"
                    style={{ width: "max-content", padding: "12px" }}
                    onClick={() => navigate("/")}
                  >
                    SHOP NOW
                  </button>
                </div>
              </>
            )}
            {wishlist.products?.map((product) => (
              <div className="wishlist-product">
                <div className="wishlist-product-detail">
                  <img
                    className="wishlist-image"
                    src={product.img}
                    alt={product.title}
                  />
                  <div className="wishlist-details">
                    <span className="wishlist-product-name">
                      <b>Product:</b> {product.title}
                    </span>
                    <span className="wishlist-product-id">
                      <b>ID:</b> {product._id}
                    </span>
                    <div
                      className="wishlist-product-color"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="wishlist-product-size">
                      <b>Size:</b> {product.size}
                    </span>
                  </div>
                </div>
                <div className="wishlist-price-detail">
                  <div className="product-amount-container">
                    <AddIcon
                      onClick={() => {
                        handleClick(["add", product]);
                      }}
                    />
                    <div className="wishlist-product-amount">
                      {product.quantity}
                    </div>

                    <RemoveIcon
                      onClick={() => {
                        handleClick(["remove", product]);
                      }}
                    />
                  </div>
                  <div className="wishlist-product-price">
                    $ {product.price * product.quantity}
                  </div>
                </div>
              </div>
            ))}
            <hr className="hr" />
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
