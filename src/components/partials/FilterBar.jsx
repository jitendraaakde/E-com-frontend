    import FilterItem from "./FilterItem"

    const FilterBar = () => {
        const filterArr = ['All Products', 'T-Shirt', 'Denim', 'SweatShirts', 'Polo T-Shirt', 'Shirt']

        return <div className="flex justify-between m-3">
            <div className="flex items-center">
                <p className="text-xs">Filters:</p>
                {filterArr.map(item => <FilterItem item={item} />)}
            </div>
            <div className="">
                <button className="text-[9px] border-[1px] border-solid border-slate-700 px-3 p-[7px] ml-2 rounded-[20px] font-bold">Sort by:Price low to High</button>
            </div>
        </div>
    }
    export default FilterBar