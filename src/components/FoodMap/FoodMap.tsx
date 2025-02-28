import { useEffect } from "react";
import {
    AdvancedMarker,
    ControlPosition,
    Map,
    MapCameraChangedEvent,
    MapControl,
    MapEvent,
    Pin,
} from "@vis.gl/react-google-maps";
import {
    FoodMapAction,
    useFoodMapContext,
    latLngPosition,
} from "./FoodMapContext";
import computeDistanceBetweenLatLng from "./ComputeDistanceBetweenLatLng";
import convertGmapsLatLngToLatLng from "./ConvertGmapsLatLngToLatLng";
import { useFilterContext } from "../FilterSidebar/FiltersContext";
import useFoodMapContextInteractions from "./FoodMapContextInteractions";

const minimumCenterDeltaToTriggerUpdate = 2; // Delta is expressed in km
const minimumZoomLevelDeltaToTriggerUpdate = 2;

interface ShouldFetchNewPizzaLocationsProps {
    newCenter: latLngPosition;
    newZoom: number;
}

function FoodMap() {
    const foodMapContext = useFoodMapContext();
    const foodMapState = foodMapContext.state;
    const foodMapDispatch = foodMapContext.dispatch;

    const { center, zoom, lastUpdatedCenter, lastUpdatedZoom, foodLocations } =
        foodMapState;

    const filterContext = useFilterContext();
    const filterState = filterContext.state;

    const { updateOnMapMove } = filterState;

    const { fetchFoodLocations } = useFoodMapContextInteractions();

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
            foodMapDispatch({
                type: FoodMapAction.SET_MAP_CAMERA_VALUES,
                payload: { center },
            });
        };
        navigator.geolocation.getCurrentPosition(
            successFunction,
            () => null,
            geolocationOptions,
        );
    }, [foodMapDispatch]);

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

            return updateOnMapMove && (centerDeltaTrigger || zoomDeltaTrigger);
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
        foodMapDispatch({
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
                    fetchFoodLocations({
                        newCenter: center,
                        newZoom: zoom,
                    }).catch((error) => {
                        console.error("Error fetching food locations", error);
                    });
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
            {foodLocations?.map((location: google.maps.places.Place) => {
                if (location?.location) {
                    const convertedLocationCenter = convertGmapsLatLngToLatLng(
                        location.location,
                    );
                    return (
                        <AdvancedMarker
                            key={location.id}
                            position={convertedLocationCenter}
                        ></AdvancedMarker>
                    );
                } else {
                    return null;
                }
            })}
            <AdvancedMarker position={center}>
                <Pin
                    background={"#0f9d58"}
                    borderColor={"#006425"}
                    glyphColor={"#60d98f"}
                />
            </AdvancedMarker>
        </Map>
    );
}

export default FoodMap;
