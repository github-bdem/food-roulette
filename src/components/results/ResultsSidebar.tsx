import { useFoodMapContext } from "../map/FoodMapContext";
import ResultsCard from "./ResultsCard";

function ResultsSidebar() {
    const { state } = useFoodMapContext();

    const { foodLocations } = state;

    return (
        <div className="flex w-full flex-col">
            <div className="flex flex-col gap-3 overflow-y-scroll p-3">
                {foodLocations?.map(
                    (item: google.maps.places.PlaceResult, index: number) => (
                        <ResultsCard
                            key={`food-result-${item.name}-${index}`}
                            location={item}
                        />
                    ),
                )}
            </div>
        </div>
    );
}

export default ResultsSidebar;
