import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { IoCartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const ProductListView = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ✅ optimized handler
  const handleAddToCart = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col md:flex-row gap-6 items-start">

      {/* IMAGE */}
      <div
        onClick={handleNavigate}
        className="bg-gray-100 rounded-lg p-3 cursor-pointer flex-shrink-0"
      >
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          loading="lazy"
          className="w-[140px] md:w-[200px] h-[140px] md:h-[200px] object-contain hover:scale-105 transition duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 space-y-3">

        {/* TITLE */}
        <h2
          onClick={handleNavigate}
          className="text-lg md:text-xl font-semibold line-clamp-2 cursor-pointer hover:text-red-500 transition"
        >
          {product.title}
        </h2>

        {/* ⭐ RATING */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          {[...Array(4)].map((_, i) => (
            <FaStar key={i} />
          ))}
          <span className="text-gray-500 ml-1">(210 reviews)</span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-4 flex-wrap">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            ${product.price}
          </p>

          <span className="text-green-600 font-medium text-sm">
            {product.discount || 10}% OFF
          </span>
        </div>

        {/* DELIVERY */}
        <p className="text-sm text-gray-600">
          FREE delivery <span className="font-semibold">Tomorrow</span> <br />
          Fastest delivery in <span className="font-semibold">24 hours</span>
        </p>

        {/* ACTION */}
        <button
          onClick={handleAddToCart}
          className="mt-2 bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <IoCartOutline />
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default React.memo(ProductListView);