import computeDistanceBetweenLatLng from "../FoodMap/ComputeDistanceBetweenLatLng";
import convertGmapsLatLngToLatLng from "../FoodMap/ConvertGmapsLatLngToLatLng";
import { useFoodMapContext } from "../FoodMap/FoodMapContext";
import useFoodMapContextInteractions from "../FoodMap/FoodMapContextInteractions";

interface ResultsCardProps {
    gmapsLocation: google.maps.places.Place;
}

const upperFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

function ResultsCard({ gmapsLocation }: ResultsCardProps) {
    const { state } = useFoodMapContext();
    const { lastUpdatedCenter } = state;

    const foodMapContext = useFoodMapContext();
    const foodMapState = foodMapContext.state;

    const { focusedLocationId, hoveredLocationId } = foodMapState;

    const { setMapCenterAndZoom, setFocusedLocationId, setHoveredLocationId } =
        useFoodMapContextInteractions();

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
        id,
        regularOpeningHours,
    } = gmapsLocation;

    const hasPhotos = photos && photos.length > 0;
    const photoUrl = hasPhotos ? photos[0].getURI() : null;
    const shouldShowDistance = location && lastUpdatedCenter;
    const convertedLocationCenter =
        location && convertGmapsLatLngToLatLng(location);
    const approximateDistance =
        shouldShowDistance && convertedLocationCenter
            ? computeDistanceBetweenLatLng(
                  lastUpdatedCenter,
                  convertedLocationCenter,
              )
            : 0;
    const approximateTimeToWalk = approximateDistance
        ? approximateDistance * 15
        : 0;

    const centerOnLocation = () => {
        if (convertedLocationCenter) {
            setMapCenterAndZoom(convertedLocationCenter, 18);
            const cardElement = document.getElementById(`${id}`);
            if (cardElement) {
                cardElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
                setFocusedLocationId(id);
            }
        }
    };

    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentDayHours =
        regularOpeningHours?.weekdayDescriptions[currentDay].split(": ")[1];

    const generateCardBorderStyle = (id: string) => {
        if (id === focusedLocationId) {
            return "outline-primary outline-2 outline-offset-2";
        } else if (id === hoveredLocationId) {
            return "outline-accent outline-2 outline-offset-2";
        } else {
            return "";
        }
    };

    return (
        <div
            onMouseEnter={() => {
                setHoveredLocationId(id);
            }}
            onMouseLeave={() => setHoveredLocationId("")}
            className={`card bg-base-100 shadow-md ${generateCardBorderStyle(id)}`}
            id={`${id}`}
        >
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
            <div className="card-body overflow-hidden">
                <h2 className="card-title">{displayName}</h2>
                <button
                    className="btn btn-primary mr-2"
                    onClick={centerOnLocation}
                >
                    Show On Map
                </button>
                {currentDayHours ? (
                    <p>Todays Hours: {currentDayHours}</p>
                ) : null}
                {approximateTimeToWalk && approximateDistance ? (
                    <div>
                        About {approximateTimeToWalk.toFixed(0)} min walk (
                        {approximateDistance.toFixed(2)} km)
                    </div>
                ) : null}
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
                {formattedAddress ? (
                    <div>
                        <a className="truncate">{formattedAddress}</a>
                    </div>
                ) : null}
                {nationalPhoneNumber ? (
                    <div>
                        <a className="link" href={`tel:${nationalPhoneNumber}`}>
                            {nationalPhoneNumber}
                        </a>
                    </div>
                ) : null}
                {websiteURI ? (
                    <div>
                        <a className="link truncate" href={websiteURI}>
                            Website
                        </a>
                    </div>
                ) : null}
                {googleMapsURI ? (
                    <a className="link" href={googleMapsURI}>
                        View On Google
                    </a>
                ) : null}
            </div>
        </div>
    );
}

export default ResultsCard;
