import { useEffect, useState } from "react";
import Product from "../product/Product";
import "./Products.css";
import { publicRequest } from "../../useFetch";
import Slide from "react-reveal/Slide";

import { ClipLoader } from "react-spinners";

import { preload } from "swr";

import useSWRImmutable from "swr/immutable";

preload("/products", () =>
  publicRequest
    .get("/products")
    .then((res) => res.data)
    .then((data) => console.log(data))
);

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);

  const { data, error, isLoading } = useSWRImmutable(
    [category ? `/products?category=${category}` : "/products", category],
    () =>
      publicRequest
        .get(category ? `/products?category=${category}` : "/products")
        .then((res) => res.data)
        .then((data) => {
          setProducts(data);
        })
  );
  const [filteredProducts, setFilteredProducts] = useState([]);

  console.log(filteredProducts);
  console.log(filters);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(
            ([key, value]) =>
              value.toLowerCase() === key || item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    // <Bounce bottom>
    <div className="products-container">
      <Slide bottom>
        <h1>Today's Best Deals!</h1>
      </Slide>
      <div className="products-wrapper">
        {isLoading ? (
          <div className="loading-container">
            <ClipLoader color="#36d7b7" />
          </div>
        ) : category ? (
          filteredProducts.map((item) => (
            <div className="products">
              <Product item={item} key={item.id} />
            </div>
          ))
        ) : (
          products?.slice(0, 8).map((item) => (
              <Product item={item} key={item.id} />
          ))
        )}
      </div>
    </div>

    // </Bounce>
  );
};

export default Products;
