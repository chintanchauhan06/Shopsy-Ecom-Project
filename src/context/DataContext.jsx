import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // ✅ Fetch products
  const fetchAllProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const json = await res.json();
      setData(json.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // ✅ Unique categories
  const categoryOnlyData = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
  ];

  // ✅ Unique brands
  const brandOnlyData = ["Apple", "Samsung", "OPPO"];

  return (
    <DataContext.Provider
      value={{
        data,
        fetchAllProducts,
        categoryOnlyData,
        brandOnlyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// ✅ THIS IS THE FIX YOU WERE MISSING
export const useData = () => {
  return useContext(DataContext);
};