import { Link } from "react-router-dom";
import "./CategoryItem.css";
import Zoom from "react-reveal/Zoom";
import { CDN_URL } from "../../utils/constants";

const CategoryItem = ({ item }) => {
  return (
    <Zoom>
      <div className="catItem-container">
        <Link to={`/products/${item.cat}`}>
          <img src={CDN_URL + "/categories/" + item.cat} className="catItem-image" loading="eager" alt={item.cat} fetchpriority="high"  />

          <div className="catItem-info">
            <div className="catItem-title" style={item.style}>{item.title}</div>
            <button className="catItem-button">SHOP NOW</button>
          </div>
        </Link>
      </div>
    </Zoom>
  );
};

export default CategoryItem;
