import "./Home.css";

import React, { useEffect} from "react";
import Announcement from "../components/announcement/Announcement";
import Categories from "../components/categories/Categories";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Newsletter from "../components/newsletter/Newsletter";
import Products from "../components/products/Products";
import Slider from "../components/slider/Slider";


const Home = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  

  return (
    <div className="home-container">
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
