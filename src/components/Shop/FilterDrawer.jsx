import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";

const CATEGORIES = ["All", "Men", "Women"];
const TYPES = ["All", "Clothing", "Accessories", "Shoes"];
const PRICE_RANGES = ["All", "0-$10", "$10-$20", "$20-$50", "$50+"];

const FilterDrawer = ({ onApply, onReset, pendingCategory, setPendingCategory, pendingType, setPendingType, pendingPriceRange, setPendingPriceRange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-primary-color text-white py-2.5 px-5 rounded-md hover:opacity-80 transition-opacity cursor-pointer"
      >
        <SlidersHorizontal size={16} />
        Filter
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-transparent backdrop-blur-xs backdrop-grayscale z-40"
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#E8E8E8]">
          <h3 className="font-montserrat font-bold text-base text-text-color">Filters</h3>
          <button onClick={() => setIsOpen(false)}>
            <X size={20} className="text-text-color hover:text-primary-color transition-colors cursor-pointer" />
          </button>
        </div>
        <div className="flex flex-col gap-6 p-6 overflow-y-auto h-[calc(100%-180px)]">
          <div className="flex flex-col gap-3">
            <h4 className="font-montserrat font-bold text-sm text-text-color uppercase">Category</h4>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setPendingCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-montserrat transition-colors ${
                    pendingCategory === category
                      ? "bg-primary-color text-white"
                      : "border border-[#DDDDDD] text-second-text-color hover:border-primary-color"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-montserrat font-bold text-sm text-text-color uppercase">Type</h4>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setPendingType(type)}
                  className={`px-4 py-2 rounded-md text-sm font-montserrat transition-colors ${
                    pendingType === type
                      ? "bg-primary-color text-white"
                      : "border border-[#DDDDDD] text-second-text-color hover:border-primary-color"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-montserrat font-bold text-sm text-text-color uppercase">Price Range</h4>
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range}
                  onClick={() => setPendingPriceRange(range)}
                  className={`px-4 py-2 rounded-md text-sm font-montserrat transition-colors ${
                    pendingPriceRange === range
                      ? "bg-primary-color text-white"
                      : "border border-[#DDDDDD] text-second-text-color hover:border-primary-color"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex gap-3 p-6 border-t border-[#E8E8E8]">
          <button
            onClick={() => {
              onReset();
              setIsOpen(false);
            }}
            className="flex-1 border border-primary-color text-primary-color py-2.5 rounded-md font-montserrat font-bold text-sm hover:bg-primary-color hover:text-white transition-colors cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={() => {
              onApply();
              setIsOpen(false);
            }}
            className="flex-1 bg-primary-color text-white py-2.5 rounded-md font-montserrat font-bold text-sm hover:opacity-80 transition-opacity cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;