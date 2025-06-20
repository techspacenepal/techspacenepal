<nav
        ref={navRef}
        className="navbar navbar-expand-lg bg-body-tertiary py-3 border-top border-bottom"
        style={{ transition: "all 0.3s ease" }}
      >
        {" "}
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo + Dropdown */}
          <div
            className="d-flex align-items-center gap-3 justify-content-between"
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            <a className="navbar-brand" href="/">
              <img
                src="https://skilltrainingnepal.com/storage/site_setting/X2N5sIsm0gYGsIvcWbJq11I1Z5tNSBUjhCV6o4aq.png"
                alt="Logo"
                style={{ width: "60px", height: "auto" }}
              />
            </a>

            <div className="nav-item dropdown">
              <a
                className="nav-link d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  color: "#212529",
                  userSelect: "none",
                }}
              >
                <i
                  className="bi bi-list me-1"
                  style={{
                    fontSize: "1.7rem",
                    color: "#212529",
                    textShadow: "0 0 1px #212529",
                  }}
                ></i>
                All Courses
              </a>

              <ul
                className="dropdown-menu"
                style={{ fontSize: "1rem", fontWeight: 500 }}
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Desktop Main Menu */}
          <ul
            className="navbar-nav mb-2 mb-lg-0 gap-3 d-none d-lg-flex flex-row align-items-center"
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
            }}
          >
            <li className="nav-item">
              <a className="nav-link custom-hover active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="#">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="/gallery">
                Success
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="/testimonial">
                Testimonials
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="/UpcomingClassesUser">
                Upcoming Classes ({classes.length})
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="/teams">
                Our Teams
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="#">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="/ContactSection">
                Contact
              </a>
            </li>
          </ul>
          <div className="d-none d-lg-flex align-items-center gap-3">
            <Link
              href="/inquiry"
              className="btn btn-primary px-3 py-2"
              style={{ color: "#fff", fontWeight: 600 }}
            >
              Send Inquiry
            </Link>

          

            {isAuthenticated &&
              (user?.role === "admin" || user?.role === "user") && (
                <Link
                  href={
                    user?.role === "admin"
                      ? "/Dashboard/adminDashboard"
                      : "/Dashboard/userDashboard"
                  }
                  className="btn btn-primary px-3 py-2"
                >
                  Dashboard
                </Link>
              )}
          </div>

          {/* Toggler Button (mobile) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              border: "none",
              borderRadius: 0,
              outline: "none",
              boxShadow: "none",
              fontWeight: "bold",
              fontSize: "1.3rem",
            }}
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Slide Menu (Mobile only) */}
          <div className="slide-menu d-lg-none" id="navbarSupportedContent">
            <div className="d-flex justify-content-end align-items-center py-2 border-top border-bottom">
              <button
                type="button"
                className="btn-close rounded-circle p-3 bg-white"
                style={{
                  marginRight: "0.5rem",
                  filter: "invert(1)",
                }}
                aria-label="Close"
                onClick={() => {
                  document
                    .getElementById("navbarSupportedContent")
                    ?.classList.remove("show");
                  document.body.classList.remove("right-menu-open");
                  const backdrop = document.querySelector(".custom-backdrop");
                  if (backdrop) backdrop.remove();
                }}
              ></button>
            </div>

            <ul className="navbar-nav mb-2 mb-lg-0 gap-3 p-4">
              <li className="nav-item">
                <a className="nav-link custom-hover active" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="#">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="/gallery">
                  Success Gallery
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="/testimonial">
                  Student Testimonials
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="UpcomingClassesUser">
                  Upcoming Classes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="/teams">
                  Our teams
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="#">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="/ContactSection">
                  Contact
                </a>
              </li>
            </ul>
            <div className="">
              <Link
                href="/inquiry"
                className="btn btn-primary px-3 py-2"
                style={{ color: "#fff", fontWeight: 600 }}
              >
                Send Inquiry
              </Link>
            </div>
          </div>
        </div>
      </nav>