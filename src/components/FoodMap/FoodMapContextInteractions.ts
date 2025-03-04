import { useMemo } from "react";
import {
    FoodMapAction,
    latLngPosition,
    useFoodMapContext,
} from "./FoodMapContext";

const useFoodMapContextInteractions = () => {
    const { dispatch } = useFoodMapContext();

    const filterContextUpdateActions = useMemo(
        () => ({
            setMapCenterAndZoom: (center?: latLngPosition, zoom?: number) => {
                dispatch({
                    type: FoodMapAction.SET_MAP_CAMERA_VALUES,
                    payload: { center, zoom },
                });
            },
            setFocusedLocationId: (id: string) => {
                dispatch({
                    type: FoodMapAction.SET_FOCUSED_LOCATION_ID,
                    payload: { focusedLocationId: id },
                });
            },
            setHoveredLocationId: (id: string) => {
                dispatch({
                    type: FoodMapAction.SET_HOVERED_LOCATION_ID,
                    payload: { hoveredLocationId: id },
                });
            },
        }),
        [dispatch],
    );

    return filterContextUpdateActions;
};

export default useFoodMapContextInteractions;
