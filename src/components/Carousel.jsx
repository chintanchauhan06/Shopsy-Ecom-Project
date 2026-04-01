import React, { useEffect } from "react";
import { useData } from "../context/DataContext";

// 🔥 Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import Category from "./Category";

const Carousel = () => {
  const { data, fetchAllProducts } = useData();

  useEffect(() => {
    if (!data || data.length === 0) {
      fetchAllProducts();
    }
  }, []);

  return (
    <div>

      {/* 🔥 SWIPER SLIDER */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="h-[500px] md:h-[600px]"
      >
        {data?.slice(0, 3).map((item, index) => (
          <SwiperSlide key={index}>
            
            <div className="h-full flex items-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
              
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4">

                {/* TEXT */}
                <div className="text-white space-y-4">
                  <h3 className="text-red-400 font-semibold">
                    Best Deals Available
                  </h3>

                  <h1 className="text-3xl md:text-5xl font-bold">
                    {item.title}
                  </h1>

                  <p className="text-gray-300 md:w-[500px]">
                    {item.description}
                  </p>

                  <button className="bg-red-500 px-5 py-2 rounded-md">
                    Shop Now
                  </button>
                </div>

                {/* IMAGE */}
                <img
                  src={item.thumbnail || item.images?.[0]}
                  alt={item.title}
                  className="w-[250px] md:w-[450px] object-contain"
                />

              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔥 CATEGORY */}
      <Category />
    </div>
  );
};

export default Carousel;