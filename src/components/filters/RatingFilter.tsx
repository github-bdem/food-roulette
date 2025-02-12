function RatingFilter() {
    return (
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
            <legend className="fieldset-legend">Rating</legend>
            <div className="rating">
                <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    aria-label="1 star"
                />
                <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    aria-label="2 star"
                />
                <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    aria-label="3 star"
                    defaultChecked
                />
                <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    aria-label="4 star"
                />
                <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    aria-label="5 star"
                />
            </div>
        </fieldset>
    );
}

export default RatingFilter;
