import useFilterContextInteractions from "../FilterContextInteractions";
import { useFilterContext } from "../FiltersContext";

function RatingFilter() {
    const { state } = useFilterContext();
    const { minimumRating } = state;

    const { setMinimumRating } = useFilterContextInteractions();

    return (
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
            <legend className="fieldset-legend">Min Rating</legend>
            <div className="w-full max-w-xs">
                <input
                    type="range"
                    min={1}
                    max={5}
                    className="range"
                    step="1"
                    value={minimumRating}
                    onChange={(e) => {
                        setMinimumRating(Number(e.target.value));
                    }}
                />
                <div className="mt-2 flex justify-between px-2.5 text-xs">
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                </div>
                <div className="mt-2 flex justify-between px-2.5 text-xs">
                    <span>1 star</span>
                    <span>2 star</span>
                    <span>3 star</span>
                    <span>4 star</span>
                    <span>5 star</span>
                </div>
            </div>
        </fieldset>
    );
}

export default RatingFilter;
