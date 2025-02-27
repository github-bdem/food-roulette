import React from "react";

// restaurant

// meal_delivery
// meal_takeaway

// ramen_restaurant;

interface GmapsFoodTypeFilter {
    id: string;
    gmapsLocationTypes: string[];
    displayName: string;
}

interface State {
    updateOnMapMove: boolean;
    foodTypeFilters: GmapsFoodTypeFilter[];
    includeOpenNow: boolean;
    maxDistancePercent: number;
    includeReservationsAvailable: boolean;
    includeDeliveryAvailable: boolean;
    includeTakeawayAvailable: boolean;
    minimumRating: number;
    minimumPrice: number;
}

enum FilterAction {
    SET_UPDATE_ON_MAP_MOVE = "SET_UPDATE_ON_MAP_MOVE",
    ADD_FOOD_TYPE_FILTER = "ADD_FOOD_TYPE_FILTER",
    REMOVE_FOOD_TYPE_FILTER = "REMOVE_FOOD_TYPE_FILTER",
    SET_INCLUDE_OPEN_NOW = "SET_INCLUDE_OPEN_NOW",
    SET_MAX_DISTANCE_PERCENT = "SET_MAX_DISTANCE_PERCENT",
    SET_INCLUDE_RESERVATIONS_AVAILABLE = "SET_INCLUDE_RESERVATIONS_AVAILABLE",
    SET_INCLUDE_DELIVERY_AVAILABLE = "SET_INCLUDE_DELIVERY_AVAILABLE",
    SET_INCLUDE_TAKEAWAY_AVAILABLE = "SET_INCLUDE_TAKEAWAY_AVAILABLE",
    SET_MINIMUM_RATING = "SET_MINIMUM_RATING",
    SET_MINIMUM_PRICE = "SET_MINIMUM_PRICE",
}

interface Action {
    type:
        | FilterAction.SET_UPDATE_ON_MAP_MOVE
        | FilterAction.ADD_FOOD_TYPE_FILTER
        | FilterAction.REMOVE_FOOD_TYPE_FILTER
        | FilterAction.SET_INCLUDE_OPEN_NOW
        | FilterAction.SET_MAX_DISTANCE_PERCENT
        | FilterAction.SET_INCLUDE_RESERVATIONS_AVAILABLE
        | FilterAction.SET_INCLUDE_DELIVERY_AVAILABLE
        | FilterAction.SET_INCLUDE_TAKEAWAY_AVAILABLE
        | FilterAction.SET_MINIMUM_RATING
        | FilterAction.SET_MINIMUM_PRICE;
    payload: {
        updateOnMapMove?: boolean;
        foodTypeFilters?: GmapsFoodTypeFilter[];
        foodTypeFilterToAdd?: GmapsFoodTypeFilter;
        foodTypeFilterToRemove?: GmapsFoodTypeFilter;
        includeOpenNow?: boolean;
        maxDistancePercent?: number;
        includeReservationsAvailable?: boolean;
        includeDeliveryAvailable?: boolean;
        includeTakeawayAvailable?: boolean;
        minimumRating?: number;
        minimumPrice?: number;
    };
}

const filterReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case FilterAction.SET_UPDATE_ON_MAP_MOVE:
            return {
                ...state,
                updateOnMapMove:
                    action.payload.updateOnMapMove ?? state.updateOnMapMove,
            };
        case FilterAction.ADD_FOOD_TYPE_FILTER: {
            // TODO: MIGHT WANT TO DO ADD THEN FILTER TO PREVENT DUPLICATES
            return {
                ...state,
                foodTypeFilters: action.payload.foodTypeFilterToAdd
                    ? [
                          ...state.foodTypeFilters,
                          action.payload.foodTypeFilterToAdd,
                      ]
                    : state.foodTypeFilters,
            };
        }
        case FilterAction.REMOVE_FOOD_TYPE_FILTER: {
            return {
                ...state,
                foodTypeFilters: [
                    ...state.foodTypeFilters.filter(
                        (foodTypeFilter: GmapsFoodTypeFilter) =>
                            foodTypeFilter.id !==
                            action.payload.foodTypeFilterToRemove?.id,
                    ),
                ],
            };
        }
        case FilterAction.SET_INCLUDE_OPEN_NOW: {
            return {
                ...state,
                includeOpenNow:
                    action.payload.includeOpenNow ?? state.includeOpenNow,
            };
        }
        case FilterAction.SET_MAX_DISTANCE_PERCENT: {
            return {
                ...state,
                maxDistancePercent:
                    action.payload.maxDistancePercent ??
                    state.maxDistancePercent,
            };
        }
        case FilterAction.SET_INCLUDE_RESERVATIONS_AVAILABLE: {
            return {
                ...state,
                includeReservationsAvailable:
                    action.payload.includeReservationsAvailable ??
                    state.includeReservationsAvailable,
            };
        }
        case FilterAction.SET_INCLUDE_TAKEAWAY_AVAILABLE: {
            return {
                ...state,
                includeTakeawayAvailable:
                    action.payload.includeTakeawayAvailable ??
                    state.includeTakeawayAvailable,
            };
        }
        case FilterAction.SET_INCLUDE_DELIVERY_AVAILABLE: {
            return {
                ...state,
                includeDeliveryAvailable:
                    action.payload.includeDeliveryAvailable ??
                    state.includeDeliveryAvailable,
            };
        }
        case FilterAction.SET_MINIMUM_RATING: {
            return {
                ...state,
                minimumRating:
                    action.payload.minimumRating ?? state.minimumRating,
            };
        }
        case FilterAction.SET_MINIMUM_PRICE: {
            return {
                ...state,
                minimumPrice: action.payload.minimumPrice ?? state.minimumPrice,
            };
        }
        default:
            return state;
    }
};

interface ContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

const initialFilterState = {
    updateOnMapMove: false,
    foodTypeFilters: [],
    includeOpenNow: false,
    maxDistancePercent: 25,
    includeReservationsAvailable: false,
    includeDeliveryAvailable: false,
    includeTakeawayAvailable: false,
    minimumRating: 1,
    minimumPrice: 1,
};

const FilterContext = React.createContext<ContextProps>({} as ContextProps);

const useFilterContext = () => {
    const context = React.useContext(FilterContext);
    if (!context) {
        throw new Error(
            "useFilterContext must be used within a FilterProvider",
        );
    }
    return context;
};

export {
    FilterContext,
    filterReducer,
    FilterAction,
    initialFilterState,
    useFilterContext,
};

export type { GmapsFoodTypeFilter };
