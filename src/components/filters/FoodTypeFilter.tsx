function FoodTypeFilter() {
    return (
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
            <legend className="fieldset-legend">Food Type</legend>
            <label className="fieldset-label">
                <input type="checkbox" className="checkbox" />
                Chicken
            </label>
            <label className="fieldset-label">
                <input type="checkbox" className="checkbox" />
                Mexican
            </label>
            <label className="fieldset-label">
                <input type="checkbox" className="checkbox" />
                Asian
            </label>
            <label className="fieldset-label">
                <input type="checkbox" className="checkbox" />
                Pizza
            </label>
            <label className="fieldset-label">
                <input type="checkbox" className="checkbox" />
                Salads
            </label>
            <label className="fieldset-label">
                <input type="checkbox" className="checkbox" />
                Burgers
            </label>
            <label className="fieldset-label">
                <input type="checkbox" className="checkbox" />
                Ramen
            </label>
            <label className="fieldset-label">
                <input type="checkbox" className="checkbox" />
                Indian
            </label>
            <label className="fieldset-label">
                <input type="checkbox" className="checkbox" />
                Sushi
            </label>
            <label className="fieldset-label">
                <input type="checkbox" className="checkbox" />
                Vegan
            </label>
            <label className="fieldset-label">
                <input type="checkbox" className="checkbox" />
                American
            </label>
        </fieldset>
    );
}

export default FoodTypeFilter;
