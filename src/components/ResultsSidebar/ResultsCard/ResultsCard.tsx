import computeDistanceBetweenLatLng from "../../FoodMap/ComputeDistanceBetweenLatLng";
import convertGmapsLatLngToLatLng from "../../FoodMap/ConvertGmapsLatLngToLatLng";
import useFoodMapContextInteractions from "../../FoodMap/FoodMapContextInteractions";

import { useFoodMapContext } from "../../FoodMap/FoodMapContext";

interface ResultsCardProps {
    gmapsLocation: google.maps.places.Place;
}

const upperFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

function ResultsCard({ gmapsLocation }: ResultsCardProps) {
    const foodMapContext = useFoodMapContext();
    const foodMapState = foodMapContext.state;

    const { focusedLocationId, hoveredLocationId, lastUpdatedCenter } =
        foodMapState;

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
            setMapCenterAndZoom(convertedLocationCenter);
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

    // TODO: Separate this out into its own function, logic might be wrong based on weekdayDescriptions indexing
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
            className={`card bg-base-100 shadow-2xl ${generateCardBorderStyle(id)}`}
            id={`${id}`}
        >
            {hasPhotos && photoUrl ? (
                <figure className="md:h-60">
                    <img
                        className="hidden md:block"
                        src={photoUrl}
                        alt={displayName ?? "establishment"}
                    />
                </figure>
            ) : null}
            <div className="card-body flex flex-col">
                <h2 className="card-title text-wrap">{displayName}</h2>

                {currentDayHours ? (
                    <div className="text-wrap">
                        Todays Hours: {currentDayHours}
                    </div>
                ) : null}
                {approximateTimeToWalk && approximateDistance ? (
                    <div className="text-wrap">
                        About {approximateTimeToWalk.toFixed(0)} min walk (
                        {approximateDistance.toFixed(2)} km)
                    </div>
                ) : null}

                <div className="bg-base-100 collapse-plus collapse">
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold">
                        More Details
                    </div>
                    <div className="collapse-content text-sm">
                        {priceLevel ? (
                            <div className="text-wrap">
                                Price Level: {upperFirst(priceLevel)}
                            </div>
                        ) : null}
                        {userRatingCount && rating ? (
                            <div className="text-wrap">
                                Rating: {rating} / 5 (
                                {new Intl.NumberFormat("en-US").format(
                                    userRatingCount,
                                )}{" "}
                                reviews)
                            </div>
                        ) : null}
                        {hasDelivery !== undefined ? (
                            <div className="text-wrap">
                                Delivery Available: {hasDelivery ? "Yes" : "No"}
                            </div>
                        ) : null}
                        {isReservable !== undefined ? (
                            <div className="text-wrap">
                                Reservations Available:{" "}
                                {isReservable ? "Yes" : "No"}
                            </div>
                        ) : null}
                        {hasTakeout !== undefined ? (
                            <div>
                                Takeout Available: {hasTakeout ? "Yes" : "No"}
                            </div>
                        ) : null}
                        <div className="divider" />
                        {formattedAddress ? (
                            <div className="text-wrap">
                                <a>{formattedAddress}</a>
                            </div>
                        ) : null}
                        {nationalPhoneNumber ? (
                            <div className="text-wrap">
                                <a
                                    className="link"
                                    href={`tel:${nationalPhoneNumber}`}
                                >
                                    {nationalPhoneNumber}
                                </a>
                            </div>
                        ) : null}
                        {websiteURI ? (
                            <div className="text-wrap">
                                <a
                                    className="link truncate"
                                    href={websiteURI}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    Website
                                </a>
                            </div>
                        ) : null}
                        {googleMapsURI ? (
                            <div className="text-wrap">
                                <a
                                    className="link"
                                    href={googleMapsURI}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    View On Google
                                </a>
                            </div>
                        ) : null}
                    </div>
                </div>
                <button
                    className="btn btn-primary mr-2"
                    onClick={centerOnLocation}
                >
                    Show On Map
                </button>
            </div>
        </div>
    );
}

export default ResultsCard;
