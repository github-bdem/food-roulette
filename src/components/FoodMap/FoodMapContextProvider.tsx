import React from "react";
import {
    FoodMapContext,
    foodMapReducer,
    initialFoodMapState,
} from "./FoodMapContext";

const FoodMapProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = React.useReducer(
        foodMapReducer,
        initialFoodMapState,
    );

    return (
        <FoodMapContext.Provider value={{ state, dispatch }}>
            {children}
        </FoodMapContext.Provider>
    );
};

export default FoodMapProvider;
