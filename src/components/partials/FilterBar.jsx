import { useState } from "react"
import { FaChevronDown, FaFilter } from "react-icons/fa"
import FilterItem from "./FilterItem"

export default function FilterBar() {
  const [sortOption, setSortOption] = useState("Price: Low to High")
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)

  const filterArr = ['All Products', 'T-Shirt', 'Denim', 'SweatShirts', 'Polo T-Shirt', 'Shirt']
  const sortOptions = ["Price: Low to High", "Price: High to Low", "New Arrivals", "Popularity"]

  const toggleFilterDropdown = () => setIsFilterDropdownOpen(!isFilterDropdownOpen)
  const toggleSortDropdown = () => setIsSortDropdownOpen(!isSortDropdownOpen)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center m-3 space-y-4 sm:space-y-0">
      <div className="w-full sm:w-auto">
        <button
          className="sm:hidden w-full text-sm border border-slate-700 px-3 py-2 rounded-full font-medium flex items-center justify-center"
          onClick={toggleFilterDropdown}
        >
          <FaFilter className="mr-2 h-4 w-4" />
          Filters
        </button>

        <div className="hidden sm:flex flex-wrap items-center gap-2">
          <p className="text-xs font-medium mr-2">Filters:</p>
          {filterArr.map((item, index) => (
            <FilterItem key={index} item={item} />
          ))}
        </div>

        {isFilterDropdownOpen && (
          <div className="sm:hidden mt-2 w-full bg-white border border-slate-200 rounded-md shadow-lg">
            <div className="py-1">
              {filterArr.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 text-slate-700"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative w-full sm:w-auto">
        <button
          className="w-full sm:w-auto text-xs sm:text-sm border border-slate-700 px-3 py-2 rounded-full font-medium flex items-center justify-center sm:justify-start"
          onClick={toggleSortDropdown}
        >
          Sort by: {sortOption}
          <FaChevronDown className="ml-2 h-4 w-4" />
        </button>

        {isSortDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-lg">
            <div className="py-1">
              {sortOptions.map((option, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 text-slate-700"
                  onClick={() => {
                    setSortOption(option)
                    setIsSortDropdownOpen(false)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

