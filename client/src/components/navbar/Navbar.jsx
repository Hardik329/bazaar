import React from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="wrapper">
        <div className="left">
          <div className="lang">EN</div>
          <div className="searchContainer">
            <input type="text" className="input" />
            <SearchIcon style={{color:"gray",fontSize:"16px"}}/>
          </div>
        </div>
        <div className="center">
          <h1 className="logo">BAZAAR</h1>
        </div>
        <div className="right">

          <div className="menuItem">REGISTER</div>
          <div className="menuItem">SIGNIN</div>
          <div className="menuItem">
            <Badge badgeContent={4} color="primary">
               <ShoppingCartOutlinedIcon/>
               
            </Badge>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
