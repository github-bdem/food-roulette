import useFilterContextInteractions from "../FilterContextInteractions";
import { GmapsFoodTypeFilter } from "../FiltersContext";

interface GmapsFoodTypeFilterSectionProps {
    gmapsFoodTypeFilterList: GmapsFoodTypeFilter[];
    gmapsFoodTypeFilterSectionTitle: string;
}

function GmapsFoodTypeFilterSection(props: GmapsFoodTypeFilterSectionProps) {
    const { gmapsFoodTypeFilterList, gmapsFoodTypeFilterSectionTitle } = props;

    const { addFoodTypeFilter, removeFoodTypeFilter, isFoodFilterApplied } =
        useFilterContextInteractions();

    const handleFoodFilterChange = (gmapsFilter: GmapsFoodTypeFilter) => {
        if (isFoodFilterApplied(gmapsFilter)) {
            removeFoodTypeFilter(gmapsFilter);
        } else {
            addFoodTypeFilter(gmapsFilter);
        }
    };

    return (
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
            <legend className="fieldset-legend">
                {gmapsFoodTypeFilterSectionTitle}
            </legend>
            {gmapsFoodTypeFilterList.map(
                (foodTypeFilter: GmapsFoodTypeFilter) => (
                    <label key={foodTypeFilter.id} className="fieldset-label">
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={isFoodFilterApplied(foodTypeFilter)}
                            onChange={() =>
                                handleFoodFilterChange(foodTypeFilter)
                            }
                        />
                        {foodTypeFilter.displayName}
                    </label>
                ),
            )}
        </fieldset>
    );
}

export default GmapsFoodTypeFilterSection;
