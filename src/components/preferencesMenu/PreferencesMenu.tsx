import { FaGear } from "react-icons/fa6";

function PreferencesMenu() {
    return (
        <div className="dropdown dropdown-end">
            <button className="btn btn-accent mr-2">
                <FaGear />
                Preferences
            </button>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
                <li>
                    <details>
                        <summary>Theme</summary>
                        <ul>
                            <li>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="theme-radios"
                                        className="radio radio-sm theme-controller"
                                        value="foodie"
                                    />
                                    Default
                                </label>
                            </li>
                            <li>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="theme-radios"
                                        className="radio radio-sm theme-controller"
                                        value="dark"
                                    />
                                    Dark
                                </label>
                            </li>
                            <li>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="theme-radios"
                                        className="radio radio-sm theme-controller"
                                        value="light"
                                    />
                                    Light
                                </label>
                            </li>
                            <li>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="theme-radios"
                                        className="radio radio-sm theme-controller"
                                        value="bumblebee"
                                    />
                                    Bumblebee
                                </label>
                            </li>
                            <li>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="theme-radios"
                                        className="radio radio-sm theme-controller"
                                        value="retro"
                                    />
                                    Retro
                                </label>
                            </li>
                            <li>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="theme-radios"
                                        className="radio radio-sm theme-controller"
                                        value="cyberpunk"
                                    />
                                    Cyberpunk
                                </label>
                            </li>
                            <li>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="theme-radios"
                                        className="radio radio-sm theme-controller"
                                        value="pastel"
                                    />
                                    Pastel
                                </label>
                            </li>
                            <li>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="theme-radios"
                                        className="radio radio-sm theme-controller"
                                        value="cmyk"
                                    />
                                    CMYK
                                </label>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary>Handedness</summary>
                        <ul>
                            <li>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="handedness-radios"
                                        className="radio radio-sm"
                                        value="right"
                                    />
                                    Right
                                </label>
                            </li>
                            <li>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="handedness-radios"
                                        className="radio radio-sm"
                                        value="left"
                                    />
                                    Left
                                </label>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <a>About</a>
                </li>
            </ul>
        </div>
    );
}

export default PreferencesMenu;
