import { useMemo } from "react";
import {
    FilterAction,
    FoodTypeFilter,
    useFilterContext,
} from "./FiltersContext";

const useFilterContextInteractions = () => {
    const { state, dispatch } = useFilterContext();

    const filterContextUpdateActions = useMemo(
        () => ({
            toggleUpdateOnMapMove: () => {
                dispatch({
                    type: FilterAction.SET_UPDATE_ON_MAP_MOVE,
                    payload: {
                        updateOnMapMove: !state.updateOnMapMove,
                    },
                });
            },
            addFoodTypeFilter: (foodTypeFilterToAdd: FoodTypeFilter) => {
                dispatch({
                    type: FilterAction.ADD_FOOD_TYPE_FILTER,
                    payload: {
                        foodTypeFilterToAdd,
                    },
                });
            },
            removeFoodTypeFilter: (foodTypeFilterToRemove: FoodTypeFilter) => {
                dispatch({
                    type: FilterAction.REMOVE_FOOD_TYPE_FILTER,
                    payload: {
                        foodTypeFilterToRemove,
                    },
                });
            },
            isFoodFilterApplied: (filterName: FoodTypeFilter) => {
                return !!state.foodTypeFilters.find(
                    (appliedFilterName: FoodTypeFilter) =>
                        appliedFilterName === filterName,
                );
            },
            setIncludeOpenNow: (includeOpenNow: boolean) => {
                dispatch({
                    type: FilterAction.SET_INCLUDE_OPEN_NOW,
                    payload: {
                        includeOpenNow,
                    },
                });
            },
        }),
        [state, dispatch],
    );

    return filterContextUpdateActions;
};

export default useFilterContextInteractions;
