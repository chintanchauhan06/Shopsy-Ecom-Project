import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WishlistProvider } from "./context/WishlistContext";

import { ClerkProvider } from "@clerk/clerk-react"; // ✅ correct

import { DataProvider } from "./context/DataContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import { ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";

// ✅ correct env usage
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <DataProvider>
          <WishlistProvider>
        <CartProvider>
            <App />

          <ScrollToTop
            color="white"
            smooth
            style={{
              backgroundColor: "#fa2d37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            />

          <ToastContainer position="bottom-right" />
        </CartProvider>
            </WishlistProvider>
      </DataProvider>
    </ClerkProvider>
  </StrictMode>,
);
