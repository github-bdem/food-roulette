function ResultsSidebar() {
    return (
        <div className="overflow-scroll">
            <ul className="list bg-base-100 rounded-box shadow-md">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <li key={item} className="list-row">
                        <div>
                            <img
                                className="rounded-box size-10"
                                src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                            />
                        </div>
                        <div>
                            <div>Ellie Beilish</div>
                            <div className="text-xs font-semibold uppercase opacity-60">
                                Bears of a fever
                            </div>
                        </div>
                        <p className="list-col-wrap text-xs">
                            "Bears of a Fever" captivated audiences with its
                            intense energy and mysterious lyrics. Its popularity
                            skyrocketed after fans shared it widely online,
                            earning Ellie critical acclaim.
                        </p>
                        <button className="btn btn-square btn-ghost">
                            <svg
                                className="size-[1.2em]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M6 3L20 12 6 21 6 3z"></path>
                                </g>
                            </svg>
                        </button>
                        <button className="btn btn-square btn-ghost">
                            <svg
                                className="size-[1.2em]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                </g>
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResultsSidebar;
