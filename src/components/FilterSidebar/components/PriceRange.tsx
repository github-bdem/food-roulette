import useFilterContextInteractions from "../FilterContextInteractions";
import { useFilterContext } from "../FiltersContext";

function PriceRangeFilter() {
    const { state } = useFilterContext();
    const { minimumPrice } = state;

    const { setMinimumPrice } = useFilterContextInteractions();

    return (
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
            <legend className="fieldset-legend">Min Rating</legend>
            <div className="w-full max-w-xs">
                <input
                    type="range"
                    min={1}
                    max={4}
                    className="range"
                    step="1"
                    value={minimumPrice}
                    onChange={(e) => {
                        setMinimumPrice(Number(e.target.value));
                    }}
                />
                <div className="mt-2 flex justify-between px-2.5 text-xs">
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                </div>
                <div className="mt-2 flex justify-between px-2.5 text-xs">
                    <span>$</span>
                    <span>$$</span>
                    <span>$$$</span>
                    <span>$$$$</span>
                </div>
            </div>
        </fieldset>
    );
}

export default PriceRangeFilter;
