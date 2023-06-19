import React from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-left">
          <div className="nav-lang">EN</div>
          <div className="nav-search-container">
            <input type="text" className="nav-input" />
            <SearchIcon style={{color:"gray",fontSize:"16px"}}/>
          </div>
        </div>
        <div className="navcenter">
          <h1 className="nav-logo">BAZAAR</h1>
        </div>
        <div className="nav-right">

          <div className="nav-menuItem">REGISTER</div>
          <div className="nav-menuItem">SIGNIN</div>
          <div className="nav-menuItem">
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
