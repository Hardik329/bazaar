// import styled from "styled-components";
import { categories } from "../../data";
// import { mobile } from "../responsive";
import CategoryItem from "../categoryItem/CategoryItem";
import "./Categories.css";
import Slide from "react-reveal/Slide";

const Categories = () => {
  return (
    <div className="categories-container">
      <Slide bottom>
        <h1>Shop by Category</h1>
      </Slide>
      <div className="categories-wrapper">
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
