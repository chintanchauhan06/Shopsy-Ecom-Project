import React from "react";
import Carousel from "../components/Carousel";
import MidBanner from "../components/MidBanner";
import Features from "../components/Features";
import HomeProducts from "../components/HomeProducts";
import smallbanner from "../assets/small-banner.jpg";

const Home = () => {
  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <Carousel />

      {/* SMALL PROMO */}
      <div className="max-w-7xl mx-auto px-4 my-12">
        <img
          src={smallbanner}
          alt="offer"
          className="w-full h-[160px] md:h-[260px] object-cover rounded-2xl shadow-md hover:scale-[1.01] transition"
        />
      </div>

      {/* TRENDING */}
      <HomeProducts title="🔥 Trending Products" filterType="trending" />

      {/* MID BANNER */}
      <MidBanner />

      {/* DEALS */}
      <HomeProducts title="💸 Best Deals Under $100" filterType="deals" />

      {/* FEATURES */}
      <Features />
    </div>
  );
};

export default Home;