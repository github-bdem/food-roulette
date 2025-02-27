import useFilterContextInteractions from "../FilterContextInteractions";
import { useFilterContext } from "../FiltersContext";

function MaxDistanceFilter() {
    const { state } = useFilterContext();
    const { maxDistancePercent } = state;

    const { setMaxDistancePercent } = useFilterContextInteractions();

    return (
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
            <legend className="fieldset-legend">Max Distance</legend>
            <div className="w-full max-w-xs">
                <input
                    type="range"
                    min={25}
                    max="100"
                    className="range"
                    step="25"
                    value={maxDistancePercent}
                    onChange={(e) => {
                        setMaxDistancePercent(Number(e.target.value));
                    }}
                />
                <div className="mt-2 flex justify-between px-2.5 text-xs">
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                </div>
                <div className="mt-2 flex justify-between px-2.5 text-xs">
                    <span>1/2 mi</span>
                    <span>1 mi</span>
                    <span>1.5 mi</span>
                    <span>2 mi</span>
                </div>
            </div>
        </fieldset>
    );
}

export default MaxDistanceFilter;
