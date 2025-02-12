import { useEffect } from "react";
import {
    ControlPosition,
    Map,
    MapCameraChangedEvent,
    MapControl,
} from "@vis.gl/react-google-maps";
import {
    FoodMapAction,
    useFoodMapContext,
    latLngPosition,
} from "./FoodMapContext";

function FoodMap() {
    const { state, dispatch } = useFoodMapContext();

    const { mapCenter, zoom } = state;
    useEffect(() => {
        const geolocationOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        const successFunction = (pos: GeolocationPosition) => {
            const position = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            } as latLngPosition;
            dispatch({
                type: FoodMapAction.SET_MAP_CENTER,
                payload: { mapCenter: position },
            });
        };
        navigator.geolocation.getCurrentPosition(
            successFunction,
            () => null,
            geolocationOptions,
        );
    }, [dispatch]);

    const handleCameraChange = (ev: MapCameraChangedEvent) => {
        const { center, zoom } = ev.detail;
        dispatch({
            type: FoodMapAction.SET_MAP_CAMERA_VALUES,
            payload: { mapCenter: center, zoom },
        });
    };

    return (
        <Map
            center={mapCenter}
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
