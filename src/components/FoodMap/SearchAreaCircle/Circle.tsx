import {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";

import type { Ref } from "react";
import { GoogleMapsContext, latLngEquals } from "@vis.gl/react-google-maps";

export type CircleProps = google.maps.CircleOptions;

export type CircleRef = Ref<google.maps.Circle | null>;

function useCircle(props: CircleProps) {
    const { radius, center, ...circleOptions } = props;

    const circle = useRef(new google.maps.Circle()).current;
    circle.setOptions(circleOptions);

    useEffect(() => {
        if (!center) return;
        if (!latLngEquals(center, circle.getCenter())) circle.setCenter(center);
    }, [center, circle]);

    useEffect(() => {
        if (radius === undefined || radius === null) return;
        if (radius !== circle.getRadius()) circle.setRadius(radius);
    }, [radius, circle]);

    const map = useContext(GoogleMapsContext)?.map;

    // create circle instance and add to the map once the map is available
    useEffect(() => {
        if (!map) {
            if (map === undefined)
                console.error("<Circle> has to be inside a Map component.");

            return;
        }

        circle.setMap(map);

        return () => {
            circle.setMap(null);
        };
    }, [map, circle]);

    return circle;
}

/**
 * Component to render a circle on a map
 */
export const Circle = forwardRef((props: CircleProps, ref: CircleRef) => {
    const circle = useCircle(props);

    useImperativeHandle(ref, () => circle);

    return null;
});

// Add displayName for debugging purposes
Circle.displayName = "Circle";
