import React from "react";

interface State {
    updateOnMapMove?: boolean;
}

enum FilterAction {
    SET_UPDATE_ON_MAP_MOVE = "SET_UPDATE_ON_MAP_MOVE",
}

interface Action {
    type: FilterAction.SET_UPDATE_ON_MAP_MOVE;
    payload: {
        updateOnMapMove?: boolean;
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
