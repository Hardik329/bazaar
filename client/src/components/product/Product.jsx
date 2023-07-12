import { Link } from "react-router-dom";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import "./Product.css";
import { useState } from "react";

import Heart from "react-animated-heart";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";

import Bounce from "react-reveal/Bounce";
import Zoom from "react-reveal/Zoom";
import Slide from "react-reveal/Slide";

const Product = ({ item }) => {
  var isFav = false;
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist);

  wishlist.products.forEach((product) => {
    if (product._id === item._id) isFav = true;
  });

  const handleClick = () => {
    if (isFav === false) dispatch(addToWishlist(item));
    else dispatch(removeFromWishlist(item));
  };

  return (
    // <Zoom>
    <Slide bottom>
      <div className="product-container">
        <div className="product-icon">
          <div className="heart-icon">
            <Heart isClick={isFav} onClick={handleClick} className="heart" />
          </div>
        </div>
        <Link
          to={`/product/${item._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="product-top">
            <div className="circle"></div>
            <div className="product-image">
              <img
                src={item.img}
                alt=""
                className="product-img"
              />
            </div>
          </div>
          <div className="product-info">
            <div className="product-left">
              <div className="product-title">{item.title}</div>
              <div className="product-desc">{item.desc}</div>
            </div>

            <div className="product-right">
              <div className="product-price">
                <div className="price-a">₹</div>
                <div className="price-b">
                  {Number(item.price).toLocaleString("en-US")}
                </div>
                <div className="price-c"></div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Slide>
  );
};

export default Product;
