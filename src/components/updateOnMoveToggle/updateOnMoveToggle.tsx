import { FoodMapAction, useFoodMapContext } from "../map/FoodMapContext";

function UpdateOnMoveToggle() {
    const { state, dispatch } = useFoodMapContext();

    const { updateOnMapMove } = state;

    const toggleUpdateOnMapMove = () => {
        dispatch({
            type: FoodMapAction.SET_UPDATE_ON_MAP_MOVE,
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
