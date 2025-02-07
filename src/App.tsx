import FoodMap from "./components/FoodMap";
import { APIProvider } from "@vis.gl/react-google-maps";
import ResultsSidebar from "./components/ResultsSidebar";

import "./App.css";
import { FaGear } from "react-icons/fa6";

function App() {
    return (
        <div className="flex size-full flex-col">
            <APIProvider apiKey={`${import.meta.env.VITE_GMAPS_API_KEY}`}>
                <div className="navbar bg-base-300 navbar-height flex justify-between p-4 shadow-sm">
                    <div>Food Roulette</div>
                    <button className="btn btn-primary p-4">
                        <FaGear />
                        Preferences
                    </button>
                </div>
                <div className="map-and-sidebar-container-height-hack flex h-full flex-col-reverse md:h-full md:flex-row">
                    <div className="bg-base-200 flex h-1/2 overflow-y-scroll md:h-full md:w-[450px]">
                        <ResultsSidebar />
                    </div>
                    <div className="flex h-1/2 flex-col items-center justify-center md:h-full md:w-full">
                        <FoodMap />
                    </div>
                </div>
            </APIProvider>
        </div>
    );
}

export default App;
