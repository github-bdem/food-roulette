import { useEffect, useState } from "react";
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

import "./FoodMap.css";

const minimumCenterDeltaToTriggerUpdate = 2; // Delta is expressed in km
const minimumZoomLevelDeltaToTriggerUpdate = 2;

interface ShouldFetchNewFoodLocationsProps {
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

    const { setMapCenterAndZoom, setFocusedLocationId, setHoveredLocationId } =
        useFoodMapContextInteractions();

    const [totalFoodLocationCallCount, setTotalFoodLocationCallCount] =
        useState<number>(0);

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
            {
                setMapCenterAndZoom(center);
            }
        };
        navigator.geolocation.getCurrentPosition(
            successFunction,
            () => null,
            geolocationOptions,
        );
    }, [setMapCenterAndZoom]);

    const shouldFetchNewFoodLocations = ({
        newCenter,
        newZoom,
    }: ShouldFetchNewFoodLocationsProps) => {
        const initialFetchCheck =
            (!lastUpdatedCenter && !lastUpdatedZoom) ||
            totalFoodLocationCallCount < 2;
        if (initialFetchCheck) {
            setTotalFoodLocationCallCount(totalFoodLocationCallCount + 1);
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

    const handleSearchThisAreaClick = () => {
        try {
            fetchFoodLocations().catch((error) => {
                console.error("Error fetching food locations", error);
            });
        } catch (error) {
            console.error("Error handling new search click", error);
        }
    };

    const handlePickForMeClick = () => {
        if (foodLocations?.length) {
            pickRandomLocation();
        } else {
            try {
                fetchFoodLocations()
                    .then(() => pickRandomLocation())
                    .catch((error) => {
                        console.error("Error fetching food locations", error);
                    });
            } catch (error) {
                console.error("Error handling new search click", error);
            }
        }
    };

    const scrollCardIntoView = (id: string) => {
        const cardElement = document.getElementById(`${id}`);
        if (cardElement) {
            cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const handleFoodLocationClick = (
        id: string,
        convertedLocationCenter: latLngPosition | null,
    ) => {
        scrollCardIntoView(id);
        setFocusedLocationId(id);
        if (convertedLocationCenter) {
            setMapCenterAndZoom(convertedLocationCenter, 18);
        }
    };

    const handleFoodLocationMouseEnter = (id: string) => {
        scrollCardIntoView(id);
        setHoveredLocationId(id);
    };

    const handleFoodLocationMouseLeave = () => {
        setHoveredLocationId("");
    };

    const generateFoodLocationStyle = (
        id: string,
        includeAnimation?: boolean,
    ) => {
        if (id === focusedLocationId) {
            return `marker-primary ${includeAnimation ? "animate-ping absolute" : "relative"}`;
        } else if (id === hoveredLocationId) {
            return `marker-accent ${includeAnimation ? "animate-ping absolute" : "relative"}`;
        } else {
            return `marker-secondary ${includeAnimation ? "absolute" : "relative"}`;
        }
    };

    const pickRandomLocation = () => {
        if (foodLocations) {
            const randomlySelectedLocationIndex = Math.floor(
                Math.random() * foodLocations.length,
            );
            const randomlySelectedLocation =
                foodLocations[randomlySelectedLocationIndex];

            const { id, location } = randomlySelectedLocation;

            if (location) {
                const convertedLocationCenter =
                    convertGmapsLatLngToLatLng(location);
                if (convertedLocationCenter) {
                    setMapCenterAndZoom(convertedLocationCenter, 18);
                }
            }
            scrollCardIntoView(id);
            setFocusedLocationId(id);
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
            <MapControl position={ControlPosition.TOP_CENTER}>
                <button
                    className="btn btn-accent mt-5"
                    onClick={handleSearchThisAreaClick}
                >
                    Search This Area
                </button>
            </MapControl>
            <MapControl position={ControlPosition.BOTTOM_CENTER}>
                <button
                    className="btn btn-primary mb-5"
                    onClick={handlePickForMeClick}
                >
                    Pick For Me
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
                            onMouseLeave={handleFoodLocationMouseLeave}
                            key={location.id}
                            position={convertedLocationCenter}
                            onClick={() =>
                                handleFoodLocationClick(
                                    location.id,
                                    convertedLocationCenter,
                                )
                            }
                        >
                            <div
                                className={generateFoodLocationStyle(
                                    location.id,
                                    true,
                                )}
                            />
                            <div
                                className={generateFoodLocationStyle(
                                    location.id,
                                )}
                            />
                        </AdvancedMarker>
                    );
                } else {
                    return null;
                }
            })}
            <AdvancedMarker position={lastUpdatedCenter}>
                <div className="text-3xl">+</div>
            </AdvancedMarker>
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
