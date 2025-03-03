import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useMemo } from "react";
import { FoodMapAction, useFoodMapContext } from "./FoodMapContext";
import {
    GmapsFoodTypeFilter,
    useFilterContext,
} from "../FilterSidebar/FiltersContext";
import isOpenNow from "../ResultsCard/OpenNowCheck";

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

                    const searchRadius =
                        1610 * (filterState.maxDistancePercent / 100);

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
                            "id",
                            "regularOpeningHours",
                        ],
                        locationRestriction: {
                            center: foodMapState.center,
                            radius: searchRadius,
                        },
                        rankPreference:
                            google.maps.places.SearchNearbyRankPreference
                                .POPULARITY,
                    };
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
                                    ? foodPriceMapping[place.priceLevel] <=
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

                        if (filterState.includeOpenNow) {
                            nearbyPlaces = nearbyPlaces.filter((place) =>
                                place.regularOpeningHours
                                    ? isOpenNow(place.regularOpeningHours)
                                    : false,
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

                    foodMapDispatch({
                        type: FoodMapAction.SET_LAST_UPDATED_RADIUS,
                        payload: {
                            lastUpdatedRadius: searchRadius,
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
