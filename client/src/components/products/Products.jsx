import { useEffect, useState } from "react";
import Product from "../product/Product";
import "./Products.css";
import { makeRequest, publicRequest } from "../../useFetch";
import Slide from "react-reveal/Slide";

import { ClipLoader } from "react-spinners";

import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "../../redux/wishlistSlice";

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);

  const user = useSelector((state) => state.user);
  const currentUser = user?.currentUser;
  const dispatch = useDispatch();

  const { userRequest } = makeRequest(currentUser?.accessToken);

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
    getProducts();
  }, [category]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const fetchWishlist = async () => {
      console.log("called fetchWishlist");
      try {
        const user = await userRequest.get(
          "/users/currentUser/" + currentUser._id
        );
        console.log(user);
        dispatch(setWishlist(user.data.wishlist));
      } catch (error) {
        console.log(error);
      }
    };

    currentUser && fetchWishlist();
  }, []);

  return (
    // <Bounce bottom>
    <div className="products-container">
      {!category && (
        <Slide bottom>
          <h1>Today's Best Deals!</h1>
        </Slide>
      )}
      <div className="products-wrapper">
        {loading ? (
          <div className="loading-container">
            <ClipLoader color="#36d7b7" />
          </div>
        ) : category ? (
          filteredProducts.map((item) => <Product item={item} key={item.id} />)
        ) : (
          products
            ?.slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)
        )}
      </div>
    </div>

    // </Bounce>
  );
};

export default Products;
