import React from "react";
import {
    filterReducer,
    initialFilterState,
    FilterContext,
} from "./FiltersContext";

const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = React.useReducer(
        filterReducer,
        initialFilterState,
    );

    return (
        <FilterContext.Provider value={{ state, dispatch }}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterProvider;
