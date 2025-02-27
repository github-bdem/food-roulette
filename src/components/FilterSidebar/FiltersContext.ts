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
}

enum FilterAction {
    SET_UPDATE_ON_MAP_MOVE = "SET_UPDATE_ON_MAP_MOVE",
    ADD_FOOD_TYPE_FILTER = "ADD_FOOD_TYPE_FILTER",
    REMOVE_FOOD_TYPE_FILTER = "REMOVE_FOOD_TYPE_FILTER",
    SET_INCLUDE_OPEN_NOW = "SET_INCLUDE_OPEN_NOW",
}

interface Action {
    type:
        | FilterAction.SET_UPDATE_ON_MAP_MOVE
        | FilterAction.ADD_FOOD_TYPE_FILTER
        | FilterAction.REMOVE_FOOD_TYPE_FILTER
        | FilterAction.SET_INCLUDE_OPEN_NOW;
    payload: {
        updateOnMapMove?: boolean;
        foodTypeFilters?: GmapsFoodTypeFilter[];
        foodTypeFilterToAdd?: GmapsFoodTypeFilter;
        foodTypeFilterToRemove?: GmapsFoodTypeFilter;
        includeOpenNow?: boolean;
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
