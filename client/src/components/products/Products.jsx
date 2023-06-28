import { useEffect, useState } from "react";
import { popularProducts } from "../../data";
import Product from "../product/Product";
import './Products.css'
import { publicRequest } from "../../useFetch";


const Products = ({ category, filters, sort }) => {
  
  const [products, setProducts] = useState([]);


  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          category
            ? `/products?category=${category}`
            : "/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [category]);

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
      {category
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            // .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
            {popularProducts.map((item)=> <Product item={item} key={item.id} />)}
    </div>
  );
};

export default Products;
