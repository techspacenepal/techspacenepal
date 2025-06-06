import Image from 'next/image';

export default function HeroSection() {
    return (
        <> 
        {/* Home section */}
            <section
                className="container  heroBg position-relative py-5 py-sm-5 py-md-5 py-lg-5"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '581px',
                    overflow: 'hidden',  // needed so particles don't overflow container
                }}
            >
                {/* Particle Background */}
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        zIndex: 0,
                        pointerEvents: 'none',
                    }}
                >
                    <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                        {[...Array(50)].map((_, i) => {
                            const size = Math.random() * 3 + 1;
                            const x = Math.random() * 100;
                            const y = Math.random() * 100;
                            const duration = 10 + Math.random() * 10;
                            return (
                                <circle
                                    key={i}
                                    cx={`${x}%`}
                                    cy={`${y}%`}
                                    r={size}
                                    fill="#00b4d8"
                                    opacity="0.3"
                                >
                                    <animate
                                        attributeName="cy"
                                        values="100%;0%;100%"
                                        dur={`${duration}s`}
                                        repeatCount="indefinite"
                                    />
                                    <animate
                                        attributeName="cx"
                                        values={`${x}%;${x + 5}%;${x}%`}
                                        dur={`${duration * 1.5}s`}
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            );
                        })}
                    </svg>
                </div>

                <div className="row align-items-center justify-content-between flex-column-reverse flex-lg-row gap-4 gap-lg-0" style={{ position: 'relative', zIndex: 1 }}>
                    {/* Left Content */}
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <h1 className="fw-bold display-5">
                            <span className="text-primary">Building Global IT</span><br />
                            Professionals since <span className="text-dark">2008</span>
                        </h1>
                        <p className="fw-semibold text-primary">
                            ISO 9001:2015 CERTIFIED IT LEARNING CENTER / IT TRAINING IN NEPAL
                        </p>
                        <p className="text-muted">
                            Broadway Infosys, established in 2008, is a leading computer training institute in Kathmandu, Nepal,
                            offering professional IT training and education through industry experts.
                        </p>

                        <div className="d-flex align-items-center  my-3" style={{ gap: '63px' }}>
                            <div className="position-relative d-flex align-items-center" style={{ height: '32px' }}>
                                {/* First Image (lowest) */}
                                <img
                                    src="https://broadwayinfosys.com/uploads/successgallery/1748497738.jpg"
                                    alt="student"
                                    width={32}
                                    height={32}
                                    className="rounded-circle border"
                                    style={{ position: 'relative', zIndex: 1 }}
                                />
                                {/* Second Image */}
                                <img
                                    src="https://broadwayinfosys.com/uploads/successgallery/1748497738.jpg"
                                    alt="student"
                                    width={32}
                                    height={32}
                                    className="rounded-circle border"
                                    style={{
                                        position: 'absolute',
                                        left: '20px',
                                        top: '0px', // line मा राख्न 0 राखियो
                                        zIndex: 2,
                                    }}
                                />
                                {/* Third Image */}
                                <img
                                    src="https://broadwayinfosys.com/uploads/successgallery/1748497738.jpg"
                                    alt="student"
                                    width={32}
                                    height={32}
                                    className="rounded-circle border"
                                    style={{
                                        position: 'absolute',
                                        left: '40px',
                                        top: '0px',
                                        zIndex: 3,
                                    }}
                                />
                                {/* Fourth Image */}
                                <img
                                    src="https://broadwayinfosys.com/uploads/successgallery/1748497738.jpg"
                                    alt="student"
                                    width={32}
                                    height={32}
                                    className="rounded-circle border"
                                    style={{
                                        position: 'absolute',
                                        left: '60px',
                                        top: '0px',
                                        zIndex: 4,
                                    }}
                                />
                            </div>

                            <div className="ms-2 small">
                                <strong>More than 15000+ students</strong><br />
                                have started their career after getting certified from Broadway Infosys.
                            </div>
                        </div>

                        <a href="#" className="btn btn-primary px-4 py-2 fw-semibold rounded-pill">
                            EXPLORE OUR COURSES →
                        </a>

                        {/* StatCards for Mobile (shown below button) */}
                        <div
                            className="d-flex d-lg-none mt-4 flex-row gap-3 no-scrollbar"
                            style={{
                                overflowX: 'auto',
                                scrollSnapType: 'x mandatory',
                                WebkitOverflowScrolling: 'touch',
                                paddingBottom: '6px',
                                marginBottom: '-6px',
                                scrollbarWidth: 'none', // Firefox
                                msOverflowStyle: 'none', // IE/Edge
                            }}
                        >
                            <style>
                                {`
             .no-scrollbar::-webkit-scrollbar {
             display: none; /* Chrome/Safari */
                }
               `}
                            </style>

                            {/* Certified Students */}
                            <div
                                className="bg-white rounded-3 d-flex align-items-center border"
                                style={{
                                    minWidth: '90%',
                                    height: '100px',
                                    padding: '16px 20px',
                                    justifyContent: 'space-between',
                                    scrollSnapAlign: 'start',
                                    borderRadius: '12px',
                                    boxShadow: 'none',
                                }}
                            >
                                <i className="bi bi-people-fill fs-3 text-primary"></i>
                                <div className="text-end">
                                    <div className="text-muted small">Certified Students</div>
                                    <div className="fw-bold text-primary fs-5">15K+</div>
                                </div>
                            </div>

                            {/* Courses */}
                            <div
                                className="bg-white rounded-3 d-flex align-items-center border"
                                style={{
                                    minWidth: '90%',
                                    height: '100px',
                                    padding: '16px 20px',
                                    justifyContent: 'space-between',
                                    scrollSnapAlign: 'start',
                                    borderRadius: '12px',
                                    boxShadow: 'none',
                                }}
                            >
                                <i className="bi bi-journal-bookmark-fill fs-3 text-primary"></i>
                                <div className="text-end">
                                    <div className="text-muted small">Courses</div>
                                    <div className="fw-bold text-primary fs-5">152+</div>
                                </div>
                            </div>

                            {/* Qualified Teachers */}
                            <div
                                className="bg-white rounded-3 d-flex align-items-center border"
                                style={{
                                    minWidth: '90%',
                                    height: '100px',
                                    padding: '16px 20px',
                                    justifyContent: 'space-between',
                                    scrollSnapAlign: 'start',
                                    borderRadius: '12px',
                                    boxShadow: 'none',
                                }}
                            >
                                <i className="bi bi-person-badge-fill fs-3 text-primary"></i>
                                <div className="text-end">
                                    <div className="text-muted small">Qualified Teachers</div>
                                    <div className="fw-bold text-primary fs-5">70+</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="col-lg-6 position-relative d-flex justify-content-center px-3 px-sm-4 px-md-5 mb-2 mb-lg-0">
                        <img
                            src="https://broadwayinfosys.com/uploads/slider/174825108562053.jpg"
                            alt="Students"
                            className="img-fluid rounded-4 w-100"
                            style={{ maxWidth: '560px', maxHeight: '400px', objectFit: 'cover' }}
                        />

                        {/* StatCards for Desktop */}
                        <div className="d-none d-lg-block">
                            {/* Certified Students */}
                            <div className="position-absolute statCard" style={{ top: "-10%", left: "-12%" }}>
                                <div
                                    className="bg-white shadow rounded-3 p-3 d-flex align-items-center gap-2"
                                    style={{ width: '200px', height: '80px', justifyContent: 'space-around' }}
                                >
                                    <i className="bi bi-people-fill fs-4 text-primary"></i>
                                    <div>
                                        <div className="text-muted small">Certified Students</div>
                                        <div className="fw-bold text-primary fs-5">15K+</div>
                                    </div>
                                </div>
                            </div>

                            {/* Courses */}
                            <div className="position-absolute statCard" style={{ top: "40%", right: "2%" }}>
                                <div
                                    className="bg-white shadow rounded-3 p-3 d-flex align-items-center gap-2"
                                    style={{ width: '200px', height: '80px', justifyContent: 'space-around' }}
                                >
                                    <i className="bi bi-journal-bookmark-fill fs-4 text-primary"></i>
                                    <div>
                                        <div className="text-muted small">Courses</div>
                                        <div className="fw-bold text-primary fs-5">152+</div>
                                    </div>
                                </div>
                            </div>

                            {/* Qualified Teachers */}
                            <div className="position-absolute statCard" style={{ bottom: "-8%", left: "35%" }}>
                                <div
                                    className="bg-white shadow rounded-3 p-3 d-flex align-items-center gap-2"
                                    style={{ width: '200px', height: '80px', justifyContent: 'space-around' }}
                                >
                                    <i className="bi bi-person-badge-fill fs-4 text-primary"></i>
                                    <div>
                                        <div className="text-muted small">Qualified Teachers</div>
                                        <div className="fw-bold text-primary fs-5">70+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>
    );
}
