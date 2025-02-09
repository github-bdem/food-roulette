import FoodMap from "./components/FoodMap";
import { APIProvider } from "@vis.gl/react-google-maps";
import ResultsSidebar from "./components/ResultsSidebar";

import "./App.css";
import { FaGear } from "react-icons/fa6";

function App() {
    return (
        <div className="drawer drawer-end flex size-full">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex size-full flex-col">
                <APIProvider apiKey={`${import.meta.env.VITE_GMAPS_API_KEY}`}>
                    <div className="navbar bg-base-300 navbar-height flex justify-between p-4 shadow-sm">
                        <div>Food Roulette</div>
                        <div>
                            <div className="dropdown">
                                <button className="btn btn-primary p-4">
                                    <FaGear />
                                    Preferences
                                </button>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                                >
                                    <li>
                                        <a>Theme</a>
                                    </li>
                                    <li>
                                        <a>Handedness</a>
                                    </li>
                                    <li>
                                        <a>About</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
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
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <div>FILTERS</div>
                    <div>
                        <div>FOOD TYPE</div>
                        <div></div>
                    </div>
                    <div>
                        <div>DISTANCE</div>
                        <div></div>
                    </div>
                    <div>
                        <div>PRICE RANGE</div>
                        <div></div>
                    </div>
                    <div>
                        <div>OPEN NOW</div>
                        <div></div>
                    </div>
                    <div>
                        <div>RESERVATIONS AVAILABLE</div>
                        <div></div>
                    </div>
                    <div>
                        <div>DELIVERY AVAILABLE</div>
                        <div></div>
                    </div>
                    <div>
                        <div>STAR RANGE</div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
