import { useEffect } from "react";
import {
    AdvancedMarker,
    ControlPosition,
    Map,
    MapCameraChangedEvent,
    MapControl,
    MapEvent,
} from "@vis.gl/react-google-maps";
import { useFoodMapContext, latLngPosition } from "./FoodMapContext";
import computeDistanceBetweenLatLng from "./ComputeDistanceBetweenLatLng";
import convertGmapsLatLngToLatLng from "./ConvertGmapsLatLngToLatLng";
import { useFilterContext } from "../FilterSidebar/FiltersContext";
import useFetchFoodMapLocations from "./FetchFoodMapLocations";
import useFoodMapContextInteractions from "./FoodMapContextInteractions";
import { Circle } from "./SearchAreaCircle/Circle";

const minimumCenterDeltaToTriggerUpdate = 2; // Delta is expressed in km
const minimumZoomLevelDeltaToTriggerUpdate = 2;

interface ShouldFetchNewPizzaLocationsProps {
    newCenter: latLngPosition;
    newZoom: number;
}

function FoodMap() {
    const foodMapContext = useFoodMapContext();
    const foodMapState = foodMapContext.state;

    const { center, zoom, lastUpdatedCenter, lastUpdatedZoom, foodLocations } =
        foodMapState;

    const filterContext = useFilterContext();
    const filterState = filterContext.state;

    const { updateOnMapMove } = filterState;

    const { fetchFoodLocations } = useFetchFoodMapLocations();

    const { setMapCenter, setMapCenterAndZoom } =
        useFoodMapContextInteractions();

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
            setMapCenter(center);
        };
        navigator.geolocation.getCurrentPosition(
            successFunction,
            () => null,
            geolocationOptions,
        );
    }, [setMapCenter]);

    const shouldFetchNewFoodLocations = ({
        newCenter,
        newZoom,
    }: ShouldFetchNewPizzaLocationsProps) => {
        const initialFetchCheck = !lastUpdatedCenter && !lastUpdatedZoom;
        if (initialFetchCheck) {
            return true;
        }
        const hasAllDimensions =
            lastUpdatedCenter && lastUpdatedZoom && newCenter && newZoom;
        if (hasAllDimensions) {
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
            console.error("Map center or zoom storage error");
            return false;
        }
    };

    const handleCameraChange = (ev: MapCameraChangedEvent) => {
        const { center, zoom } = ev.detail;
        setMapCenterAndZoom(center, zoom);
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
                    fetchFoodLocations().catch((error) => {
                        console.error("Error fetching food locations", error);
                    });
                }
            }
        }
    };

    const handleNewSearchClick = () => {
        try {
            fetchFoodLocations().catch((error) => {
                console.error("Error fetching food locations", error);
            });
        } catch (error) {
            console.error("Error handling new search click", error);
        }
    };

    const handleFoodLocationMouseOver = (id: string) => {
        const cardElement = document.getElementById(`${id}`);
        if (cardElement) {
            cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <Map
            center={center}
            zoom={zoom}
            onCameraChanged={handleCameraChange}
            onTilesLoaded={onTilesLoaded}
            mapId="FOOD_ROULETTE_FOOD_MAP"
            zoomControlOptions={{
                position: ControlPosition.TOP_LEFT,
            }}
            mapTypeControl={false}
            fullscreenControl={false}
            streetViewControlOptions={{
                position: ControlPosition.TOP_LEFT,
            }}
            keyboardShortcuts={true}
            clickableIcons={false}
            controlSize={32}
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
            <MapControl position={ControlPosition.BOTTOM_CENTER}>
                <button
                    className="btn btn-primary mb-5"
                    onClick={handleNewSearchClick}
                >
                    Search This Area
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
                            onClick={() =>
                                handleFoodLocationMouseOver(location.id)
                            }
                        ></AdvancedMarker>
                    );
                } else {
                    return null;
                }
            })}
            <Circle
                center={lastUpdatedCenter}
                radius={(1610 * filterState.maxDistancePercent) / 100}
                strokeColor={"#000000"}
                fillOpacity={0}
                strokeWeight={2}
            />
        </Map>
    );
}

export default FoodMap;
