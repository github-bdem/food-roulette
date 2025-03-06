import useFilterContextInteractions from "../FilterSidebar/FilterContextInteractions";
import { useFilterContext } from "../FilterSidebar/FiltersContext";

function UpdateOnMoveToggle() {
    const { state } = useFilterContext();

    const { updateOnMapMove } = state;

    const { toggleUpdateOnMapMove } = useFilterContextInteractions();

    return (
        <fieldset className="fieldset flex">
            <label className="fieldset-label">
                Update on map move
                <input
                    data-testid="test-id"
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
