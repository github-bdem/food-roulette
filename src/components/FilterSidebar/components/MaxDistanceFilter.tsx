import { useState } from "react";
import useFilterContextInteractions from "../FilterContextInteractions";
import { useFilterContext } from "../FiltersContext";

function MaxDistanceFilter() {
    const { state } = useFilterContext();
    const { maxDistancePercent } = state;

    const { setMaxDistancePercent } = useFilterContextInteractions();

    const [carModeEnabled, setCarModeEnabled] = useState(false);

    return (
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
            <legend className="fieldset-legend">Max Distance</legend>
            <label className="fieldset-label mb-4 flex w-full justify-end">
                Car Mode Enabled
                <input
                    type="checkbox"
                    checked={carModeEnabled}
                    onChange={() => {
                        setCarModeEnabled(!carModeEnabled);
                        if (carModeEnabled) {
                            setMaxDistancePercent(50);
                        } else {
                            setMaxDistancePercent(500);
                        }
                    }}
                    className="toggle"
                />
            </label>
            <div className="w-full max-w-xs">
                <input
                    type="range"
                    min={carModeEnabled ? 100 : 25}
                    max={carModeEnabled ? 1000 : 100}
                    className="range"
                    step={carModeEnabled ? 100 : 25}
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
                    {carModeEnabled ? (
                        <>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                        </>
                    ) : null}
                </div>
                <div className="mt-2 flex justify-between px-2.5 text-xs">
                    <span>{carModeEnabled ? "1 mi" : "1/4 mi"}</span>
                    <span>{carModeEnabled ? "2 mi" : "1/2 mi"}</span>
                    <span>{carModeEnabled ? "3 mi" : "3/4 mi"}</span>
                    <span>{carModeEnabled ? "4 mi" : "1 mi"}</span>
                    {carModeEnabled ? (
                        <>
                            <span>5 mi</span>
                            <span>6 mi</span>
                            <span>7 mi</span>
                            <span>8 mi</span>
                            <span>9 mi</span>
                            <span>10 mi</span>
                        </>
                    ) : null}
                </div>
            </div>
        </fieldset>
    );
}

export default MaxDistanceFilter;
