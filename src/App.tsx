import { APIProvider } from "@vis.gl/react-google-maps";
import ResultsSidebar from "src/components/ResultsSidebar/ResultsSidebar";
import FilterSidebar from "src/components/FilterSidebar/FilterSidebar";
import PreferencesMenu from "./components/PreferencesMenu/PreferencesMenu";
import FoodMapProvider from "./components/FoodMap/FoodMapContextProvider";
import FilterProvider from "./components/FilterSidebar/FilterContextProvider";
import UpdateOnMoveToggle from "./components/UpdateOnMoveToggle/UpdateOnMoveToggle";
import FoodMap from "./components/FoodMap/FoodMap";

import "./App.css";

function App() {
    return (
        <div className="drawer drawer-end flex size-full">
            <APIProvider
                apiKey={`${import.meta.env.VITE_GMAPS_API_KEY}`}
                region="US"
            >
                <FoodMapProvider>
                    <FilterProvider>
                        <input
                            id="filter-drawer"
                            type="checkbox"
                            className="drawer-toggle"
                        />
                        <div className="drawer-content flex size-full flex-col">
                            <div className="navbar bg-primary navbar-height flex justify-between p-4 shadow-sm">
                                <div>Food Roulette</div>
                                <div className="flex flex-row gap-4">
                                    <UpdateOnMoveToggle />
                                    <PreferencesMenu />
                                </div>
                            </div>
                            <div className="map-and-sidebar-container-height-hack flex h-full flex-col-reverse md:h-full md:flex-row">
                                <div className="bg-base-200 flex h-2/3 overflow-y-scroll md:h-full md:w-[600px]">
                                    <ResultsSidebar />
                                </div>
                                <div className="flex h-1/3 flex-col items-center justify-center md:h-full md:w-full">
                                    <FoodMap />
                                </div>
                            </div>
                        </div>
                        <div className="drawer-side lg:drawer-open h-full">
                            <label
                                htmlFor="filter-drawer"
                                aria-label="close sidebar"
                                className="drawer-overlay"
                            />
                            <FilterSidebar />
                        </div>
                    </FilterProvider>
                </FoodMapProvider>
            </APIProvider>
        </div>
    );
}

export default App;
