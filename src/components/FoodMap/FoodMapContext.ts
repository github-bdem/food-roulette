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
    foodLocations?: google.maps.places.Place[];
}

enum FoodMapAction {
    SET_MAP_CAMERA_VALUES = "SET_MAP_CAMERA_VALUES",
    SET_LAST_UPDATED_MAP_CAMERA_VALUES = "SET_LAST_UPDATED_MAP_CAMERA_VALUES",
    SET_FOOD_LOCATIONS = "SET_FOOD_LOCATIONS",
}

interface Action {
    type:
        | FoodMapAction.SET_MAP_CAMERA_VALUES
        | FoodMapAction.SET_LAST_UPDATED_MAP_CAMERA_VALUES
        | FoodMapAction.SET_FOOD_LOCATIONS;
    payload: {
        center?: latLngPosition;
        zoom?: number;
        lastUpdatedZoom?: number;
        lastUpdatedCenter?: latLngPosition;
        foodLocations?: google.maps.places.Place[];
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
        case FoodMapAction.SET_FOOD_LOCATIONS:
            return {
                ...state,
                foodLocations:
                    action.payload.foodLocations ?? state.foodLocations,
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
    foodLocations: [],
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
