import computeDistanceBetweenLatLng from "../FoodMap/ComputeDistanceBetweenLatLng";
import convertGmapsLatLngToLatLng from "../FoodMap/ConvertGmapsLatLngToLatLng";
import { useFoodMapContext } from "../FoodMap/FoodMapContext";

interface ResultsCardProps {
    gmapsLocation: google.maps.places.Place;
}

const upperFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

function ResultsCard({ gmapsLocation }: ResultsCardProps) {
    const { state } = useFoodMapContext();
    const { center } = state;

    // ANYTHING THAT LISTS NEEDING A GET DETAILS REQUEST NEEDS TO BE HIDDEN UNDER THE MORE DROPDOWN
    const {
        displayName,
        photos,
        location,
        rating,
        userRatingCount,
        priceLevel,
        websiteURI,
        nationalPhoneNumber,
        formattedAddress,
        googleMapsURI,
        hasDelivery,
        isReservable,
        hasTakeout,
    } = gmapsLocation;

    const hasPhotos = photos && photos.length > 0;
    const photoUrl = hasPhotos ? photos[0].getURI() : null;
    const shouldShowDistance = location && center;
    const convertedLocationCenter =
        location && convertGmapsLatLngToLatLng(location);
    const approximateDistance =
        shouldShowDistance && convertedLocationCenter
            ? computeDistanceBetweenLatLng(center, convertedLocationCenter)
            : 0;
    const approximateTimeToWalk = approximateDistance
        ? approximateDistance * 15
        : 0;

    return (
        <div className="card bg-base-100 shadow-md">
            {hasPhotos && photoUrl ? (
                <figure className="h-60">
                    <img
                        className="block"
                        src={photoUrl}
                        alt={displayName ?? "establishment"}
                    />
                </figure>
            ) : (
                <div className="bg-neutral text-neutral-content w-24 rounded-full">
                    <span className="text-3xl">D</span>
                </div>
            )}
            <div className="card-body">
                <h2 className="card-title">{displayName}</h2>
                <div className="flex flex-row justify-between">
                    <div>About {approximateTimeToWalk.toFixed(0)} min walk</div>
                    <div>{approximateDistance.toFixed(2)} km</div>
                </div>
                {priceLevel ? (
                    <div>Price Level: {upperFirst(priceLevel)}</div>
                ) : null}
                {userRatingCount && rating ? (
                    <div>
                        Rating: {rating} / 5 (
                        {new Intl.NumberFormat("en-US").format(userRatingCount)}{" "}
                        reviews)
                    </div>
                ) : null}
                {hasDelivery !== undefined ? (
                    <div>Delivery Available: {hasDelivery ? "Yes" : "No"}</div>
                ) : null}
                {isReservable !== undefined ? (
                    <div>
                        Reservations Available: {isReservable ? "Yes" : "No"}
                    </div>
                ) : null}
                {hasTakeout !== undefined ? (
                    <div>Takeout Available: {hasTakeout ? "Yes" : "No"}</div>
                ) : null}
                <div className="divider" />
                {nationalPhoneNumber ? (
                    <div>
                        <a className="link" href={`tel:${nationalPhoneNumber}`}>
                            {nationalPhoneNumber}
                        </a>
                    </div>
                ) : null}
                {formattedAddress && googleMapsURI ? (
                    <a className="link" href={googleMapsURI}>
                        {formattedAddress}
                    </a>
                ) : null}
                {websiteURI ? (
                    <div>
                        <a className="link truncate" href={websiteURI}>
                            Website Link
                        </a>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default ResultsCard;
