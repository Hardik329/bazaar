import React from "react";
import Announcement from "../components/announcement/Announcement";
import Navbar from "../components/navbar/Navbar";

const Home = () => {
  return (
    <div className="container">
      <Announcement/>
        <Navbar/>
    </div>
  );
};

export default Home;
