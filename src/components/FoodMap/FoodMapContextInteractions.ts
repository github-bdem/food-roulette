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
            setMapCenter: (center: latLngPosition) => {
                dispatch({
                    type: FoodMapAction.SET_MAP_CAMERA_VALUES,
                    payload: { center },
                });
            },
            setMapCenterAndZoom: (center: latLngPosition, zoom: number) => {
                dispatch({
                    type: FoodMapAction.SET_MAP_CAMERA_VALUES,
                    payload: { center, zoom },
                });
            },
        }),
        [dispatch],
    );

    return filterContextUpdateActions;
};

export default useFoodMapContextInteractions;
