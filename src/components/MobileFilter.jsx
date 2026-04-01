import React from "react";
import { FaFilter } from "react-icons/fa6";
import { useData } from "../context/DataContext";

const MobileFilter = ({
  openFilter,
  setOpenFilter,
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleBrandChange,
  handleCategoryChange,
}) => {
  const { categoryOnlyData, brandOnlyData } = useData();

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-between items-center md:hidden px-4 p-2 mt-5">
        <h1 className="font-semibold text-xl">Filters</h1>
        <FaFilter onClick={toggleFilter} className="text-gray-800 cursor-pointer" />
      </div>

      {openFilter && (
        <div className="bg-gray-100 p-2 md:hidden">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
          />

          {/* CATEGORY */}
          <h1 className="mt-5 font-semibold text-xl">Category</h1>
          <div className="flex flex-col gap-2 mt-3">
            {categoryOnlyData?.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="radio"
                  checked={category === item}
                  onChange={() => setCategory(item)}
                />
                <span className="uppercase">{item}</span>
              </div>
            ))}
          </div>

          {/* BRAND */}
          <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
          <select
            className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
            value={brand}
            onChange={handleBrandChange}
          >
            <option value="All">All</option>
            {brandOnlyData?.map((item, index) => (
              <option key={index} value={item}>
                {item.toUpperCase()}
              </option>
            ))}
          </select>

          {/* PRICE */}
          <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
          <div className="flex flex-col gap-2">
            <label>
              ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([0, Number(e.target.value)])
              }
              className="w-full"
            />
          </div>

          {/* RESET */}
          <button
            className="bg-red-500 text-white rounded-md px-3 py-1 mt-5"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setBrand("All");
              setPriceRange([0, 5000]);
              setOpenFilter(false);
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
};

export default MobileFilter;