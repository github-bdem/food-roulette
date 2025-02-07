import React, { useState, useEffect } from "react";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";

function FoodMap() {
    // TODO: CONTINUE FROM HERE, ALSO REMEMBER: ADD A DELIVERY TOGGLE TO THE MAIN PAGE... AND NOT FUCKIN DOORDASH
    // https://react.dev/learn/scaling-up-with-reducer-and-context
    const position = { lat: 53.54992, lng: 10.00678 };
    useEffect(() => {
        const geolocationOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        const successFunction = (pos) => {
            const position = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            };
            setInitialMapCenter(position);
            setCurrentRequestCenter(position);
            setInitialLoading(false);
        };
        navigator.geolocation.getCurrentPosition(
            successFunction,
            () => setInitialLoading(false),
            geolocationOptions,
        );
    }, []);

    return (
        <Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID">
            <AdvancedMarker position={position} />
        </Map>
    );
}

export default FoodMap;
