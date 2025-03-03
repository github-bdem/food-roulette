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

    const {
        center,
        zoom,
        lastUpdatedCenter,
        lastUpdatedZoom,
        foodLocations,
        lastUpdatedRadius,
        focusedLocationId,
        hoveredLocationId,
    } = foodMapState;

    const filterContext = useFilterContext();
    const filterState = filterContext.state;

    const { updateOnMapMove } = filterState;

    const { fetchFoodLocations } = useFetchFoodMapLocations();

    const {
        setMapCenter,
        setMapCenterAndZoom,
        setFocusedLocationId,
        setHoveredLocationId,
    } = useFoodMapContextInteractions();

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

    const handleFoodLocationClick = (id: string) => {
        const cardElement = document.getElementById(`${id}`);
        if (cardElement) {
            cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
            setFocusedLocationId(id);
        }
    };

    const handleFoodLocationMouseEnter = (id: string) => {
        setHoveredLocationId(id);
        const cardElement = document.getElementById(`${id}`);
        if (cardElement) {
            cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const handleFoodLocaionMouseLeave = () => {
        setHoveredLocationId("");
    };

    const generateFoodLocationColor = (id: string) => {
        if (id === focusedLocationId) {
            return "#034852";
        } else if (id === hoveredLocationId) {
            return "#a389";
        } else {
            return "#0f9d58";
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
                            onMouseEnter={() =>
                                handleFoodLocationMouseEnter(location.id)
                            }
                            onMouseLeave={handleFoodLocaionMouseLeave}
                            key={location.id}
                            position={convertedLocationCenter}
                            onClick={() => handleFoodLocationClick(location.id)}
                        >
                            <Pin
                                background={generateFoodLocationColor(
                                    location.id,
                                )}
                                borderColor={"#006425"}
                                glyphColor={"#60d98f"}
                            />
                        </AdvancedMarker>
                    );
                } else {
                    return null;
                }
            })}
            {lastUpdatedCenter && lastUpdatedRadius ? (
                <Circle
                    center={lastUpdatedCenter}
                    radius={lastUpdatedRadius}
                    strokeColor={"#000000"}
                    fillOpacity={0}
                    strokeWeight={2}
                />
            ) : null}
        </Map>
    );
}

export default FoodMap;
