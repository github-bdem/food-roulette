import GithubLink from "./components/GithubLink";

function App() {
    return (
        <div className="flex h-full w-full flex-col">
            <div className="navbar bg-base-300 flex justify-between p-4 shadow-sm">
                <GithubLink />
                <button className="btn btn-primary p-4">Reroll</button>
            </div>
            <div className="flex h-full flex-col-reverse md:flex-row">
                <div className="bg-base-200 h-1/2 md:h-full md:w-[400px]">
                    SIDE BAR
                </div>
                <div className="flex h-1/2 flex-col items-center justify-center md:h-full md:w-full">
                    MAP
                </div>
            </div>
        </div>
    );
}

export default App;
