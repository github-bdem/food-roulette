import { FilterAction, useFilterContext } from "../filters/FiltersContext";

function UpdateOnMoveToggle() {
    const { state, dispatch } = useFilterContext();

    const { updateOnMapMove } = state;

    const toggleUpdateOnMapMove = () => {
        dispatch({
            type: FilterAction.SET_UPDATE_ON_MAP_MOVE,
            payload: {
                updateOnMapMove: !updateOnMapMove,
            },
        });
    };

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
