import { latLngPosition } from "./FoodMapContext";

const convertGmapsLatLngToLatLng = (
    gmapsLatLng: google.maps.LatLng,
): latLngPosition | null => {
    let convertedLatLng = null;
    if (gmapsLatLng) {
        convertedLatLng = {
            lat: gmapsLatLng.lat(),
            lng: gmapsLatLng.lng(),
        };
    }
    return convertedLatLng;
};

export default convertGmapsLatLngToLatLng;
