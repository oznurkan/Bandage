import { BiSolidCategory } from "react-icons/bi";
import { BsListCheck } from "react-icons/bs";
import CustomSelect from "./CustomSelect";
import FilterDrawer from "./FilterDrawer";

const FilterCard = ({
  isGridView,
  setIsGridView,
  totalResults,
  filter,
  setFilter,
  sort,
  setSortBy,
 /* totalResults,
  isGridView,
  setIsGridView,
  pendingCategory,
  setPendingCategory,
  pendingType,
  setPendingType,
  sortBy,  
  setSortBy,  
  pendingPriceRange,
  setPendingPriceRange,
  onApplyFilter,
  onResetFilter,*/
}) => {
  return (
    <section className="w-full">
      <article className="flex flex-col items-center justify-center mx-auto gap-6 font-montserrat font-bold text-sm leading-6 py-20 text-second-text-color xl:flex-row xl:justify-between xl:w-[90%]">
        <div className="py-1">Showing all {totalResults} results</div>

        <div className="flex items-center py-1 gap-4">
          <h6>Views:</h6>
          <div className="flex gap-4">
            <button
              onClick={() => setIsGridView(true)}
              className={`border rounded-md p-4 transition-colors ${
                isGridView ? "border-primary-color bg-primary-color" : "border-light-gray-2 hover:border-primary-color"
              }`}
            >
              <BiSolidCategory size={16} color={isGridView ? "#FFFFFF" : "#252B42"} />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`border rounded-md p-4 transition-colors ${
                !isGridView ? "border-primary-color bg-primary-color" : "border-light-gray-2 hover:border-primary-color"
              }`}
            >
              <BsListCheck size={16} color={!isGridView ? "#FFFFFF" : "#737373"} />
            </button>
          </div>
        </div>

        <div className="flex items-center py-1 gap-4 flex-wrap justify-center">
          <CustomSelect sortBy={sort} setSortBy={setSortBy} />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by name..."
            className="border border-[#E8E8E8] bg-[#F9F9F9] rounded-md px-4 py-3 font-normal focus:outline-primary-color"
          />
          {/*
            <FilterDrawer
            
            onApply={onApplyFilter}
            onReset={onResetFilter}
            pendingCategory={pendingCategory}
            setPendingCategory={setPendingCategory}
            pendingType={pendingType}
            setPendingType={setPendingType}
            pendingPriceRange={pendingPriceRange}
            setPendingPriceRange={setPendingPriceRange}
          />

         */ } 
        </div>
      </article>
    </section>
  );
};

export default FilterCard;