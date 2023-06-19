import { Link } from "react-router-dom";
import './CategoryItem.css'


const CategoryItem = ({ item }) => {
  return (
    <div className="catItem-container">

      <Link to={`/products/${item.cat}`}>
      
      <img src={item.img} className="catItem-image"/>

      <div className="catItem-info">
        <div className="catItem-title">
          {item.title}
        </div>
          <button className="catItem-button">SHOP NOW</button>
      </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
