import React from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png";

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  // ✅ total price
  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">
            My Cart ({cartItem.length})
          </h1>

          {/* CART ITEMS */}
          <div className="mt-10">
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail || item.images?.[0]}
                    alt={item.title}
                    className="w-20 h-20 rounded-md"
                  />

                  <div>
                    <h1 className="md:w-[300px] line-clamp-2">
                      {item.title}
                    </h1>
                    <p className="text-red-500 font-semibold text-lg">
                      ${item.price}
                    </p>
                  </div>
                </div>

                {/* QTY */}
                <div className="bg-red-500 text-white flex gap-4 px-3 py-1 rounded-md font-bold text-lg items-center">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, "decrease")
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, "increase")
                    }
                  >
                    +
                  </button>
                </div>

                {/* DELETE */}
                <FaRegTrashAlt
                  onClick={() => deleteItem(item.id)}
                  className="text-red-500 text-2xl cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* BILL SECTION */}
          <div className="grid md:grid-cols-2 gap-10 mt-10">
            
            {/* DELIVERY */}
            <div className="bg-gray-100 p-6 rounded-md space-y-3">
              <h1 className="font-bold text-xl">Delivery Info</h1>

              <input
                value={user?.fullName || ""}
                readOnly
                className="p-2 rounded-md w-full"
              />

              <input
                value={location?.country || ""}
                readOnly
                className="p-2 rounded-md w-full"
              />

              <button
                onClick={getLocation}
                className="bg-red-500 text-white px-3 py-2 rounded-md w-full"
              >
                Detect Location
              </button>
            </div>

            {/* BILL */}
            <div className="bg-white shadow-xl p-6 rounded-md space-y-3">
              <h1 className="font-bold text-xl">Bill Details</h1>

              <div className="flex justify-between">
                <span>Items Total</span>
                <span>${totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600">FREE</span>
              </div>

              <div className="flex justify-between">
                <span>Handling</span>
                <span>$5</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${totalPrice + 5}</span>
              </div>

              <button className="bg-red-500 text-white w-full py-2 mt-3 rounded-md">
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[500px]">
          <h1 className="text-red-500 text-3xl">Cart is empty</h1>
          <img src={emptyCart} className="w-[300px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-4 py-2 mt-3 rounded-md"
          >
            Shop Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;