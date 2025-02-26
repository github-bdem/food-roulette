import React from "react";

interface State {
    updateOnMapMove: boolean;
    foodTypeFilters: string[];
}

enum FilterAction {
    SET_UPDATE_ON_MAP_MOVE = "SET_UPDATE_ON_MAP_MOVE",
    SET_FOOD_TYPE_FILTERS = "SET_FOOD_TYPE_FILTERS",
    ADD_FOOD_TYPE_FILTER = "ADD_FOOD_TYPE_FILTER",
    REMOVE_FOOD_TYPE_FILTER = "REMOVE_FOOD_TYPE_FILTER",
}

interface Action {
    type:
        | FilterAction.SET_UPDATE_ON_MAP_MOVE
        | FilterAction.SET_FOOD_TYPE_FILTERS
        | FilterAction.ADD_FOOD_TYPE_FILTER
        | FilterAction.REMOVE_FOOD_TYPE_FILTER;
    payload: {
        updateOnMapMove?: boolean;
        foodTypeFilters?: string[];
        foodTypeFilterToAdd?: string;
        foodTypeFilterToRemove?: string;
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
        case FilterAction.SET_FOOD_TYPE_FILTERS:
            return {
                ...state,
                foodTypeFilters:
                    action.payload.foodTypeFilters ?? state.foodTypeFilters,
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
                        (foodTypeFilter: string) =>
                            foodTypeFilter !==
                            action.payload.foodTypeFilterToRemove,
                    ),
                ],
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
