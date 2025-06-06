"use client";
import React, { useEffect } from 'react'

function Header() {
    useEffect(() => {
  const handleScroll = () => {
    const navbar = document.querySelector("header");
    if (window.scrollY > 300) {
      navbar?.classList.add("sticky", "animated-sticky");
    } else {
      navbar?.classList.remove("sticky", "animated-sticky");
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
    return (
        <>
            {/* top header section */}
            <header className="py-3 bg-light border-top border-bottom sticky-top">
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







            {/* navbar start */}
            {/* <nav className="navbar bg-light shadow-sm sticky-top py-2">
                <div className="container px-3 d-flex justify-content-between align-items-center flex-wrap border">


                    <div className="d-flex flex-row flex-nowrap overflow-auto gap-5 mt-2 mt-lg-0 samir">
                        <a className="nav-link custom-hover active text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Home
                        </a>
                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Courses
                        </a>
                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Courses
                        </a>
                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Courses
                        </a>
                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Courses
                        </a>
                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Courses
                        </a>

                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Contact
                        </a>

                    </div>
                </div>
            </nav> */}
            <nav className="navbar bg-light shadow-sm py-2">
                <div className="container px-3 d-flex justify-content-between align-items-center flex-wrap">
                    {/* Logo */}

                    {/* Navigation Items (horizontally scrollable on small devices) */}
                    <div className="d-flex flex-row flex-nowrap overflow-auto gap-5 mt-2 mt-lg-0 samir">
                        <a className="nav-link custom-hover active text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Home
                        </a>
                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            About Us
                        </a>
                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Courses
                        </a>
                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Services
                        </a>
                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Success Gallery
                        </a>
                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Student Testimonials
                        </a>
                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Upcoming Classes
                        </a>

                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Teams
                        </a>
                        <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Contact
                        </a>
                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
                            Blog
                        </a>
                    </div>



                </div>
            </nav>

            {/* Add this style in your CSS file or style tag */}
            <style>
                {`
.samir {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
}
.samir::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
`}
            </style>




        </>
    )
}

export default Header
