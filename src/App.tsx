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
            <div className="drawer-side lg:drawer-open h-full">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="bg-base-200 text-base-content h-full w-full md:w-[450px]">
                    <div className="navbar bg-base-300 navbar-height flex justify-between p-4 shadow-sm">
                        <div>FILTERS</div>
                        <label
                            htmlFor="my-drawer-4"
                            className="drawer-button btn btn-primary mr-4"
                        >
                            Close
                        </label>
                    </div>
                    <div className="filter-sidebar-height flex h-5 w-full flex-col items-center gap-4 overflow-scroll p-4">
                        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
                            <legend className="fieldset-legend">
                                Food Type
                            </legend>
                            <label className="fieldset-label">
                                <input type="checkbox" className="checkbox" />
                                Chicken
                            </label>
                            <label className="fieldset-label">
                                <input type="checkbox" className="checkbox" />
                                Mexican
                            </label>
                            <label className="fieldset-label">
                                <input type="checkbox" className="checkbox" />
                                Asian
                            </label>
                            <label className="fieldset-label">
                                <input type="checkbox" className="checkbox" />
                                Pizza
                            </label>
                            <label className="fieldset-label">
                                <input type="checkbox" className="checkbox" />
                                Salads
                            </label>
                            <label className="fieldset-label">
                                <input type="checkbox" className="checkbox" />
                                Burgers
                            </label>
                            <label className="fieldset-label">
                                <input type="checkbox" className="checkbox" />
                                Ramen
                            </label>
                            <label className="fieldset-label">
                                <input type="checkbox" className="checkbox" />
                                Indian
                            </label>
                            <label className="fieldset-label">
                                <input type="checkbox" className="checkbox" />
                                Sushi
                            </label>
                            <label className="fieldset-label">
                                <input type="checkbox" className="checkbox" />
                                Vegan
                            </label>
                            <label className="fieldset-label">
                                <input type="checkbox" className="checkbox" />
                                American
                            </label>
                        </fieldset>
                        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
                            <legend className="fieldset-legend">
                                Max Distance
                            </legend>
                            <div className="w-full max-w-xs">
                                <input
                                    type="range"
                                    min={0}
                                    max="100"
                                    className="range"
                                    step="25"
                                />
                                <div className="mt-2 flex justify-between px-2.5 text-xs">
                                    <span>|</span>
                                    <span>|</span>
                                    <span>|</span>
                                    <span>|</span>
                                    <span>|</span>
                                </div>
                                <div className="mt-2 flex justify-between px-2.5 text-xs">
                                    <span>1 mi</span>
                                    <span>2 mi</span>
                                    <span>3 mi</span>
                                    <span>4 mi</span>
                                    <span>5 mi</span>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
                            <legend className="fieldset-legend">
                                Other Options
                            </legend>
                            <label className="fieldset-label">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="toggle"
                                />
                                Open Now
                            </label>
                            <label className="fieldset-label">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="toggle"
                                />
                                Reservations Available
                            </label>
                            <label className="fieldset-label">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="toggle"
                                />
                                Delivery Available
                            </label>
                        </fieldset>
                        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
                            <legend className="fieldset-legend">Rating</legend>
                            <div className="rating">
                                <input
                                    type="radio"
                                    name="rating-1"
                                    className="mask mask-star"
                                    aria-label="1 star"
                                />
                                <input
                                    type="radio"
                                    name="rating-1"
                                    className="mask mask-star"
                                    aria-label="2 star"
                                />
                                <input
                                    type="radio"
                                    name="rating-1"
                                    className="mask mask-star"
                                    aria-label="3 star"
                                    defaultChecked
                                />
                                <input
                                    type="radio"
                                    name="rating-1"
                                    className="mask mask-star"
                                    aria-label="4 star"
                                />
                                <input
                                    type="radio"
                                    name="rating-1"
                                    className="mask mask-star"
                                    aria-label="5 star"
                                />
                            </div>
                        </fieldset>
                        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-5/6 border p-4">
                            <legend className="fieldset-legend">
                                Price Range
                            </legend>
                            <div className="rating">
                                <input
                                    type="radio"
                                    name="rating-1"
                                    className="mask mask-star"
                                    aria-label="1 star"
                                />
                                <input
                                    type="radio"
                                    name="rating-1"
                                    className="mask mask-star"
                                    aria-label="2 star"
                                />
                                <input
                                    type="radio"
                                    name="rating-1"
                                    className="mask mask-star"
                                    aria-label="3 star"
                                    defaultChecked
                                />
                            </div>
                        </fieldset>
                    </div>
                    <div className="navbar bg-base-300 navbar-height flex justify-between p-4 shadow-sm">
                        <label
                            htmlFor="my-drawer-4"
                            className="drawer-button btn btn-primary mr-4"
                            onClick={() => window.alert("blah")}
                        >
                            Reroll
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
