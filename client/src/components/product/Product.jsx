import { Link } from "react-router-dom";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Product.css";
import { useState } from "react";

import Heart from "react-animated-heart";

const Product = ({ item }) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <div className="product-container">
      <div className="circle"></div>
      <img src={item.img} alt="" className="product-img" />
      <div className="product-info">
        <div className="product-icon">
          <ShoppingCartOutlinedIcon />
        </div>
        <div className="product-icon">
          <Link to={`/product/find/${item._id}`}>
            <SearchIcon style={{ color: "black" }} />
          </Link>
        </div>
        <div className="product-icon">
          <div className="heart-icon">
            <Heart
              isClick={isFav}
              onClick={() => setIsFav((isFav) => !isFav)}
              className='heart'
            />
        </div>
          </div>
      </div>
    </div>
  );
};

export default Product;
