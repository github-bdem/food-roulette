import { latLngPosition } from "./FoodMapContext";

const convertDegreesToRadians = (deg: number) => {
    return deg * (Math.PI / 180);
};

const computeDistanceBetweenLatLng = (
    center1: latLngPosition,
    center2: latLngPosition,
) => {
    const lat1 = center1.lat;
    const lng1 = center1.lng;

    const lat2 = center2.lat;
    const lng2 = center2.lng;

    const radiusOfEarth = 6371;
    const latitudinalDistance = convertDegreesToRadians(lat2 - lat1);
    const longitudinalDistance = convertDegreesToRadians(lng2 - lng1);
    const a =
        Math.sin(latitudinalDistance / 2) * Math.sin(latitudinalDistance / 2) +
        Math.cos(convertDegreesToRadians(lat1)) *
            Math.cos(convertDegreesToRadians(lat2)) *
            Math.sin(longitudinalDistance / 2) *
            Math.sin(longitudinalDistance / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radiusOfEarth * c;
};

export default computeDistanceBetweenLatLng;
