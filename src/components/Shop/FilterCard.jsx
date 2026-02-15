import { BiSolidCategory } from "react-icons/bi";
import { BsListCheck } from "react-icons/bs";
import CustomSelect from "./CustomSelect";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const FilterCard = ({
  isGridView,
  setIsGridView,
  totalResults,
  filter,
  setFilter,
  sort,
  setSortBy,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full">
      <article className="flex flex-col items-center justify-center mx-auto gap-6 font-montserrat font-bold text-sm leading-6 py-20 text-second-text-color xl:flex-row xl:justify-between xl:w-[80%]">
        <div className="py-1">Showing all {totalResults} results</div>

        <div className="flex items-center py-1 gap-4">
          <h6>Views:</h6>
          <div className="flex gap-4">
            <button
              onClick={() => setIsGridView(true)}
              className={`border rounded-md p-4 transition-colors ${
                isGridView
                  ? "border-primary-color bg-primary-color"
                  : "border-light-gray-2 hover:border-primary-color"
              }`}
            >
              <BiSolidCategory
                size={16}
                color={isGridView ? "#FFFFFF" : "#252B42"}
              />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`border rounded-md p-4 transition-colors ${
                !isGridView
                  ? "border-primary-color bg-primary-color"
                  : "border-light-gray-2 hover:border-primary-color"
              }`}
            >
              <BsListCheck
                size={16}
                color={!isGridView ? "#FFFFFF" : "#737373"}
              />
            </button>
          </div>
        </div>

        <div className="flex items-center py-1 gap-4 flex-wrap justify-center">
          <CustomSelect sortBy={sort} setSortBy={setSortBy} />
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 bg-primary-color text-white py-2.5 px-5 rounded-md hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap"
            >
              <SlidersHorizontal size={16} />
              Filter
            </button>
            {isOpen && (
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Arama yap..."
                autoFocus
                className="border border-[#E8E8E8] bg-[#F9F9F9] rounded-md px-4 py-2.5 font-normal focus:outline-primary-color animate-in slide-in-from-left-2 duration-200"
              />
            )}
          </div>
        </div>
      </article>
    </section>
  );
};

export default FilterCard;
