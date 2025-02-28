import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useMemo } from "react";
import { FoodMapAction, useFoodMapContext } from "./FoodMapContext";
import {
    GmapsFoodTypeFilter,
    useFilterContext,
} from "../FilterSidebar/FiltersContext";

const useFetchFoodMapLocations = () => {
    const foodMapContext = useFoodMapContext();
    const foodMapState = foodMapContext.state;
    const foodMapDispatch = foodMapContext.dispatch;

    const filtersContext = useFilterContext();
    const filterState = filtersContext.state;

    const placesLib = useMapsLibrary("places");

    const fetchFoodMapLocationActions = useMemo(
        () => ({
            fetchFoodLocations: async () => {
                console.log("fetching food locations");
                if (placesLib && foodMapState.center) {
                    let allIncludedTypes: string[] = [];

                    filterState.foodTypeFilters.forEach(
                        (appliedFilter: GmapsFoodTypeFilter) =>
                            (allIncludedTypes = [
                                ...allIncludedTypes,
                                ...appliedFilter.gmapsLocationTypes,
                            ]),
                    );

                    let includedTypes: string[] = allIncludedTypes.filter(
                        (value, index, self) => self.indexOf(value) === index,
                    );

                    if (includedTypes.length === 0) {
                        includedTypes = ["restaurant"];
                    }

                    const request = {
                        includedTypes,
                        fields: [
                            "displayName",
                            "photos",
                            "location",
                            "rating",
                            "userRatingCount",
                            "priceLevel",
                            "websiteURI",
                            "nationalPhoneNumber",
                            "formattedAddress",
                            "googleMapsURI",
                        ],
                        locationRestriction: {
                            center: foodMapState.center,
                            radius: 1500,
                        },
                        // keyword: "pizza",
                        // maxPriceLevel,
                        // minPriceLevel,
                        // openNow,
                    };
                    const nearbyPlaces =
                        await placesLib.Place.searchNearby(request);

                    console.log("making request", request);

                    if (nearbyPlaces.places !== null) {
                        foodMapDispatch({
                            type: FoodMapAction.SET_FOOD_LOCATIONS,
                            payload: { foodLocations: nearbyPlaces.places },
                        });
                    }

                    foodMapDispatch({
                        type: FoodMapAction.SET_LAST_UPDATED_MAP_CAMERA_VALUES,
                        payload: {
                            lastUpdatedCenter: foodMapState.center,
                            lastUpdatedZoom: foodMapState.zoom,
                        },
                    });
                }
            },
        }),
        [foodMapState, foodMapDispatch, placesLib, filterState],
    );

    return fetchFoodMapLocationActions;
};

export default useFetchFoodMapLocations;
