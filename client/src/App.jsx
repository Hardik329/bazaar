import "./App.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import "./responsive.css";
import Success from "./pages/Success";
import Wishlist from "./pages/Wishlist";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateCart } from "./redux/cartSlice"; 

function App() {
  const user = useSelector(state=>state.user);
  const currentUser = user?.currentUser
  const cart = useSelector(state=>state.cart)
  const dispatch = useDispatch()

  // useEffect(()=>{
  //   currentUser && dispatch(updateCart({userId:currentUser._id,cart:cart}))  
  // },[])



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
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
