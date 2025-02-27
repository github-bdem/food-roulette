import useFilterContextInteractions from "../FilterContextInteractions";
import { useFilterContext } from "../FiltersContext";

function AdditionalFilters() {
    const { state } = useFilterContext();

    const {
        includeOpenNow,
        includeReservationsAvailable,
        includeDeliveryAvailable,
        includeTakeawayAvailable,
    } = state;

    const {
        setIncludeOpenNow,
        setIncludeReservationsAvailable,
        setIncludeTakeawayAvailable,
        setIncludeDeliveryAvailable,
    } = useFilterContextInteractions();

    const handleOpenNowToggle = () => {
        if (includeOpenNow) {
            setIncludeOpenNow(false);
        } else {
            setIncludeOpenNow(true);
        }
    };

    const handleIncludeReservationsAvailableToggle = () => {
        if (includeReservationsAvailable) {
            setIncludeReservationsAvailable(false);
        } else {
            setIncludeReservationsAvailable(true);
        }
    };

    const handleIncludeDeliveryAvailableToggle = () => {
        if (includeDeliveryAvailable) {
            setIncludeDeliveryAvailable(false);
        } else {
            setIncludeDeliveryAvailable(true);
        }
    };
    const handleIncludeTakeawayAvailableToggle = () => {
        if (includeTakeawayAvailable) {
            setIncludeTakeawayAvailable(false);
        } else {
            setIncludeTakeawayAvailable(true);
        }
    };

    return (
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
            <legend className="fieldset-legend">Other Options</legend>
            <label className="fieldset-label">
                <input
                    type="checkbox"
                    className="toggle"
                    checked={includeOpenNow}
                    onChange={handleOpenNowToggle}
                />
                Open Now
            </label>
            <label className="fieldset-label">
                <input
                    type="checkbox"
                    className="toggle"
                    checked={includeReservationsAvailable}
                    onChange={handleIncludeReservationsAvailableToggle}
                />
                Reservations Available
            </label>
            <label className="fieldset-label">
                <input
                    type="checkbox"
                    className="toggle"
                    checked={includeDeliveryAvailable}
                    onChange={handleIncludeDeliveryAvailableToggle}
                />
                Delivery Available
            </label>
            <label className="fieldset-label">
                <input
                    type="checkbox"
                    className="toggle"
                    checked={includeTakeawayAvailable}
                    onChange={handleIncludeTakeawayAvailableToggle}
                />
                Takeaway Available
            </label>
        </fieldset>
    );
}

export default AdditionalFilters;
