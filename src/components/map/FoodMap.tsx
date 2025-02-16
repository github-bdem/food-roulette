import { useEffect, useState } from "react";
import {
    ControlPosition,
    Map,
    MapCameraChangedEvent,
    MapControl,
    MapEvent,
    useMap,
    useMapsLibrary,
} from "@vis.gl/react-google-maps";
import {
    FoodMapAction,
    useFoodMapContext,
    latLngPosition,
} from "./FoodMapContext";
import computeDistanceBetweenLatLng from "./ComputeDistanceBetweenLatLng";
import convertGmapsLatLngToLatLng from "./ConvertGmapsLatLngToLatLng";

const minimumCenterDeltaToTriggerUpdate = 1; // Delta is expressed in km
const minimumZoomLevelDeltaToTriggerUpdate = 1;

interface ShouldFetchNewPizzaLocationsProps {
    newCenter: latLngPosition;
    newZoom: number;
}

interface FetchFoodLocationsProps {
    newCenter: latLngPosition;
    newZoom: number;
}

function FoodMap() {
    const { state, dispatch } = useFoodMapContext();

    const { center, zoom, lastUpdatedCenter, lastUpdatedZoom } = state;

    const map = useMap();
    const placesLib = useMapsLibrary("places");

    const [placesService, setPlacesService] =
        useState<google.maps.places.PlacesService | null>(null);

    useEffect(() => {
        if (!placesLib || !map || placesService) return;

        const svc = new placesLib.PlacesService(map);
        setPlacesService(svc);
    }, [placesLib, map, placesService]);

    useEffect(() => {
        const geolocationOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        const successFunction = (pos: GeolocationPosition) => {
            const center = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            } as latLngPosition;
            dispatch({
                type: FoodMapAction.SET_MAP_CAMERA_VALUES,
                payload: { center },
            });
        };
        navigator.geolocation.getCurrentPosition(
            successFunction,
            () => null,
            geolocationOptions,
        );
    }, [dispatch]);

    const handleNewFoodLocationsResponse = (
        placeSearchResults: google.maps.places.PlaceResult[] | null,
        placesServiceStatus: google.maps.places.PlacesServiceStatus,
        // placeSearchPagination: google.maps.places.PlaceSearchPagination | null, // will be used to reroll
    ) => {
        if (
            placesServiceStatus === google.maps.places.PlacesServiceStatus.OK &&
            placeSearchResults !== null
        ) {
            dispatch({
                type: FoodMapAction.SET_FOOD_LOCATIONS,
                payload: { foodLocations: placeSearchResults },
            });
        }
    };

    const fetchFoodLocations = ({
        newCenter,
        newZoom,
    }: FetchFoodLocationsProps) => {
        console.log("fetching food locations");
        if (placesService) {
            const request = {
                location: center,
                radius: 1500,
                type: "restaurant",
                // keyword: "pizza",
                // maxPriceLevel,
                // minPriceLevel,
                // openNow,
            };
            placesService.nearbySearch(request, handleNewFoodLocationsResponse);

            dispatch({
                type: FoodMapAction.SET_LAST_UPDATED_MAP_CAMERA_VALUES,
                payload: {
                    lastUpdatedCenter: newCenter,
                    lastUpdatedZoom: newZoom,
                },
            });
        }
    };

    const shouldFetchNewFoodLocations = ({
        newCenter,
        newZoom,
    }: ShouldFetchNewPizzaLocationsProps) => {
        const initialFetchCheck = !lastUpdatedCenter && !lastUpdatedZoom;
        if (initialFetchCheck) {
            /**
             * Initial page load, last updated is undefined, thus we want to fetch
             * new locations
             */
            return true;
        }
        const hasAllDimensions =
            lastUpdatedCenter && lastUpdatedZoom && newCenter && newZoom;
        if (hasAllDimensions) {
            /**
             * All dimensions are available, we can compare the distances
             * between center and zoom level.  If either difference exceed
             *  our epsilons then we want to fetch new locations
             */

            const distanceBetweenLatLng = computeDistanceBetweenLatLng(
                lastUpdatedCenter,
                newCenter,
            );

            const centerDeltaTrigger =
                distanceBetweenLatLng >= minimumCenterDeltaToTriggerUpdate;

            const zoomDeltaTrigger =
                Math.abs(newZoom - lastUpdatedZoom) >=
                minimumZoomLevelDeltaToTriggerUpdate;

            return centerDeltaTrigger || zoomDeltaTrigger;
        } else {
            /**
             * Error state, lets save some money and not make api requests
             */
            console.error("Map center or zoom storage error");
            return false;
        }
    };

    const handleCameraChange = (ev: MapCameraChangedEvent) => {
        const { center, zoom } = ev.detail;
        dispatch({
            type: FoodMapAction.SET_MAP_CAMERA_VALUES,
            payload: { center, zoom },
        });
    };

    const onTilesLoaded = (ev: MapEvent) => {
        const gmapCenter = ev.map.getCenter();
        const gmapZoom = ev.map.getZoom();

        if (gmapCenter && gmapZoom) {
            const center = convertGmapsLatLngToLatLng(gmapCenter);
            const zoom = gmapZoom;

            if (center && zoom) {
                if (
                    shouldFetchNewFoodLocations({
                        newCenter: center,
                        newZoom: zoom,
                    })
                ) {
                    fetchFoodLocations({ newCenter: center, newZoom: zoom });
                }
            }
        }
    };

    return (
        <Map
            center={center}
            zoom={zoom}
            onCameraChanged={handleCameraChange}
            onTilesLoaded={onTilesLoaded}
            mapId="DEMO_MAP_ID" //TODO: REPLACE BEFORE DEPLOY
            zoomControlOptions={{
                position: ControlPosition.TOP_LEFT,
            }}
            mapTypeControl={false}
            fullscreenControl={false}
            streetViewControlOptions={{
                position: ControlPosition.TOP_LEFT,
            }}
            keyboardShortcuts={false}
            clickableIcons={false}
            styles={[
                // TODO: This does not seem to work??
                // might need to manually set styles if this library is busted:
                // https://github.com/Pham-Vincent/Equitable-Water-Solutions/issues/76
                // https://developers.google.com/maps/documentation/javascript/examples/hiding-features#maps_hiding_features-javascript
                {
                    featureType: "poi.business",
                    stylers: [{ visibility: "off" }],
                },
                {
                    featureType: "transit",
                    elementType: "labels.icon",
                    stylers: [{ visibility: "off" }],
                },
            ]}
        >
            <MapControl position={ControlPosition.RIGHT_CENTER}>
                <label
                    htmlFor="filter-drawer"
                    className="drawer-button btn btn-secondary mr-4"
                >
                    Filters
                </label>
            </MapControl>
            <MapControl position={ControlPosition.RIGHT_BOTTOM}>
                <button className="btn btn-primary mr-4 mb-2 p-4">
                    Reroll
                </button>
            </MapControl>
        </Map>
    );
}

export default FoodMap;
