import { useFoodMapContext } from "../FoodMap/FoodMapContext";
import ResultsCard from "./ResultsCard/ResultsCard";

function ResultsSidebar() {
    const { state } = useFoodMapContext();

    const { foodLocations } = state;

    return (
        <>
            {foodLocations?.length ? (
                <div className="flex w-full flex-col">
                    <div className="flex snap-both flex-col gap-3 p-3">
                        {foodLocations?.map(
                            (item: google.maps.places.Place, index: number) => (
                                <ResultsCard
                                    key={`food-result-${item.id}-${index}`}
                                    gmapsLocation={item}
                                />
                            ),
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex w-full flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <div
                            className="mb-6 text-7xl"
                            style={{
                                fontFamily: "Momentz",
                            }}
                        >
                            ?
                        </div>
                        <div>No food locations found</div>
                        <div>
                            Try searching with different{" "}
                            <label
                                htmlFor="filter-drawer"
                                className="drawer-button btn btn-link p-0"
                            >
                                filters
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ResultsSidebar;
