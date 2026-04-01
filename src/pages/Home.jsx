import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import MidBanner from "../components/MidBanner";
import Features from "../components/Features";
// import HomeProducts from "../components/HomeProducts";

// 🔥 small banner
// import smallBanner from "../assets/banner/small-banner.jpg";
import smallbanner from '../assets/small-banner.jpg'
import HomeProducts from "../components/HomeProducts";

const Home = () => {
  return (
    <div className="overflow-x-hidden">

      {/* 🔥 HERO */}
      <Carousel />

      {/* 🔥 MID BANNER */}
      <MidBanner />

      {/* 🔥 SMALL BANNER */}
      <div className="max-w-7xl mx-auto px-4 my-10">
        <img
          src={smallbanner}
          alt="offer"
          className="w-full h-[150px] md:h-[250px] object-cover rounded-xl"
        />
      </div>

      {/* 🔥 TRENDING PRODUCTS */}
      <HomeProducts title="🔥 Trending Products" filterType="trending" />

      {/* 🔥 DEALS SECTION */}
      <HomeProducts title="💸 Best Deals Under $100" filterType="deals" />

      {/* 🔥 FEATURES */}
      <Features />
    </div>
  );
};

export default Home;