import React from "react";
import { useData } from "../context/DataContext";
import ProductCard from "./ProductCard";

const HomeProducts = ({ title, filterType }) => {
  const { data } = useData();

  // 🔥 Filter logic
  let filteredProducts = [];

  if (filterType === "trending") {
    filteredProducts = data?.slice(0, 8); // first 8 products
  }

  if (filterType === "deals") {
    filteredProducts = data
      ?.filter((item) => item.price < 100) // cheap products
      .slice(0, 8);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 my-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{title}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeProducts;