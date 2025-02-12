import ResultsCard from "./ResultsCard";

function ResultsSidebar() {
    return (
        <div className="flex w-full flex-col">
            <div className="flex flex-col gap-3 overflow-y-scroll p-3">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: number) => (
                    <ResultsCard key={item.toString()} />
                ))}
            </div>
        </div>
    );
}

export default ResultsSidebar;
