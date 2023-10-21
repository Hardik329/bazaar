import React, { useEffect, useRef } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import PersonIcon from "@mui/icons-material/Person";
import { setCart } from "../../redux/cartSlice";
import { makeRequest, publicRequest } from "../../useFetch";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const currentUser = user?.currentUser;
  const { userRequest } = makeRequest(currentUser?.accessToken);
  const navigate = useNavigate();

  const searchRef = useRef("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const fetchCart = async () => {
      // console.log("called fetchCart");
      try {
        const res = await userRequest.get("/cart/find/" + currentUser.id);
        if (!res.data) {
          // console.log("Empty state");

          const state = {
            products: [],
            quantity: 0,
            total: 0,
          };

          dispatch(setCart(state));
        } else {
          const cart = res.data;
          // console.log("cart: ", cart);

          const promises = cart.products.map((product) =>
            publicRequest.get("/products/find/" + product.id)
          );

          const arr = await Promise.all(promises);
          const products = arr.map((res, i) => {
            const { id, image_id, desc, title, categories, price } = res.data;
            return {
              id,
              image_id,
              desc,
              title,
              categories,
              price,
              quantity: cart.products[i].quantity,
            };
          });

          const state = {
            products: products,
            quantity: cart.quantity,
            total: cart.total,
          };

          dispatch(setCart(state));
        }
      } catch (error) {
        // console.log(error);
      }
    };

    currentUser && fetchCart();
  }, []);

  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-left">
          <div className="nav-lang">EN</div>
          <div className="nav-search-container">
            <input
              type="text"
              id="search-input"
              aria-label="Search"
              className="nav-input"
              ref={searchRef}
            />
            <SearchIcon
              style={{ color: "black", fontSize: "16px", cursor: "pointer" }}
              onClick={() =>
                searchRef.current.value !== "" &&
                navigate("/products/" + searchRef.current.value)
              }
            />
          </div>
        </div>
        <div className="navcenter">
          <Link to="/" style={{ textDecoration: "inherit", color: "inherit" }}>
            <h1 className="nav-logo">BAZAAR</h1>
          </Link>
        </div>
        <div className="nav-right">
          {/* {currentUser?.isAdmin && (
            <div className="admin" onClick={handleAdmin}>
              Admin
            </div>
          )} */}
          {currentUser ? (
            <div className="logout-container">
              <div className="hello-text">
                <PersonIcon />
              </div>
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
          <Link to="/cart" style={{ textDecoration: "none" }} aria-label="Cart">
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
