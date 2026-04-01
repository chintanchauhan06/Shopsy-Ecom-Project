import React from "react";

const FilterSection = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
}) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md space-y-6">

      {/* SEARCH */}
      <div>
        <h2 className="font-semibold mb-2">Search</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      {/* CATEGORY */}
      <div>
        <h2 className="font-semibold mb-2">Category</h2>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        >
          <option value="All">All</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
        </select>
      </div>

      {/* BRAND */}
      <div>
        <h2 className="font-semibold mb-2">Brand</h2>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        >
          <option value="All">All</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="OPPO">OPPO</option>
        </select>
      </div>

      {/* PRICE */}
      <div>
        <h2 className="font-semibold mb-2">Price Range</h2>

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

        <p className="text-sm mt-1">Up to ${priceRange[1]}</p>
      </div>
    </div>
  );
};

export default FilterSection;