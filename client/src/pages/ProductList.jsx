import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Announcement from "../components/announcement/Announcement";
import Products from "../components/products/Products";
import Newsletter from "../components/newsletter/Newsletter";
import Footer from "../components/footer/Footer";
import { useParams } from "react-router";
import "./ProductList.css";

const ProductList = () => {
  const category = useParams().category;
  const [filters, setFilters] = useState({ color: "Color", size: "Size" });
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [category, filters, sort]);
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <div className="pl-container">
        <Navbar />
        <Announcement />
        <h1 className="pl-title">{category}</h1>
        <div className="pl-filter-container">
          <div className="pl-filter">
            <div className="pl-filter-text">Filter Products:</div>
            <select
              name="color"
              value={filters.color}
              className="pl-select"
              onChange={handleFilters}
            >
              <option disabled>Color</option>
              <option>white</option>
              <option>black</option>
              <option>red</option>
              <option>blue</option>
              <option>yellow</option>
              <option>green</option>
            </select>
            <select
              className="pl-select"
              value={filters.size}
              name="size"
              onChange={handleFilters}
            >
              <option disabled>Size</option>
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>
          <div className="pl-filter">
            <div className="pl-filter-text">Sort Products:</div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="asc">Price (asc)</option>
              <option value="desc">Price (desc)</option>
            </select>
          </div>
        </div>
        <Products category={category} filters={filters} sort={sort} />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default ProductList;
