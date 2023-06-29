import { Link } from "react-router-dom";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import "./Product.css";
import { useState } from "react";

import Heart from "react-animated-heart";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../redux/wishlistSlice";

const Product = ({ item }) => {
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsFav((isFav) => !isFav);
    dispatch(addToWishlist(item));
  };

  return (
    <div className="product-container">
      <div className="circle"></div>
      <img src={item.img} alt="" className="product-img" />
      <div className="product-info">
        <div className="product-icon">
          <ShoppingCartOutlinedIcon />
        </div>
        <div className="product-icon">
          <Link to={`/product/${item._id}`}>
            <SearchIcon style={{ color: "black" }} />
          </Link>
        </div>
        <div className="product-icon">
          <div className="heart-icon">
            <Heart isClick={isFav} onClick={handleClick} className="heart" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
