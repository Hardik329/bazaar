import { useEffect, useState } from "react";
import { popularProducts } from "../../data";
import Product from "../product/Product";
import "./Products.css";
import useFetch, { publicRequest } from "../../useFetch";

import { TailSpin } from "react-loader-spinner";

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await publicRequest.get(
          category ? `/products?category=${category}` : "/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getProducts()
  }, [category]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
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
    <div className="products-container">
      {loading ? (
        <div className="loading-container">
          <TailSpin
            height="150"
            width="150"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          {category
            ? filteredProducts.map((item) => (
                <Product item={item} key={item.id} />
              ))
            : products
                ?.slice(0, 8)
                .map((item) => <Product item={item} key={item.id} />)}
          {popularProducts.map((item) => (
            <Product item={item} key={item.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Products;
