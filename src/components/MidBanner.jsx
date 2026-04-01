import React from "react";
import midbanner from "../assets/midbanner.jpg";

const MidBanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 my-14">

      <div
        className="relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-lg"
        style={{
          backgroundImage: `url(${midbanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-4">

          <div className="text-white max-w-xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">
              Next-Gen Shopping Experience
            </h1>

            <p className="text-gray-300">
              Discover premium products at unbeatable prices with fast delivery.
            </p>

            <button className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-400 transition">
              Explore Now
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default MidBanner;