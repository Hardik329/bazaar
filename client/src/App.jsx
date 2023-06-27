import "./App.css";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { Routes, BrowserRouter, Route,Navigate} from "react-router-dom";
import { Link } from "react-router-dom";
import "./responsive.css";
import Pay from "./pages/Pay";

function App() {

  const user=false
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/login" element={user? <Navigate to='/'/> : <Login/>}/>
            <Route path="/register" element={user? <Navigate to='/'/> : <Register/>}/>
            <Route path="/product/:id" element={<Product />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pay" element={<Pay />} />
            
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
