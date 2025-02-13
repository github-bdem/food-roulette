import FoodMap from "./components/map/FoodMap";
import { APIProvider } from "@vis.gl/react-google-maps";
import ResultsSidebar from "@components/results/ResultsSidebar";
import FilterSidebar from "src/components/filters/FilterSidebar";
import PreferencesMenu from "./components/preferencesMenu/PreferencesMenu";

import "./App.css";
import FoodMapProvider from "./components/map/FoodMapContextProvider";

function App() {
    return (
        <div className="drawer drawer-end flex size-full">
            <FoodMapProvider>
                <input
                    id="filter-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex size-full flex-col">
                    <APIProvider
                        apiKey={`${import.meta.env.VITE_GMAPS_API_KEY}`}
                        region="US"
                    >
                        <div className="navbar bg-primary navbar-height flex justify-between p-4 shadow-sm">
                            <div>Food Roulette</div>
                            <PreferencesMenu />
                        </div>
                        <div className="map-and-sidebar-container-height-hack flex h-full flex-col-reverse md:h-full md:flex-row">
                            <div className="bg-base-200 flex h-2/3 overflow-y-scroll md:h-full md:w-[600px]">
                                <ResultsSidebar />
                            </div>
                            <div className="flex h-1/3 flex-col items-center justify-center md:h-full md:w-full">
                                <FoodMap />
                            </div>
                        </div>
                    </APIProvider>
                </div>
                <div className="drawer-side lg:drawer-open h-full">
                    <label
                        htmlFor="filter-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    />
                    <FilterSidebar />
                </div>
            </FoodMapProvider>
        </div>
    );
}

export default App;
