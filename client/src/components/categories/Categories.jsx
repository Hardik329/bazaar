// import styled from "styled-components";
import { categories } from "../../data";
// import { mobile } from "../responsive";
import CategoryItem from "../categoryItem/CategoryItem";
import "./Categories.css";

const Categories = () => {
  return (
    <div className="categories-container">
      <h1>Shop by Category</h1>
      <div className="categories-wrapper">
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
