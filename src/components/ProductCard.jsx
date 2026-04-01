import React, { useCallback } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaStar, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);

  const flyToCart = (e) => {
    const img = e.currentTarget
      .closest(".group")
      .querySelector("img");

    const cart = document.querySelector("#cart-icon");

    if (!img || !cart) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const clone = img.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.left = imgRect.left + "px";
    clone.style.top = imgRect.top + "px";
    clone.style.width = imgRect.width + "px";
    clone.style.height = imgRect.height + "px";
    clone.style.zIndex = 9999;
    clone.style.transition = "all 0.8s ease-in-out";

    document.body.appendChild(clone);

    setTimeout(() => {
      clone.style.left = cartRect.left + "px";
      clone.style.top = cartRect.top + "px";
      clone.style.width = "20px";
      clone.style.height = "20px";
      clone.style.opacity = "0.5";
    }, 10);

    setTimeout(() => clone.remove(), 800);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-xl shadow group relative overflow-hidden"
    >
      {/* ❤️ WISHLIST */}
      <button
        onClick={() => addToWishlist(product)}
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow z-10"
      >
        <FaHeart className={isWishlisted ? "text-red-500" : "text-gray-400"} />
      </button>

      {/* IMAGE */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="bg-gray-100 aspect-square"
      >
        <img
          src={product.thumbnail || product.images?.[0]}
          className="w-full h-full object-contain p-4"
        />
      </div>

      <div className="p-4">
        <h2 className="font-semibold line-clamp-2">{product.title}</h2>

        <div className="flex text-yellow-500">
          {[...Array(4)].map((_, i) => <FaStar key={i} />)}
        </div>

        <p className="font-bold">${product.price}</p>

        <motion.button
          onClick={(e) => {
            handleAddToCart();
            flyToCart(e);
          }}
          className="w-full mt-2 bg-red-500 text-white py-2 rounded flex items-center justify-center gap-2"
        >
          <IoCartOutline />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;