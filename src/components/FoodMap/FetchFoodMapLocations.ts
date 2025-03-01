import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useMemo } from "react";
import { FoodMapAction, useFoodMapContext } from "./FoodMapContext";
import {
    GmapsFoodTypeFilter,
    useFilterContext,
} from "../FilterSidebar/FiltersContext";

const foodPriceMapping = {
    EXPENSIVE: 1,
    FREE: 2,
    INEXPENSIVE: 3,
    MODERATE: 4,
    VERY_EXPENSIVE: 5,
};

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
                            "hasDelivery",
                            "isReservable",
                            "hasTakeout",
                        ],
                        locationRestriction: {
                            center: foodMapState.center,
                            radius:
                                (3218 * filterState.maxDistancePercent) / 100,
                        },
                        rankPreference:
                            google.maps.places.SearchNearbyRankPreference
                                .DISTANCE,
                    };
                    console.log("making request", request);
                    const nearbyPlacesResult =
                        await placesLib.Place.searchNearby(request);

                    let nearbyPlaces = nearbyPlacesResult.places;

                    if (nearbyPlaces !== null) {
                        if (filterState.minimumRating > 1) {
                            nearbyPlaces = nearbyPlaces.filter((place) =>
                                place.rating
                                    ? place.rating >= filterState.minimumRating
                                    : true,
                            );
                        }

                        if (filterState.maximumPrice > 1) {
                            nearbyPlaces = nearbyPlaces.filter((place) =>
                                place.priceLevel
                                    ? foodPriceMapping[place.priceLevel] >=
                                      filterState.maximumPrice
                                    : true,
                            );
                        }

                        if (filterState.includeReservationsAvailable) {
                            nearbyPlaces = nearbyPlaces.filter(
                                (place) => place.isReservable,
                            );
                        }

                        if (filterState.includeDeliveryAvailable) {
                            nearbyPlaces = nearbyPlaces.filter(
                                (place) => place.hasDelivery,
                            );
                        }

                        if (filterState.includeReservationsAvailable) {
                            nearbyPlaces = nearbyPlaces.filter(
                                (place) => place.isReservable,
                            );
                        }

                        if (filterState.includeTakeawayAvailable) {
                            nearbyPlaces = nearbyPlaces.filter(
                                (place) => place.hasTakeout,
                            );
                        }

                        foodMapDispatch({
                            type: FoodMapAction.SET_FOOD_LOCATIONS,
                            payload: { foodLocations: nearbyPlaces },
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
