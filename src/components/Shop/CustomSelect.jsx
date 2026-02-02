import { useState } from "react";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = ["Popularity", "Newest", "Price: Low to High", "Price: High to Low"];

const CustomSelect = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-56 font-montserrat">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#F9F9F9] border border-[#DDDDDD] py-3 px-4 rounded-md flex justify-between items-center cursor-pointer hover:border-primary-color transition-all"
      >
        <span className="text-second-text-color text-sm">{sortBy}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-[#DDDDDD] mt-1 rounded-md shadow-lg z-50 overflow-hidden">
          {SORT_OPTIONS.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSortBy(option);
                setIsOpen(false);
              }}
              className={`px-4 py-3 text-sm cursor-pointer transition-colors ${
                sortBy === option
                  ? "bg-primary-color text-white"
                  : "text-second-text-color hover:bg-primary-color hover:text-white"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
