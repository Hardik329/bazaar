import { Link } from "react-router-dom";

import "./Product.css";

import Heart from "react-animated-heart";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";

import { useState } from "react";
import { ShimmerCircularImage } from "react-shimmer-effects";
import { CDN_URL } from "../../utils/constants.js";

const Product = ({ item }) => {
  
  var isFav = false;
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist);

  const [imgLoading, setImgLoading] = useState(true);

  wishlist.products.forEach((product) => {
    if (product.id === item.id) isFav = true;
  });

  const handleClick = () => {
    if (isFav === false) dispatch(addToWishlist(item));
    else dispatch(removeFromWishlist(item));
  };

  return (
    <div className="product-container">
      <div className="product-icon">
        <div className="heart-icon">
          <Heart isClick={isFav} onClick={handleClick} className="heart" />
        </div>
      </div>
      <Link
        to={`/product/${item.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="product-top">
          <div className="circle"></div>
          <div className="product-image">
            {imgLoading && (
              <ShimmerCircularImage className="product-img" size={250} />
            )}

            <img
              loading="lazy"
              src={CDN_URL + "products/" + item.image_id}
              alt={item.title}
              {...(imgLoading && { style: { opacity: 0 } })}
              className="product-img"
              onLoad={() => setImgLoading(false)}
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
  );
};

export default Product;
