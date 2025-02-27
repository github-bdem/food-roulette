import { useMemo } from "react";
import {
    FilterAction,
    GmapsFoodTypeFilter,
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
            addFoodTypeFilter: (foodTypeFilterToAdd: GmapsFoodTypeFilter) => {
                dispatch({
                    type: FilterAction.ADD_FOOD_TYPE_FILTER,
                    payload: {
                        foodTypeFilterToAdd,
                    },
                });
            },
            removeFoodTypeFilter: (
                foodTypeFilterToRemove: GmapsFoodTypeFilter,
            ) => {
                dispatch({
                    type: FilterAction.REMOVE_FOOD_TYPE_FILTER,
                    payload: {
                        foodTypeFilterToRemove,
                    },
                });
            },
            isFoodFilterApplied: (gmapsFilter: GmapsFoodTypeFilter) => {
                return !!state.foodTypeFilters.find(
                    (appliedFilter: GmapsFoodTypeFilter) =>
                        appliedFilter.id === gmapsFilter.id,
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
            setMaxDistancePercent: (maxDistancePercent: number) => {
                dispatch({
                    type: FilterAction.SET_MAX_DISTANCE_PERCENT,
                    payload: {
                        maxDistancePercent,
                    },
                });
            },
            setIncludeReservationsAvailable: (
                includeReservationsAvailable: boolean,
            ) => {
                dispatch({
                    type: FilterAction.SET_INCLUDE_RESERVATIONS_AVAILABLE,
                    payload: {
                        includeReservationsAvailable,
                    },
                });
            },
            setIncludeTakeawayAvailable: (
                includeTakeawayAvailable: boolean,
            ) => {
                dispatch({
                    type: FilterAction.SET_INCLUDE_TAKEAWAY_AVAILABLE,
                    payload: {
                        includeTakeawayAvailable,
                    },
                });
            },
            setIncludeDeliveryAvailable: (
                includeDeliveryAvailable: boolean,
            ) => {
                dispatch({
                    type: FilterAction.SET_INCLUDE_DELIVERY_AVAILABLE,
                    payload: {
                        includeDeliveryAvailable,
                    },
                });
            },
        }),
        [state, dispatch],
    );

    return filterContextUpdateActions;
};

export default useFilterContextInteractions;
