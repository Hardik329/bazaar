import React from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-left">
          <div className="nav-lang">EN</div>
          <div className="nav-search-container">
            <input type="text" className="nav-input" />
            <SearchIcon style={{ color: "gray", fontSize: "16px" }} />
          </div>
        </div>
        <div className="navcenter">
          <Link to="/" style={{ textDecoration: "inherit", color: "inherit" }}>
            <h1 className="nav-logo">BAZAAR</h1>
          </Link>
        </div>
        <div className="nav-right">
          {currentUser ? (
            <div className="logout-container">
              <div className="hello-text"> {`Hello ${currentUser.name}`}</div>
              <div className="logout-menu">
                <div className="logout-text" onClick={() => dispatch(logout())}>
                  LOGOUT
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <div className="nav-menuItem">REGISTER</div>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <div className="nav-menuItem">SIGNIN</div>
              </Link>
            </>
          )}
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <div className="nav-menuItem">
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
