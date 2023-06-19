// import styled from "styled-components";
import { categories } from "../../data";
// import { mobile } from "../responsive";
import CategoryItem from "../categoryItem/CategoryItem";
import './Categories.css'



const Categories = () => {
  return (
    <div className="categories-container">
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}

    </div>
  );
};

export default Categories;
