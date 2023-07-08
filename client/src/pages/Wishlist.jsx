import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import Announcement from "../components/announcement/Announcement";
import Footer from "../components/footer/Footer";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Wishlist.css";
import {
  addToWishlist,
  removeFromWishlist,
  setWishlist,
} from "../redux/wishlistSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateWishlist } from "../utils/sync";

const Wishlist = () => {
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const user = useSelector((state) => state.user);

  const currentUser = user?.currentUser;

  const navigate = useNavigate();
  console.log(wishlist);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(setWishlist(currentUser?.wishlist));
  }, []);

  useEffect(() => {
    currentUser &&
      updateWishlist({ user: currentUser, wishlist: wishlist.products });
  }, [wishlist]);

  const dispatch = useDispatch();

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
            <button
              className="wishlist-top-button"
              onClick={() => navigate("/")}
            >
              CONTINUE SHOPPING
            </button>
          )}
          <div className="wishlist-top-texts">
            <span
              className="wishlist-top-text"
              onClick={() => navigate("/cart")}
            >
              Shopping Bag({cart.quantity})
            </span>
            <span
              className="wishlist-top-text"
              onClick={() => navigate("/wishlist")}
            >
              Your Wishlist({wishlist.products.length})
            </span>
          </div>
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
                <div
                  className="wishlist-product-detail"
                  onClick={() => navigate("/product/" + product._id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="wishlist-image"
                    src={product.img}
                    alt={product.title}
                  />
                  <div className="wishlist-details">
                    <span className="wishlist-product-name">
                      {product.title}
                    </span>
                  </div>
                </div>
                <div className="wishlist-price-detail">
                  <div className="product-amount-container">
                    <DeleteIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => dispatch(removeFromWishlist(product))}
                    />
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
