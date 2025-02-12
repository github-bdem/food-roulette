import React from "react";

interface latLngPosition {
    lat: number;
    lng: number;
}

interface State {
    mapCenter?: latLngPosition;
    zoom?: number;
}

enum FoodMapAction {
    SET_MAP_CENTER = "SET_MAP_CENTER",
    SET_ZOOM_LEVEL = "SET_ZOOM_LEVEL",
    SET_MAP_CAMERA_VALUES = "SET_MAP_CAMERA_VALUES",
}

interface Action {
    type:
        | FoodMapAction.SET_MAP_CENTER
        | FoodMapAction.SET_ZOOM_LEVEL
        | FoodMapAction.SET_MAP_CAMERA_VALUES;
    payload: { mapCenter?: latLngPosition; zoom?: number };
}

const foodMapReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case FoodMapAction.SET_MAP_CENTER:
            return {
                ...state,
                mapCenter: action.payload.mapCenter,
            };
        case FoodMapAction.SET_ZOOM_LEVEL:
            return {
                ...state,
                zoom: action.payload.zoom,
            };
        case FoodMapAction.SET_MAP_CAMERA_VALUES:
            return {
                ...state,
                mapCenter: action.payload.mapCenter,
                zoom: action.payload.zoom,
            };
        default:
            return state;
    }
};

interface ContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

const initialFoodMapState = {
    mapCenter: { lat: 37.7749, lng: -122.4194 },
    zoom: 17,
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
};

export type { latLngPosition };
