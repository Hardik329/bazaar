import "./App.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import "./responsive.css";
import Wishlist from "./pages/Wishlist";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { updateCart } from "./utils/sync";
import { makeRequest } from "./useFetch";

function App() {
  const user = useSelector((state) => state.user);
  const currentUser = user?.currentUser;
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const { userRequest } = makeRequest(currentUser?.accessToken);

  useEffect(() => {
    console.log("Cart: ", cart);
    currentUser &&
      updateCart({
        user: currentUser,
        cart: {
          products: cart.products.map((product) => {
            return {
              id: product.id,
              quantity: product.quantity,
              color: product.color,
              size: product.size,
            };
          }),
          quantity: cart.quantity,
          total: cart.total,
        },
      });
  }, [cart]);

  useEffect(() => {
    // console.log("Wishlist: ", wishlist);
    currentUser &&
      userRequest.put("/users/" + currentUser.id, {
        wishlist: wishlist.products,
      });
  }, [wishlist]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={currentUser ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
