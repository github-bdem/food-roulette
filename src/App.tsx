import GithubLink from "./components/GithubLink";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

function App() {
    const position = { lat: 53.54992, lng: 10.00678 };
    const gmapsApiKey = `${import.meta.env.VITE_GMAPS_API_KEY}`;

    return (
        <div className="flex h-full w-full flex-col">
            <APIProvider apiKey={gmapsApiKey}>
                <div className="navbar bg-base-300 flex justify-between p-4 shadow-sm">
                    <GithubLink />
                    <button className="btn btn-primary p-4">Reroll</button>
                </div>
                <div className="flex h-full flex-col-reverse md:flex-row">
                    <div className="bg-base-200 h-1/2 md:h-full md:w-[400px]">
                        SIDE BAR
                    </div>
                    <div className="flex h-1/2 flex-col items-center justify-center md:h-full md:w-full">
                        <Map
                            defaultCenter={position}
                            defaultZoom={10}
                            mapId="DEMO_MAP_ID"
                        >
                            <AdvancedMarker position={position} />
                        </Map>
                    </div>
                </div>
            </APIProvider>
        </div>
    );
}

export default App;
