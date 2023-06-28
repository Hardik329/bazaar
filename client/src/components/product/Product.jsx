import { Link } from "react-router-dom";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./Product.css";

const Product = ({ item }) => {
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
          <FavoriteBorderIcon />
        </div>
      </div>
    </div>
  );
};

export default Product;
