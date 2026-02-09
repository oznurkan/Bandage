import { useState } from "react";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { id: "1", value: "price-asc", name: "Price: Low to High" },
  { id: "2", value: "price-desc", name: "Price: High to Low" },
  { id: "3", value: "rating-asc", name: "Rating: Low to High" },
  { id: "4", value: "rating-desc", name: "Rating: High to Low" }, 
];

const CustomSelect = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = SORT_OPTIONS.find((opt) => opt.value === sortBy);

  return (
    <div className="relative w-56 font-montserrat">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#F9F9F9] border border-[#DDDDDD] py-3 px-4 rounded-md flex justify-between items-center cursor-pointer hover:border-primary-color transition-all"
      >
        <span className="text-second-text-color text-sm">
          {selectedOption ? selectedOption.name : "Sort By"}
        </span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-[#DDDDDD] mt-1 rounded-md shadow-lg z-50 overflow-hidden">
          {SORT_OPTIONS.map((option) => (
            <div
              key={option.id} 
              onClick={() => {
                setSortBy(option.value); 
                setIsOpen(false);
              }}
              className={`px-4 py-3 text-sm cursor-pointer transition-colors ${
                sortBy === option.value
                  ? "bg-primary-color text-white"
                  : "text-second-text-color hover:bg-primary-color hover:text-white"
              }`}
            >
              {option.name} 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;