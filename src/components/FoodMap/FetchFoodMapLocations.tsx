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
                console.log("calling");
                if (
                    placesLib &&
                    foodMapState.center &&
                    filterState.maxDistancePercent
                ) {
                    let allIncludedTypes: string[] = [];

                    filterState.foodTypeFilters.forEach(
                        (appliedFilter: GmapsFoodTypeFilter) =>
                            (allIncludedTypes = [
                                ...allIncludedTypes,
                                ...appliedFilter.gmapsLocationTypes,
                            ]),
                    );

                    let uniqueIncludedTypes: string[] = allIncludedTypes.filter(
                        (value, index, self) => self.indexOf(value) === index,
                    );

                    if (uniqueIncludedTypes.length === 0) {
                        uniqueIncludedTypes = ["restaurant"];
                    }

                    const request = {
                        includedTypes: uniqueIncludedTypes,
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
                            radius:
                                (3218 * filterState.maxDistancePercent) / 100,
                        },
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
