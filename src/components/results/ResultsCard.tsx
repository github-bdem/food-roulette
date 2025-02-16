import computeDistanceBetweenLatLng from "../map/ComputeDistanceBetweenLatLng";
import convertGmapsLatLngToLatLng from "../map/ConvertGmapsLatLngToLatLng";
import { useFoodMapContext } from "../map/FoodMapContext";

interface ResultsCardProps {
    location: google.maps.places.PlaceResult;
}

function ResultsCard({ location }: ResultsCardProps) {
    const { state } = useFoodMapContext();
    const { center } = state;

    // ANYTHING THAT LISTS NEEDING A GET DETAILS REQUEST NEEDS TO BE HIDDEN UNDER THE MORE DROPDOWN
    const {
        address_components,
        adr_address,
        aspects,
        business_status,
        formatted_address,
        formatted_phone_number,
        geometry,
        html_attributions,
        icon,
        icon_background_color,
        icon_mask_base_uri,
        international_phone_number,
        name,
        opening_hours,
        photos,
        place_id,
        plus_code,
        price_level,
        rating,
        reviews,
        types,
        url,
        user_ratings_total,
        utc_offset_minutes,
        vicinity,
        website,
    } = location;

    const isOpenNow = opening_hours?.isOpen();

    const hasPhotos = photos && photos.length > 0;
    const photoUrl = hasPhotos ? photos[0].getUrl() : null;
    const shouldShowDistance = geometry?.location && center;
    const convertedLocationCenter =
        geometry?.location && convertGmapsLatLngToLatLng(geometry?.location);
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
                <h2 className="card-title">{name}</h2>
                <div className="flex flex-row justify-between">
                    <div>About {approximateTimeToWalk.toFixed(0)} min walk</div>
                    <div>{approximateDistance.toFixed(2)} km</div>
                </div>
                <div className="stats stats-horizontal">
                    <div className="stat">
                        <div className="stat-title">Rating</div>
                        <div className="stat-value">{rating}/5</div>
                    </div>

                    {user_ratings_total ? (
                        <div className="stat">
                            <div className="stat-title">Reviews</div>
                            <div className="stat-value">
                                {new Intl.NumberFormat("en-US").format(
                                    user_ratings_total,
                                )}
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
                        {isOpenNow ? (
                            <div className="flex flex-row items-center justify-end">
                                <div className="pr-2">Open Now</div>
                                <div className="status status-success animate-bounce" />
                            </div>
                        ) : (
                            <div className="flex flex-row items-center justify-end">
                                <div className="pr-2">Closed</div>
                                <div className="status status-error animate-bounce" />
                            </div>
                        )}
                        <div>
                            <a className="link" href={website}>
                                {website}
                            </a>
                        </div>
                        <div>
                            <a className="link" href="tel:1234567890">
                                Phone: {formatted_phone_number}
                            </a>
                        </div>
                        <div>Address: {formatted_address}</div>

                        <div>
                            <a className="link" href={url}>
                                More Info on Google
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultsCard;
