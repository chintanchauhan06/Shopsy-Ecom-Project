import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user } = useUser();

  return (
    <>
      {/* 🔥 OVERLAY */}
      {openNav && (
        <div
          onClick={() => setOpenNav(false)}
          className="fixed inset-0 bg-black/40 z-10"
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div
        className={`fixed top-0 bottom-0 z-20 w-[75%] max-w-[300px] bg-white px-6 pt-16 pb-6 flex flex-col justify-between rounded-r-xl shadow-lg transform transition-transform duration-300 ${
          openNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* USER */}
          <div className="flex items-center gap-3 mb-10">
            {user ? <UserButton /> : <FaUserCircle size={45} />}
            <div>
              <h1 className="font-semibold">
                Hello, {user?.firstName || "Guest"}
              </h1>
              <p className="text-sm text-gray-500">
                {user ? "Welcome back" : "Please sign in"}
              </p>
            </div>
          </div>

          {/* NAV LINKS */}
          <nav>
            <ul className="flex flex-col gap-6 text-lg font-medium">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpenNav(false)}
                  className={({ isActive }) =>
                    `transition ${
                      isActive
                        ? "text-red-500 font-semibold"
                        : "text-gray-700 hover:text-red-500"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </ul>
          </nav>
        </div>

        {/* FOOTER */}
        <div className="text-sm text-gray-400">
          © 2026 Shopsy
        </div>
      </div>
    </>
  );
};

export default ResponsiveMenu;