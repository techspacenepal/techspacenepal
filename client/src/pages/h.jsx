 <header className="py-3 bg-light border-top border-bottom">
                <div className="container px-3 align-items-center">
                    <div className="row align-items-center flex-column flex-lg-row">
                        {/* Left Section: Logo + Desktop "All Courses" + Menu Icon + Mobile Elements */}
                        <div className="col-12 col-lg-7 mb-lg-0 align-items-center">
                            <div className="d-flex align-items-center justify-content-between gap-2 flex-nowrap w-100 align-items-center">

                                {/* Logo */}
                                <div className="d-flex align-items-center">
                                    <h1 className="mb-0 fs-5 fs-lg-3 text-primary">Tech Space Nepal</h1>
                                </div>

                                {/* Desktop Only: Menu Icon + All Courses Text */}
                                <div className="d-none d-lg-flex align-items-center gap-1 ms-3">
                                    {/* Menu Icon simple without border/background */}

                                    <i className="bi bi-list fs-2"></i>

                                    {/* All Courses Text */}
                                    <span className="text-primary fw-semibold fs-5">All Courses</span>
                                </div>


                                {/* Search Icon (Mobile Only) */}
                                <button className="btn btn-outline-primary d-block d-lg-none">
                                    <i className="bi bi-search"></i>
                                </button>

                                {/* Send Inquiry Button (Mobile Only) */}
                                <a
                                    href="#"
                                    className="btn btn-primary d-inline-flex d-lg-none align-items-center gap-1 px-3 py-1"
                                    style={{ fontSize: "0.875rem", height: "36px", whiteSpace: "nowrap" }}
                                >
                                    Send Inquiry <i className="bi bi-arrow-right"></i>
                                </a>

                                {/* Menu Icon (Mobile Only) */}
                                <button
                                    className="px-4 btn d-lg-none p-0 border border-primary rounded d-flex align-items-center justify-content-center"
                                    style={{ width: "44px", height: "44px", backgroundColor: "#e9f2ff" }}
                                    aria-label="Menu"
                                >
                                    <i className="bi bi-list" style={{ fontSize: "2rem", color: "#0d6efd" }}></i>
                                </button>

                                {/* Search Form (Desktop Only) */}
                                <form
                                    className="d-none d-lg-block"
                                    style={{ minWidth: "290px", maxWidth: "350px", flex: "1 1 auto" }}
                                    role="search"
                                >
                                    <div className="input-group">
                                        <input
                                            type="search"
                                            className="form-control"
                                            placeholder="Search"
                                            aria-label="Search"
                                        />
                                        <button className="btn btn-outline-primary" type="submit">
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right Section: Hotline + Send Inquiry (Desktop Only) */}
                        <div className="col-12 col-lg-5 d-none d-lg-flex flex-column flex-md-row align-items-md-center justify-content-lg-end gap-5 text-end text-md-start">
                            {/* Inquiry Hotline */}
                            <div className="d-none d-md-block">
                                <div className="fw-bold">Inquiry Hotline: +977-9841002000</div>
                                <div className="small">+977-9808724535 / +977-1-4111849</div>
                            </div>

                            {/* Send Inquiry Button */}
                            <a href="#" className="btn btn-primary d-flex align-items-center gap-1">
                                Send Inquiry <i className="bi bi-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </header>