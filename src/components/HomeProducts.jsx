import React, { useMemo } from "react";
import { useData } from "../context/DataContext";
import ProductCard from "./ProductCard";

const HomeProducts = ({ title, filterType }) => {
  const { data } = useData();

  const filteredProducts = useMemo(() => {
    if (!data) return [];

    if (filterType === "trending") {
      return data.slice(0, 8);
    }

    if (filterType === "deals") {
      return data.filter((item) => item.price < 100).slice(0, 8);
    }

    return [];
  }, [data, filterType]);

  return (
    <div className="max-w-7xl mx-auto px-4 my-14">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <button className="text-red-500 font-medium hover:underline">
          View All →
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

    </div>
  );
};

export default React.memo(HomeProducts);