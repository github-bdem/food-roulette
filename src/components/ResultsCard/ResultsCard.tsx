import computeDistanceBetweenLatLng from "../FoodMap/ComputeDistanceBetweenLatLng";
import convertGmapsLatLngToLatLng from "../FoodMap/ConvertGmapsLatLngToLatLng";
import { useFoodMapContext } from "../FoodMap/FoodMapContext";

interface ResultsCardProps {
    gmapsLocation: google.maps.places.Place;
}

function ResultsCard({ gmapsLocation }: ResultsCardProps) {
    const { state } = useFoodMapContext();
    const { center } = state;

    // ANYTHING THAT LISTS NEEDING A GET DETAILS REQUEST NEEDS TO BE HIDDEN UNDER THE MORE DROPDOWN
    const {
        displayName,
        photos,
        // regularOpeningHours
        location,
        rating,
        userRatingCount,
        priceLevel,
        websiteURI,
        nationalPhoneNumber,
        formattedAddress,
        googleMapsURI,
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
        <div className="card bg-base-100 shadow-sm">
            {hasPhotos ? (
                <figure>
                    <img className="hidden md:block" src={photoUrl ?? ""} />
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
                <div className="stats stats-horizontal">
                    <div className="stat">
                        <div className="stat-title">Rating</div>
                        <div className="stat-value">{rating}/5</div>

                        {userRatingCount ? (
                            <div className="stat-desc">
                                {new Intl.NumberFormat("en-US").format(
                                    userRatingCount,
                                )}{" "}
                                reviews
                            </div>
                        ) : null}
                    </div>

                    {priceLevel ? (
                        <div className="stat">
                            <div className="stat-title">Price</div>
                            <div className="stat-value">
                                <div className="rating">{priceLevel}/4</div>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="collapse-plus collapse">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title font-semibold">
                        More Information
                    </div>
                    <div className="collapse-content w-full text-end">
                        {/* {isOpenNow ? (
                            <div className="flex flex-row items-center justify-end">
                                <div className="pr-2">Open Now</div>
                                <div className="status status-success animate-bounce" />
                            </div>
                        ) : (
                            <div className="flex flex-row items-center justify-end">
                                <div className="pr-2">Closed</div>
                                <div className="status status-error animate-bounce" />
                            </div>
                        )} */}
                        {websiteURI ? (
                            <div>
                                <a className="link" href={websiteURI}>
                                    {websiteURI}
                                </a>
                            </div>
                        ) : null}
                        <div>
                            <a className="link" href="tel:1234567890">
                                Phone: {nationalPhoneNumber}
                            </a>
                        </div>
                        <div>Address: {formattedAddress}</div>

                        {googleMapsURI ? (
                            <div>
                                <a className="link" href={googleMapsURI}>
                                    More Info on Google
                                </a>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultsCard;
