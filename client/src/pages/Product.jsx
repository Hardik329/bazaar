import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import Newsletter from "../components/newsletter/Newsletter";
import Navbar from "../components/navbar/Navbar";
import Announcement from "../components/announcement/Announcement";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useLocation, useParams } from "react-router-dom";

import "./Product.css";
import { publicRequest } from "../useFetch";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const Product = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState({
    color: ["blue", "red", "green"],
    size: ["5", 6],
    price: 58,
  });
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addToCart({ ...product, quantity, color, size }));
  };
  return (
    <div className="p-container">
      <Navbar />
      <Announcement />
      <div className="p-wrapper">
        <div className="p-img-container">
          <img className="p-image" src={product.img} />
        </div>
        <div className="p-info-container">
          <h1 className="p-title">{product.title}</h1>
          <p className="p-desc">{product.desc}</p>
          <span className="p-price">$ {product.price}</span>
          <div className="p-filter-container">
            <div className="p-filter">
              <span className="p-filter-title">Color</span>
              {product.color?.map((c) => (
                <div
                  className="p-filter-color"
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
            <div className="p-filter">
              <span className="p-filter-title">Size</span>
              <select
                className="p-filter-size"
                onChange={(e) => setSize(e.target.value)}
              >
                {product.size?.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-add-container">
            <div className="p-amount-container">
              <RemoveIcon onClick={() => handleQuantity("dec")} />
              <div className="p-amount">{quantity}</div>
              <AddIcon onClick={() => handleQuantity("inc")} />
            </div>
            <button className="p-button" onClick={handleClick}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Product;