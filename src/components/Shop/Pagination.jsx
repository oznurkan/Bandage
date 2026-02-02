import { useState, useEffect } from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const allPages = [...Array(totalPages)].map((_, i) => i + 1);

    if (!isMobile) return allPages;
    if (currentPage <= 2) {
      return allPages.slice(0, 3);
    }
    if (currentPage >= totalPages - 1) {
      return allPages.slice(totalPages - 4);
    }
    return allPages.slice(currentPage - 2, currentPage + 2);
  };

  const visiblePages = getVisiblePages();
  const showStartDots = isMobile && visiblePages[0] > 1;
  const showEndDots =
    isMobile && visiblePages[visiblePages.length - 1] < totalPages;

  return (
    <div className="flex justify-center items-center my-16 font-montserrat shadow-sm rounded-md w-fit mx-auto border border-[#E8E8E8] overflow-hidden">
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className="px-4 py-3 md:px-6 md:py-4 text-primary-color border-r border-[#E8E8E8] hover:bg-[#F3F3F3] disabled:text-gray-300 font-bold transition-colors cursor-pointer disabled:cursor-not-allowed text-sm md:text-base"
      >
        First
      </button>

      {showStartDots && (
        <span className="px-3 py-3 md:py-4 text-gray-400 border-r border-[#E8E8E8]">
          ...
        </span>
      )}

      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={`px-4 py-3 md:px-5 md:py-4 border-r border-[#E8E8E8] transition-all font-bold text-sm md:text-base ${
            currentPage === pageNumber
              ? "bg-primary-color text-white"
              : "text-primary-color hover:bg-[#F3F3F3] cursor-pointer"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {showEndDots && (
        <span className="px-3 py-3 md:py-4 text-gray-400 border-r border-[#E8E8E8]">
          ...
        </span>
      )}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-3 md:px-6 md:py-4 text-primary-color hover:bg-[#F3F3F3] disabled:text-gray-300 font-bold transition-colors cursor-pointer disabled:cursor-not-allowed text-sm md:text-base"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
