import { useEffect, useState } from "react";
import {
    ControlPosition,
    Map,
    MapCameraChangedEvent,
    MapControl,
    useMap,
    useMapsLibrary,
} from "@vis.gl/react-google-maps";
import {
    FoodMapAction,
    useFoodMapContext,
    latLngPosition,
} from "./FoodMapContext";

const minimumCenterDeltaToTriggerUpdate = 1; // Delta is expressed in km
const minimumZoomLevelDeltaToTriggerUpdate = 2;

interface ShouldFetchNewPizzaLocationsProps {
    newCenter: latLngPosition;
    newZoom: number;
}

interface FetchFoodLocationsProps {
    center: latLngPosition;
    zoom: number;
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
            //TODO: MAKE THIS DYNAMIC
            fetchFoodLocations({ center, zoom: 17 });
        };
        navigator.geolocation.getCurrentPosition(
            successFunction,
            () => null,
            geolocationOptions,
        );
    }, [dispatch]);

    function handleFoodLocationResponse(
        response: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus,
        pagination: google.maps.places.PlaceSearchPagination | null,
    ): void {
        console.log("response", response);
        console.log("status", status);
        console.log("pagination", pagination);
    }

    const fetchFoodLocations = ({ center, zoom }: FetchFoodLocationsProps) => {
        console.log("making request");
        if (placesService) {
            // TODO: GET THIS FILTERS CONTEXT
            const searchRadius = 1500;
            const request = {
                keyword: "pizza", // TODO: MAKE THIS GENERAL
                location: center,
                radius: searchRadius,
                type: "restaurant",
            };
            console.log("making request");
            placesService.nearbySearch(request, handleFoodLocationResponse);
        } else {
            console.error("Places service not initialized");
        }
    };

    const convertDegreesToRadians = (deg: number) => {
        return deg * (Math.PI / 180);
    };

    const shouldFetchNewPizzaLocations = ({
        newCenter,
        newZoom,
    }: ShouldFetchNewPizzaLocationsProps) => {
        if (!lastUpdatedCenter || !lastUpdatedZoom) return false;

        /*  Checks to see if the center has moved enough or if the zoom level has changed enough from the last
            pizza locations request.  Distance calculation done via Haversine formula.
        */
        const lat1 = lastUpdatedCenter.lat;
        const lng1 = lastUpdatedCenter.lng;

        const lat2 = newCenter.lat;
        const lng2 = newCenter.lng;

        const radiusOfEarth = 6371;
        const latitudinalDistance = convertDegreesToRadians(lat2 - lat1);
        const longitudinalDistance = convertDegreesToRadians(lng2 - lng1);
        const a =
            Math.sin(latitudinalDistance / 2) *
                Math.sin(latitudinalDistance / 2) +
            Math.cos(convertDegreesToRadians(lat1)) *
                Math.cos(convertDegreesToRadians(lat2)) *
                Math.sin(longitudinalDistance / 2) *
                Math.sin(longitudinalDistance / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const centerDeltaTrigger =
            radiusOfEarth * c >= minimumCenterDeltaToTriggerUpdate;

        const zoomDeltaTrigger =
            Math.abs(newZoom - lastUpdatedZoom) >=
            minimumZoomLevelDeltaToTriggerUpdate;

        return centerDeltaTrigger || zoomDeltaTrigger;
    };

    const handleCameraChange = (ev: MapCameraChangedEvent) => {
        const { center, zoom } = ev.detail;
        if (
            shouldFetchNewPizzaLocations({ newCenter: center, newZoom: zoom })
        ) {
            fetchFoodLocations({ center, zoom });
            dispatch({
                type: FoodMapAction.SET_LAST_UPDATED_MAP_CAMERA_VALUES,
                payload: { lastUpdatedCenter: center, lastUpdatedZoom: zoom },
            });
        }
        dispatch({
            type: FoodMapAction.SET_MAP_CAMERA_VALUES,
            payload: { center, zoom },
        });
    };

    return (
        <Map
            center={center}
            zoom={zoom}
            onCameraChanged={handleCameraChange}
            mapId="DEMO_MAP_ID"
            zoomControlOptions={{
                position: ControlPosition.TOP_LEFT,
            }}
            mapTypeControl={false}
            fullscreenControl={false}
            streetViewControlOptions={{
                position: ControlPosition.TOP_LEFT,
            }}
            keyboardShortcuts={false}
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
