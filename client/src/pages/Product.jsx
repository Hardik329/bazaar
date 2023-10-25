import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import Newsletter from "../components/newsletter/Newsletter";
import Navbar from "../components/navbar/Navbar";
import Announcement from "../components/announcement/Announcement";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";

import "./Product.css";
import { publicRequest } from "../useFetch";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import {
  ShimmerText,
  ShimmerThumbnail,
  ShimmerTitle,
} from "react-shimmer-effects";
import { CDN_URL } from "../utils/constants";

const Product = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id); // returns an array of requested products
        setProduct(res.data[0]);
        // console.log(res.data[0])
        setLoading(false);
      } catch (err) {
        // console.log(err);
      }
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
          {imgLoading && <ShimmerThumbnail height={500} />}
          <img
            className="p-image"
            src={CDN_URL + "products/" + product?.image_id}
            alt={product?.title}
            style={{ display: imgLoading ? "none" : "block" }}
            onLoad={() => setImgLoading(false)}
          />
        </div>
        <div className="p-info-container">
          <h1 className="p-title">
            {loading ? <ShimmerTitle line={1} /> : product?.title}
          </h1>
          <p className="p-desc">
            {loading ? <ShimmerText line={5} /> : product?.desc}
          </p>

          {!loading && (
            <span className="p-price">
              <span style={{ fontWeight: "100", fontStyle: "Roboto Mono" }}>
                ₹
              </span>{" "}
              {Number(product?.price).toLocaleString()}
            </span>
          )}
          {!loading && (
            <div className="p-filter-container">
              {product?.color.length > 0 && (
                <div className="p-filter">
                  <span className="p-filter-title">Color</span>
                  {product?.color?.map((c) => (
                    <div
                      className="p-filter-color"
                      key={c}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              )}
              {product?.size.length > 0 && (
                <div className="p-filter">
                  <span className="p-filter-title">Size</span>
                  <select
                    className="p-filter-size"
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {product?.size?.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
          {!loading && (
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
          )}
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Product;
