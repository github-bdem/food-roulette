import AdditionalFilters from "./components/AdditionalFilters";
import GmapsFoodTypeFilterSection from "./components/GmapsFoodTypeFilterSection";
import MaxDistanceFilter from "./components/MaxDistanceFilter";
import PriceRangeFilter from "./components/PriceRange";
import RatingFilter from "./components/RatingFilter";
import {
    commonTypeFilters,
    eateryTypeFilters,
    foodTypeFilters,
    cuisineFoodTypeFilters,
    dietaryTypeFilters,
} from "./GmapsFoodTypeFilterSections";

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
                <MaxDistanceFilter />
                <AdditionalFilters />
                <RatingFilter />
                <PriceRangeFilter />
                <GmapsFoodTypeFilterSection
                    gmapsFoodTypeFilterList={dietaryTypeFilters}
                    gmapsFoodTypeFilterSectionTitle="Dietary Considerations"
                />
                <GmapsFoodTypeFilterSection
                    gmapsFoodTypeFilterList={commonTypeFilters}
                    gmapsFoodTypeFilterSectionTitle="Common Filters"
                />
                <GmapsFoodTypeFilterSection
                    gmapsFoodTypeFilterList={eateryTypeFilters}
                    gmapsFoodTypeFilterSectionTitle="Eatery Description"
                />
                <GmapsFoodTypeFilterSection
                    gmapsFoodTypeFilterList={foodTypeFilters}
                    gmapsFoodTypeFilterSectionTitle="Food Type"
                />
                <GmapsFoodTypeFilterSection
                    gmapsFoodTypeFilterList={cuisineFoodTypeFilters}
                    gmapsFoodTypeFilterSectionTitle="Specific Cuisine"
                />
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
