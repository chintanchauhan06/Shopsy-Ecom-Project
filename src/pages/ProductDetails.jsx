import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useCart } from "../context/CartContext";
import Reviews from "../components/Reviews";

const ProductDetails = () => {
  const { id } = useParams();
  const { data } = useData();
  const { addToCart } = useCart();

  const product = useMemo(() => {
    return data?.find((item) => item.id === Number(id));
  }, [data, id]);

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (product) {
      setMainImage(product.thumbnail || product.images?.[0]);
    }
  }, [product]);

  if (!product) return <h1>Loading...</h1>;

  return (
    <div className="max-w-6xl mx-auto p-5">

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img src={mainImage} className="w-full h-[400px] object-contain" />

          <div className="flex gap-3 mt-3">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setMainImage(img)}
                className="w-20 h-20 cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-green-600 text-xl">${product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className="bg-red-500 text-white px-6 py-2 mt-5"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Reviews productId={product.id} />
    </div>
  );
};

export default ProductDetails;