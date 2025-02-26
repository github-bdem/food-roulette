import AdditionalFilters from "./AdditionalFilters";
import FoodTypeFilters from "./FoodTypeFilters";
import MaxDistanceFilter from "./MaxDistanceFilter";
import PriceRangeFilter from "./PriceRange";
import RatingFilter from "./RatingFilter";

function FilterSidebar() {
    return (
        <div className="bg-base-200 text-base-content h-full w-full md:w-[450px]">
            <div className="navbar bg-secondary navbar-height flex justify-between p-4 shadow-sm">
                <div>Filters</div>
                <label
                    htmlFor="filter-drawer"
                    className="drawer-button btn mr-4"
                >
                    Close
                </label>
            </div>
            <div className="filter-sidebar-height flex h-5 w-full flex-col items-center gap-4 overflow-scroll p-4">
                <FoodTypeFilters />
                <MaxDistanceFilter />
                <AdditionalFilters />
                <RatingFilter />
                <PriceRangeFilter />
            </div>
            <div className="navbar bg-base-300 navbar-height flex justify-between p-4 shadow-sm">
                <label
                    htmlFor="filter-drawer"
                    className="drawer-button btn btn-primary mr-4"
                    onClick={() => window.alert("blah")}
                >
                    Reroll
                </label>
            </div>
        </div>
    );
}

export default FilterSidebar;
