import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Client from "../components/Home/Client";
import FilterCard from "../components/Shop/FilterCard";
import Pagination from "../components/Shop/Pagination";
import ShopCard from "../components/Shop/ShopCard";
import ShopNavbar from "../components/Shop/ShopNavbar";
import ShopProductCard from "../components/Shop/ShopProductCard";

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 4 : 12);

  const [pendingCategory, setPendingCategory] = useState("All");
  const [pendingType, setPendingType] = useState("All");
  const [pendingPriceRange, setPendingPriceRange] = useState("All");

  const [sortBy, setSortBy] = useState("Popularity");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState("All");

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 4 : 12);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: products, isLoading } = useQuery({
    queryKey: ["shopProducts"],
    queryFn: async () => {
      const { data } = await axios.get("/data.json");
      return data.productCardSection.productsCard;
    },
    staleTime: 1000 * 60 * 10,
  });

  const handleApplyFilter = () => {
    setActiveCategory(pendingCategory);
    setActiveType(pendingType);
    setActivePriceRange(pendingPriceRange);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setPendingCategory("All");
    setPendingType("All");
    setPendingPriceRange("All");
    setSortBy("Popularity");
    setActiveCategory("All");
    setActiveType("All");
    setActivePriceRange("All");
    setCurrentPage(1);
  };

  const filteredAndSorted = [...(products || [])]
    .filter((product) => {
      const matchCategory =
        activeCategory === "All" ||
        product.category === activeCategory.toLowerCase();
      const matchType =
        activeType === "All" ||
        product.type === activeType.toLowerCase();
      const price = parseFloat(product.price.new);
      const matchPrice =
        activePriceRange === "All" ||
        (activePriceRange === "0-$10" && price <= 10) ||
        (activePriceRange === "$10-$20" && price > 10 && price <= 20) ||
        (activePriceRange === "$20-$50" && price > 20 && price <= 50) ||
        (activePriceRange === "$50+" && price > 50);
      return matchCategory && matchType && matchPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Newest":
          return Number(b.id) - Number(a.id);
        case "Price: Low to High":
          return parseFloat(a.price.new) - parseFloat(b.price.new);
        case "Price: High to Low":
          return parseFloat(b.price.new) - parseFloat(a.price.new);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const currentProducts = filteredAndSorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <ShopNavbar />
      <ShopCard />
      <FilterCard
        totalResults={filteredAndSorted.length}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        pendingCategory={pendingCategory}
        setPendingCategory={setPendingCategory}
        pendingType={pendingType}
        setPendingType={setPendingType}
        sortBy={sortBy}  
        setSortBy={setSortBy}
        pendingPriceRange={pendingPriceRange}
        setPendingPriceRange={setPendingPriceRange}
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
      />
      <ShopProductCard
        products={currentProducts}
        loading={isLoading}
        isGridView={isGridView}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <Client />
    </>
  );
};

export default ShopPage;