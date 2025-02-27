import React from "react";

// restaurant

// meal_delivery
// meal_takeaway

enum FoodTypeFilter {
    chicken = "Chicken",
    mexican = "Mexican",
    asian = "Asian",
    pizza = "Pizza",
    salads = "Salads",
    burgers = "Burgers",
    ramen = "Ramen",
    indian = "Indian",
    sushi = "Sushi",
    vegan = "Vegan",
    american = "American",
}

interface State {
    updateOnMapMove: boolean;
    foodTypeFilters: FoodTypeFilter[];
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
        foodTypeFilters?: FoodTypeFilter[];
        foodTypeFilterToAdd?: FoodTypeFilter;
        foodTypeFilterToRemove?: FoodTypeFilter;
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
                        (foodTypeFilter: FoodTypeFilter) =>
                            foodTypeFilter !==
                            action.payload.foodTypeFilterToRemove,
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
    FoodTypeFilter,
};
