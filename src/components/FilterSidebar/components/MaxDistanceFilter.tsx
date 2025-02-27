function MaxDistanceFilter() {
    return (
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
            <legend className="fieldset-legend">Max Distance</legend>
            <div className="w-full max-w-xs">
                <input
                    type="range"
                    min={0}
                    max="100"
                    className="range"
                    step="25"
                />
                <div className="mt-2 flex justify-between px-2.5 text-xs">
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                </div>
                <div className="mt-2 flex justify-between px-2.5 text-xs">
                    <span>1 mi</span>
                    <span>2 mi</span>
                    <span>3 mi</span>
                    <span>4 mi</span>
                    <span>5 mi</span>
                </div>
            </div>
        </fieldset>
    );
}

export default MaxDistanceFilter;
