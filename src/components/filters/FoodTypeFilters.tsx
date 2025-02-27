import useFilterContextInteractions from "./FilterContextInteractions";
import { FoodTypeFilter } from "./FiltersContext";

function FoodTypeFilters() {
    const { addFoodTypeFilter, removeFoodTypeFilter, isFoodFilterApplied } =
        useFilterContextInteractions();

    const handleFoodFilterChange = (filterName: FoodTypeFilter) => {
        if (isFoodFilterApplied(filterName)) {
            removeFoodTypeFilter(filterName);
        } else {
            addFoodTypeFilter(filterName);
        }
    };

    return (
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
            <legend className="fieldset-legend">Food Type</legend>
            {Object.values(FoodTypeFilter).map((filterName) => (
                <label key={filterName} className="fieldset-label">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={isFoodFilterApplied(filterName)}
                        onChange={() => handleFoodFilterChange(filterName)}
                    />
                    {filterName}
                </label>
            ))}
        </fieldset>
    );
}

export default FoodTypeFilters;
