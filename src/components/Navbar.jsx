import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut
} from "@clerk/clerk-react";
import { MapPin } from "lucide-react";
import React, { useState, useCallback } from "react";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { motion } from "framer-motion";

const Navbar = ({ location, getLocation }) => {
  const { cartItem } = useCart();

  const [openNav, setOpenNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = useCallback(() => {
    setOpenDropdown((prev) => !prev);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">

        {/* 🔵 LEFT */}
        <div className="flex items-center gap-6">

          {/* LOGO */}
          <Link to="/">
            <h1 className="font-bold text-2xl md:text-3xl tracking-wide">
              <span className="text-red-500 font-serif">S</span>hopsy
            </h1>
          </Link>

          {/* LOCATION */}
          <div className="hidden md:flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black transition">
            <MapPin className="text-red-500" size={20} />

            <div className="text-sm leading-tight">
              {location ? (
                <>
                  <p className="font-semibold">{location.county}</p>
                  <p className="text-xs text-gray-500">{location.state}</p>
                </>
              ) : (
                <p className="font-medium">Add Address</p>
              )}
            </div>

            <FaCaretDown onClick={toggleDropdown} />
          </div>

          {/* DROPDOWN */}
          {openDropdown && (
            <div className="absolute top-16 left-40 w-64 bg-white shadow-xl border rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg">Change Location</h2>
                <CgClose onClick={toggleDropdown} className="cursor-pointer" />
              </div>

              <button
                onClick={getLocation}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-400"
              >
                Detect my location
              </button>
            </div>
          )}
        </div>

        {/* 🟢 RIGHT */}
        <nav className="flex items-center gap-6">

          {/* MENU */}
          <ul className="hidden md:flex gap-6 items-center font-medium text-[16px]">
            {["/", "/products", "/about", "/contact"].map((path, i) => {
              const names = ["Home", "Products", "About", "Contact"];
              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `relative pb-1 ${
                      isActive
                        ? "text-red-500 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-red-500"
                        : "hover:text-red-500"
                    }`
                  }
                >
                  {names[i]}
                </NavLink>
              );
            })}
          </ul>

          {/* 🔥 CART ANIMATION */}
          <Link to="/cart" className="relative">
            <motion.div
              whileTap={{ scale: 0.8 }}
              animate={
                cartItem.length > 0
                  ? { y: [0, -6, 0] }
                  : {}
              }
              transition={{ duration: 0.4 }}
            >
              <IoCartOutline className="h-7 w-7" />
            </motion.div>

            {cartItem.length > 0 && (
              <motion.span
                key={cartItem.length}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-[2px] rounded-full"
              >
                {cartItem.length}
              </motion.span>
            )}
          </Link>

          {/* AUTH */}
          <div className="hidden md:flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <button className="bg-red-500 text-white px-4 py-1.5 rounded-md">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* MOBILE MENU */}
          <div className="md:hidden">
            {openNav ? (
              <HiMenuAlt3 onClick={() => setOpenNav(false)} />
            ) : (
              <HiMenuAlt1 onClick={() => setOpenNav(true)} />
            )}
          </div>
        </nav>
      </div>

      {/* MOBILE MENU */}
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </header>
  );
};

export default React.memo(Navbar);