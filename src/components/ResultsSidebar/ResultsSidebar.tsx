import { useFoodMapContext } from "../FoodMap/FoodMapContext";
import ResultsCard from "../ResultsCard/ResultsCard";

function ResultsSidebar() {
    const { state } = useFoodMapContext();

    const { foodLocations } = state;

    return (
        <div className="flex w-full flex-col">
            <div className="flex flex-col gap-3 overflow-y-scroll p-3">
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
    );
}

export default ResultsSidebar;
