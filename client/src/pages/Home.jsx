import React, { useEffect } from "react";
import Announcement from "../components/announcement/Announcement";
import Categories from "../components/categories/Categories";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Newsletter from "../components/newsletter/Newsletter";
import Products from "../components/products/Products";
import Slider from "../components/slider/Slider";
import {userRequest} from '../useFetch.js'

import axios from 'axios'
import {products} from '../large_data.js'

const Home = () => {
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    const addData = async () => {
      for(let i=3000;i<=3000;i+=40){
        const product = products[i];
      try{
        const res = await userRequest.post("/products", {
          title:product.title,
          desc:product.description,
          size:['S','M','L','XL'],
          color:['red','maroon','black','blue','grey','brown','beige'],
          img:product.images[0],
          price:Number(product.actual_price.replace(/,/g, '')),
          category:product.sub_category
        });
        console.log(res.data)
      }

      catch(err){
        console.log(err)

      }
      }
      
    };
    // addData();
  }, []);

  
  return (
    <div className="container">
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
