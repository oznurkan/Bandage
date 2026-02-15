import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom"; 
import { getProducts } from "../store/actions/productActions";

import Client from "../components/Home/Client";
import FilterCard from "../components/Shop/FilterCard";
import Pagination from "../components/Shop/Pagination";
import ShopCard from "../components/Shop/ShopCard";
import ShopNavbar from "../components/Shop/ShopNavbar";
import ShopProductCard from "../components/Shop/ShopProductCard";

const ShopPage = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { productList: products, fetchState, total } = useSelector((state) => state.product);

  const [filter, setFilter] = useState(searchParams.get("filter") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [isGridView, setIsGridView] = useState(true);
  
  const [limit, setLimit] = useState(window.innerWidth < 1280 ? 24 : 25);

  useEffect(() => {
    const params = {};
    if (filter) params.filter = filter;
    if (sort) params.sort = sort;
    if (currentPage > 1) params.page = currentPage;

    setSearchParams(params);
  }, [filter, sort, currentPage, setSearchParams, categoryId]);

  useEffect(() => {
    const offset = (currentPage - 1) * limit;

    const apiSort = sort ? sort.replace("-", ":") : "";
    dispatch(getProducts(categoryId, filter, apiSort, limit, offset));
    window.scrollTo({ top: 750, behavior: "smooth" });
  }, [dispatch, categoryId, filter, sort, currentPage, limit]);

  
  useEffect(() => {
    const handleResize = () => {
      const newLimit = window.innerWidth < 1280 ? 24 : 25;
      setLimit((prevLimit) => {
        if (prevLimit !== newLimit) {
          setCurrentPage(1); 
          return newLimit;
        }
        return prevLimit;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((newSort) => {
    setSort(newSort);
    setCurrentPage(1);
  }, []);

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <ShopNavbar />
      <ShopCard />
      <FilterCard
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        totalResults={total}
        filter={filter}
        setFilter={handleFilterChange}
        sort={sort}
        setSortBy={handleSortChange}
      />

      <main className="min-h-100">
        {fetchState === "FETCHING" ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color"></div>
          </div>
        ) : fetchState === "FAILED" ? (
          <div className="flex justify-center py-20">
            <p className="text-red-500">Failed to load products. Please try again.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center py-20">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <ShopProductCard products={products} isGridView={isGridView} />
        )}

        {total > 0 && (
          <div className="flex justify-center py-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </main>
      
      <Client />
    </>
  );
};

export default ShopPage;