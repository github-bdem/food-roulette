function ResultsSidebar() {
    return (
        <div className="flex w-full flex-col">
            <div className="navbar bg-base-300 navbar-height flex justify-between p-4 shadow-sm">
                <div>Results</div>
            </div>
            <div className="flex overflow-scroll">
                <ul className="list bg-base-100 rounded-box w-full items-center shadow-md">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                        <li key={item} className="list-row">
                            <div className="card bg-base-100 card-xs shadow-sm">
                                <div className="card-body">
                                    <h2 className="card-title">Name</h2>
                                    <p>
                                        A card component has a figure, a body
                                        part, and inside body there are title
                                        and actions parts
                                    </p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ResultsSidebar;
