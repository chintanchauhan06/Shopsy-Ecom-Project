import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    setCartItem((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        toast.success("Quantity increased!");
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success("Added to cart!");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, action) => {
    setCartItem((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            let qty = item.quantity;

            if (action === "increase") qty++;
            if (action === "decrease") qty--;

            return qty > 0 ? { ...item, quantity: qty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const deleteItem = (id) => {
    setCartItem((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed!");
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem, // ✅ FIXED
        addToCart,
        updateQuantity,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);