import React from "react";

interface latLngPosition {
    lat: number;
    lng: number;
}

interface State {
    center?: latLngPosition;
    zoom?: number;
    lastUpdatedZoom?: number;
    lastUpdatedCenter?: latLngPosition;
}

enum FoodMapAction {
    SET_MAP_CAMERA_VALUES = "SET_MAP_CAMERA_VALUES",
    SET_LAST_UPDATED_MAP_CAMERA_VALUES = "SET_LAST_UPDATED_MAP_CAMERA_VALUES",
}

interface Action {
    type:
        | FoodMapAction.SET_MAP_CAMERA_VALUES
        | FoodMapAction.SET_LAST_UPDATED_MAP_CAMERA_VALUES;
    payload: {
        center?: latLngPosition;
        zoom?: number;
        lastUpdatedZoom?: number;
        lastUpdatedCenter?: latLngPosition;
    };
}

const foodMapReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case FoodMapAction.SET_MAP_CAMERA_VALUES:
            return {
                ...state,
                center: action.payload.center ?? state.center,
                zoom: action.payload.zoom ?? state.zoom,
            };
        case FoodMapAction.SET_LAST_UPDATED_MAP_CAMERA_VALUES:
            return {
                ...state,
                lastUpdatedZoom:
                    action.payload.lastUpdatedZoom ?? state.lastUpdatedZoom,
                lastUpdatedCenter:
                    action.payload.lastUpdatedCenter ?? state.lastUpdatedCenter,
            };
        default:
            return state;
    }
};

interface ContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

const initialZoom = 17;
const initialCenter = { lat: 37.7749, lng: -122.4194 };

const initialFoodMapState = {
    center: initialCenter,
    zoom: initialZoom,
};

const FoodMapContext = React.createContext<ContextProps>({} as ContextProps);

const useFoodMapContext = () => {
    const context = React.useContext(FoodMapContext);
    if (!context) {
        throw new Error(
            "useFoodMapContext must be used within a FoodMapProvider",
        );
    }
    return context;
};

export {
    FoodMapContext,
    foodMapReducer,
    initialFoodMapState,
    useFoodMapContext,
    FoodMapAction,
    initialZoom,
};

export type { latLngPosition };
