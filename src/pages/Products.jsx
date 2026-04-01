import React, { useEffect, useMemo, useState } from "react";
import { useData } from "../context/DataContext";

import FilterSection from "../components/FilterSection";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import MobileFilter from "../components/MobileFilter";

const Products = () => {
  const { data, fetchAllProducts } = useData();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  // ✅ Fetch once
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // ✅ SAFE FILTERING (no crash)
  const filteredData = useMemo(() => {
  if (!Array.isArray(data)) return [];

  return data.filter((item) => {
    return (
      item.title?.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
    );
  });
}, [data, search, category, brand, priceRange]);
  // ✅ PAGINATION SAFE
  const dynamicPage = Math.ceil((filteredData?.length || 0) / 8);

  // ✅ Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [search, category, brand, priceRange]);

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* 🔥 MOBILE FILTER */}
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          handleBrandChange={(e) => setBrand(e.target.value)}
          handleCategoryChange={(e) => setCategory(e.target.value)}
        />

        <div className="flex gap-8">

          {/* 🔥 SIDEBAR */}
          <div className="hidden md:block w-[260px] sticky top-24 h-fit">
            <FilterSection
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              brand={brand}
              setBrand={setBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          {/* 🔥 MAIN */}
          <div className="flex-1">

            {/* 🔥 TOP BAR */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
              <h2 className="text-xl font-semibold">
                {filteredData.length} Products Found
              </h2>

              <button
                onClick={() => setOpenFilter(true)}
                className="md:hidden bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Filters
              </button>
            </div>

            {/* 🔥 PRODUCTS */}
            {filteredData.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredData
                    .slice(page * 8 - 8, page * 8)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* 🔥 PAGINATION */}
                <div className="mt-10">
                  <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPage={dynamicPage}
                  />
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-[400px]">
                <p className="text-gray-500">No Products Found</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;