function AdditionalFilters() {
    return (
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
            <legend className="fieldset-legend">Other Options</legend>
            <label className="fieldset-label">
                <input type="checkbox" defaultChecked className="toggle" />
                Open Now
            </label>
            <label className="fieldset-label">
                <input type="checkbox" defaultChecked className="toggle" />
                Reservations Available
            </label>
            <label className="fieldset-label">
                <input type="checkbox" defaultChecked className="toggle" />
                Delivery Available
            </label>
        </fieldset>
    );
}

export default AdditionalFilters;
