import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useMemo } from "react";
import {
    FoodMapAction,
    latLngPosition,
    useFoodMapContext,
} from "./FoodMapContext";

interface FetchFoodLocationsProps {
    newCenter: latLngPosition;
    newZoom: number;
}

const useFoodMapContextInteractions = () => {
    const foodMapContext = useFoodMapContext();
    const foodMapState = foodMapContext.state;
    const foodMapDispatch = foodMapContext.dispatch;

    const placesLib = useMapsLibrary("places");

    const foodMapContextUpdateActions = useMemo(
        () => ({
            fetchFoodLocations: async ({
                newCenter,
                newZoom,
            }: FetchFoodLocationsProps) => {
                console.log("fetching food locations");
                if (placesLib && foodMapState.center) {
                    const request = {
                        includedTypes: ["ramen_restaurant"],
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
                            lastUpdatedCenter: newCenter,
                            lastUpdatedZoom: newZoom,
                        },
                    });
                }
            },
        }),
        [foodMapState, foodMapDispatch, placesLib],
    );

    return foodMapContextUpdateActions;
};

export default useFoodMapContextInteractions;
