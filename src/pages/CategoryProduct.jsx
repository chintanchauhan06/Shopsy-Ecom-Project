import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import { ChevronLeft } from "lucide-react";
import ProductListView from "../components/ProductListView";

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();

  const getFilterData = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`,
      );
      setSearchData(res.data); // ✅ FIXED
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilterData();
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {searchData.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <button
            onClick={() => navigate("/")}
            className="mb-6 flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            <ChevronLeft />
            Back
          </button>

          <div className="space-y-4">
            {searchData.map((product, index) => (
              <ProductListView key={index} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
