import React, { useEffect, useMemo } from "react";
import { useData } from "../context/DataContext";
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
  }, [data, fetchAllProducts]);

  // ✅ FIX: Ensure enough slides for loop
  const slides = useMemo(() => {
    if (!data) return [];

    let items = data.slice(0, 5);

    if (items.length < 5) {
      items = [...items, ...items]; // duplicate
    }

    return items;
  }, [data]);

  return (
    <div className="bg-white">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={slides.length > 3} // ✅ safe loop
        className="h-[480px] md:h-[600px]"
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            
            <div className="h-full flex items-center bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900">

              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6">

                {/* TEXT */}
                <div className="text-white space-y-5 max-w-xl">
                  <h3 className="text-red-400 font-semibold">
                    Limited Offer
                  </h3>

                  <h1 className="text-3xl md:text-5xl font-bold">
                    {item.title}
                  </h1>

                  <p className="text-gray-300">
                    {item.description?.slice(0, 100)}...
                  </p>

                  <button className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-400">
                    Shop Now
                  </button>
                </div>

                {/* IMAGE */}
                <img
                  src={item.thumbnail || item.images?.[0]}
                  alt={item.title}
                  className="w-[250px] md:w-[420px] object-contain"
                />

              </div>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      <Category />
    </div>
  );
};

export default React.memo(Carousel);