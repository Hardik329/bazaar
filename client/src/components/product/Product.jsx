import { Link } from "react-router-dom";
import styled from "styled-components";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import './Product.css'

// const Container = styled.div`
//   flex: 1;
//   margin: 5px;
//   min-width: 280px;
//   height: 350px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #f5fbfd;
//   position: relative;

//   &:hover ${Info} {
//     opacity: 1;
//   }
// `;

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
          <Link to={`/product/${item._id}`}>
            <SearchIcon style={{color:"black"}}/>
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
