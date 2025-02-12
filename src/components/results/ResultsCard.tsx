function ResultsCard() {
    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Name</h2>
                <div>Cuisine Type</div>
                <progress
                    className="progress w-full"
                    value="10"
                    max="100"
                ></progress>
                <div className="flex flex-row justify-between">
                    <div>5 min</div>
                    <div>.45 mi</div>
                </div>
                <img
                    className="hidden md:block"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
                <div className="stats stats-horizontal">
                    <div className="stat">
                        <div className="stat-title">Rating</div>
                        <div className="stat-value">3.5</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Reviews</div>
                        <div className="stat-value">150</div>
                    </div>
                </div>
                <div className="flex flex-row-reverse">
                    <button className="btn">Lets Go!</button>
                </div>
                <div className="collapse-plus collapse">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title font-semibold">
                        More Information
                    </div>
                    <div className="collapse-content w-full text-end">
                        <div className="flex flex-row items-center justify-end">
                            <div className="pr-2">Open Now</div>
                            <div className="status status-success animate-bounce" />
                        </div>
                        <div>
                            <a className="link">www.example.com</a>
                        </div>
                        <div>
                            <a className="link" href="tel:1234567890">
                                Phone: (123) 456-7890
                            </a>
                        </div>
                        <div>Address: 123 Main St, Anytown, USA</div>

                        <div>
                            <a className="link">More Info on Google</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultsCard;
