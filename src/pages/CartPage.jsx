import React, { useMemo } from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  // ✅ Total price
  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cart]);

  return (
    <div className="max-w-6xl mx-auto p-5">

      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty 🛒</h2>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white p-4 rounded-lg shadow"
              >
                <img
                  src={item.thumbnail}
                  className="w-24 h-24 object-contain"
                />

                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-green-600">${item.price}</p>

                  {/* QTY */}
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT */}
          <div className="bg-white p-5 rounded-lg shadow h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <p className="flex justify-between">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </p>

            <button className="bg-red-500 text-white w-full mt-4 py-2 rounded">
              Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartPage;