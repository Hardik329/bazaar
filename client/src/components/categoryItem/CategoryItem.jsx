import { Link } from "react-router-dom";
import "./CategoryItem.css";
import Zoom from "react-reveal/Zoom";

const CategoryItem = ({ item }) => {
  return (
    <Zoom>
      <div className="catItem-container">
        <Link to={`/products/${item.cat}`}>
          <img src={item.img} className="catItem-image" alt={item.cat}/>

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
