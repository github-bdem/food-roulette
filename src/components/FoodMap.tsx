import { useEffect } from "react";
import {
    AdvancedMarker,
    ControlPosition,
    Map,
    MapControl,
} from "@vis.gl/react-google-maps";

function FoodMap() {
    // https://react.dev/learn/scaling-up-with-reducer-and-context
    const position = { lat: 53.54992, lng: 10.00678 };
    useEffect(() => {
        // const geolocationOptions = {
        //     enableHighAccuracy: true,
        //     timeout: 5000,
        //     maximumAge: 0,
        // };
        // const successFunction = (pos) => {
        //     const position = {
        //         lat: pos.coords.latitude,
        //         lng: pos.coords.longitude,
        //     };
        //     setInitialMapCenter(position);
        //     setCurrentRequestCenter(position);
        //     setInitialLoading(false);
        // };
        // navigator.geolocation.getCurrentPosition(
        //     successFunction,
        //     () => setInitialLoading(false),
        //     geolocationOptions,
        // );
    }, []);

    return (
        <Map
            defaultCenter={position}
            defaultZoom={10}
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
                    htmlFor="my-drawer-4"
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
            <AdvancedMarker position={position} />
        </Map>
    );
}

export default FoodMap;
