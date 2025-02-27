import useFilterContextInteractions from "../filters/FilterContextInteractions";
import { useFilterContext } from "../filters/FiltersContext";

function UpdateOnMoveToggle() {
    const { state } = useFilterContext();

    const { updateOnMapMove } = state;

    const { toggleUpdateOnMapMove } = useFilterContextInteractions();

    return (
        <fieldset className="fieldset flex">
            <label className="fieldset-label">
                Update on map move
                <input
                    type="checkbox"
                    checked={updateOnMapMove}
                    onChange={toggleUpdateOnMapMove}
                    className="toggle"
                />
            </label>
        </fieldset>
    );
}

export default UpdateOnMoveToggle;
