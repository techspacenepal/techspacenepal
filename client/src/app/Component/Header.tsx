// "use client";
// import React, { useEffect } from 'react'

// function Header() {
//     useEffect(() => {
//         const handleScroll = () => {
//             const navbar = document.querySelector("header");
//             if (window.scrollY > 300) {
//                 navbar?.classList.add("sticky", "animated-sticky");
//             } else {
//                 navbar?.classList.remove("sticky", "animated-sticky");
//             }
//         };

//         window.addEventListener("scroll", handleScroll);

//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);
//     return (
//         <>
//             {/* top header section */}
//             <header className="py-3 bg-light border-top border-bottom sticky-top">
//                 <div className="container px-3 align-items-center">
//                     <div className="row align-items-center flex-column flex-lg-row">
//                         {/* Left Section: Logo + Desktop "All Courses" + Menu Icon + Mobile Elements */}
//                         <div className="col-12 col-lg-7 mb-lg-0 align-items-center">
//                             <div className="d-flex align-items-center justify-content-between gap-2 flex-nowrap w-100 align-items-center">

//                                 {/* Logo */}
//                                 <div className="d-flex align-items-center">
//                                     <h1 className="mb-0 fs-5 fs-lg-3 text-primary">Tech Space Nepal</h1>
//                                 </div>

//                                 {/* Desktop Only: Menu Icon + All Courses Text */}
//                                 <div className="d-none d-lg-flex align-items-center gap-1 ms-3 dropdown" style={{ position: "relative" }}>
//                                     {/* Icon and text */}
//                                     <i className="bi bi-list fs-2"></i>
//                                     <span
//                                         className="text-primary fw-semibold fs-5"
//                                         role="button"
//                                         style={{ cursor: "pointer" }}
//                                     >
//                                         All Courses
//                                     </span>

//                                     {/* Dropdown menu */}
//                                     <ul
//                                         className="dropdown-menu"
//                                         style={{
//                                             display: "none",
//                                             position: "absolute",
//                                             top: "100%",
//                                             left: 0,
//                                             marginTop: 0,
//                                             zIndex: 1000,
//                                             minWidth: "10rem",
//                                         }}
//                                     >
//                                         <li>
//                                             <a className="dropdown-item" href="#">
//                                                 Web Design / Front End Development
//                                             </a>
//                                         </li>
//                                         <li>
//                                             <a className="dropdown-item" href="#">
//                                                 Digital Marketing
//                                             </a>
//                                         </li>
//                                         <li>
//                                             <a className="dropdown-item" href="#">
//                                                 UI UX Design Training
//                                             </a>
//                                         </li>
//                                         <li>
//                                             <a className="dropdown-item" href="#">
//                                                 Graphics & Video Editing

//                                             </a>
//                                         </li>
//                                           <li>
//                                             <a className="dropdown-item" href="#">
//                                                 Graphics & Video Editing

//                                             </a>
//                                         </li>
//                                           <li>
//                                             <a className="dropdown-item" href="#">
//                                                 Graphics & Video Editing

//                                             </a>
//                                         </li>
//                                           <li>
//                                             <a className="dropdown-item" href="#">
//                                                 Graphics & Video Editing

//                                             </a>
//                                         </li>
//                                           <li>
//                                             <a className="dropdown-item" href="#">
//                                                 Graphics & Video Editing

//                                             </a>
//                                         </li>
//                                           <li>
//                                             <a className="dropdown-item" href="#">
//                                                 Graphics & Video Editing

//                                             </a>
//                                         </li>

//                                     </ul>


//                                     <style jsx>{`
//                                     .dropdown:hover .dropdown-menu {
//                                      display: block !important;
//                                          }
//                                       `}</style>
//                                 </div>


//                                 {/* Search Icon (Mobile Only) */}
//                                 <button className="btn btn-outline-primary d-block d-lg-none">
//                                     <i className="bi bi-search"></i>
//                                 </button>

//                                 {/* Send Inquiry Button (Mobile Only) */}
//                                 <a
//                                     href="#"
//                                     className="btn btn-primary d-inline-flex d-lg-none align-items-center gap-1 px-3 py-1"
//                                     style={{ fontSize: "0.875rem", height: "36px", whiteSpace: "nowrap" }}
//                                 >
//                                     Send Inquiry <i className="bi bi-arrow-right"></i>
//                                 </a>

//                                 {/* Menu Icon (Mobile Only) */}
//                                 <button
//                                     className="px-4 btn d-lg-none p-0 border border-primary rounded d-flex align-items-center justify-content-center"
//                                     style={{ width: "44px", height: "44px", backgroundColor: "#e9f2ff" }}
//                                     aria-label="Menu"
//                                 >
//                                     <i className="bi bi-list" style={{ fontSize: "2rem", color: "#0d6efd" }}></i>
//                                 </button>

//                                 {/* Search Form (Desktop Only) */}
//                                 <form
//                                     className="d-none d-lg-block"
//                                     style={{ minWidth: "290px", maxWidth: "350px", flex: "1 1 auto" }}
//                                     role="search"
//                                 >
//                                     <div className="input-group">
//                                         <input
//                                             type="search"
//                                             className="form-control"
//                                             placeholder="Search"
//                                             aria-label="Search"
//                                         />
//                                         <button className="btn btn-outline-primary" type="submit">
//                                             <i className="bi bi-search"></i>
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>

//                         {/* Right Section: Hotline + Send Inquiry (Desktop Only) */}
//                         <div className="col-12 col-lg-5 d-none d-lg-flex flex-column flex-md-row align-items-md-center justify-content-lg-end gap-5 text-end text-md-start">
//                             {/* Inquiry Hotline */}
//                             <div className="d-none d-md-block">
//                                 <div className="fw-bold">Inquiry Hotline: +977-9841002000</div>
//                                 <div className="small">+977-9808724535 / +977-1-4111849</div>
//                             </div>

//                             {/* Send Inquiry Button */}
//                             <a href="#" className="btn btn-primary d-flex align-items-center gap-1">
//                                 Send Inquiry <i className="bi bi-arrow-right"></i>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </header>







//             {/* navbar start */}
//             {/* <nav className="navbar bg-light shadow-sm sticky-top py-2">
//                 <div className="container px-3 d-flex justify-content-between align-items-center flex-wrap border">


//                     <div className="d-flex flex-row flex-nowrap overflow-auto gap-5 mt-2 mt-lg-0 samir">
//                         <a className="nav-link custom-hover active text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Home
//                         </a>
//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Courses
//                         </a>
//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Courses
//                         </a>
//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Courses
//                         </a>
//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Courses
//                         </a>
//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Courses
//                         </a>

//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Contact
//                         </a>

//                     </div>
//                 </div>
//             </nav> */}
//             <nav className="navbar bg-light shadow-sm py-2">
//                 <div className="container px-3 d-flex justify-content-between align-items-center flex-wrap">
//                     {/* Logo */}

//                     {/* Navigation Items (horizontally scrollable on small devices) */}
//                     <div className="d-flex flex-row flex-nowrap overflow-auto gap-5 mt-2 mt-lg-0 samir">
//                         <a className="nav-link custom-hover active text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Home
//                         </a>
//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             About Us
//                         </a>
//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Courses
//                         </a>
//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Services
//                         </a>
//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Success Gallery
//                         </a>
//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Student Testimonials
//                         </a>
//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Upcoming Classes
//                         </a>

//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Teams
//                         </a>
//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Contact
//                         </a>
//                         <a className="nav-link custom-hover text-dark fw-semibold  py-1 rounded hover-bg" href="#">
//                             Blog
//                         </a>
//                     </div>



//                 </div>
//             </nav>

//             {/* Add this style in your CSS file or style tag */}
//             <style>
//                 {`
// .samir {
//   scrollbar-width: none; /* Firefox */
//   -ms-overflow-style: none;  /* IE and Edge */
// }
// .samir::-webkit-scrollbar {
//   display: none; /* Chrome, Safari, Opera */
// }
// `}
//             </style>




//         </>
//     )
// }

// export default Header




'use client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaPhoneAlt,
    FaEnvelope,
    FaWhatsapp
} from 'react-icons/fa';


export default function TopNavbar() {

    // Side menu javascript
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');

        const toggleBtn = document.querySelector('.navbar-toggler');
        const navCollapse = document.getElementById('navbarSupportedContent');

        const createBackdrop = () => {
            if (!document.querySelector('.custom-backdrop')) {
                const backdrop = document.createElement('div');
                backdrop.className = 'custom-backdrop';
                backdrop.addEventListener('click', closeMenu);
                document.body.appendChild(backdrop);
            }
        };

        const removeBackdrop = () => {
            const backdrop = document.querySelector('.custom-backdrop');
            if (backdrop) backdrop.remove();
        };

        const closeMenu = () => {
            navCollapse?.classList.remove('show');
            document.body.classList.remove('right-menu-open');
            removeBackdrop();
        };

        const handleToggle = () => {
            setTimeout(() => {
                if (navCollapse?.classList.contains('show')) {
                    navCollapse.classList.add('show');
                    document.body.classList.add('right-menu-open');
                    createBackdrop();
                } else {
                    closeMenu();
                }
            }, 50);
        };

        toggleBtn?.addEventListener('click', handleToggle);
        return () => {
            toggleBtn?.removeEventListener('click', handleToggle);
            removeBackdrop();
        };
    }, []);


    // navbar sticky
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const onScroll = () => {
            if (!navRef.current) return;

            if (window.scrollY > 300) {
                navRef.current.classList.add('sticky');
            } else {
                navRef.current.classList.remove('sticky');
            }
        };

        window.addEventListener('scroll', onScroll);
        // initial check in case user refreshed page below or above 200
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);



    return (
        <header>
            {/* Top Contact Bar */}
            <div className="bg-primary text-white py-2">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-auto d-flex align-items-center gap-3 flex-wrap">
                            <div className="d-flex align-items-center gap-1">
                                <FaPhoneAlt />
                                <span>+977 01-5244419 / +977-9813906662</span>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <FaEnvelope />
                                <span>info@skilltrainingnepal.com</span>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <FaWhatsapp />
                                <span>+977-9813906662</span>
                            </div>
                        </div>
                        <div className="col-auto d-flex align-items-center gap-2">
                            <span className="fw-bold">FOLLOW US</span>
                            <a href="#" className="text-white"><FaFacebookF /></a>
                            <a href="#" className="text-white"><FaTwitter /></a>
                            <a href="#" className="text-white"><FaInstagram /></a>
                            <a href="#" className="text-white"><FaYoutube /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <nav
                ref={navRef}
                className="navbar navbar-expand-lg bg-body-tertiary py-3 border-top border-bottom"
                style={{ transition: 'all 0.3s ease' }}
            >   <div className="container d-flex align-items-center justify-content-between">

                    {/* Logo + Dropdown */}
                    <div
                        className="d-flex align-items-center gap-5 justify-content-between"
                        style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
                    >
                        <a className="navbar-brand" href="/">
                            <img
                                src="https://skilltrainingnepal.com/storage/site_setting/X2N5sIsm0gYGsIvcWbJq11I1Z5tNSBUjhCV6o4aq.png"
                                alt="Logo"
                                style={{ width: '60px', height: 'auto' }}
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
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    color: '#212529',
                                    userSelect: 'none',
                                }}
                            >
                                <i
                                    className="bi bi-list me-1"
                                    style={{
                                        fontSize: '1.7rem',
                                        color: '#212529',
                                        textShadow: '0 0 1px #212529',
                                    }}
                                ></i>

                                All Courses
                            </a>


                            <ul className="dropdown-menu" style={{ fontSize: '1rem', fontWeight: 500 }}>
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Desktop Main Menu */}
                    <ul
                        className="navbar-nav mb-2 mb-lg-0 gap-4 d-none d-lg-flex flex-row align-items-center"
                        style={{
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            fontSize: '1rem',
                            fontWeight: 600,
                            letterSpacing: '0.03em',
                        }}
                    >
                        <li className="nav-item"><a className="nav-link custom-hover active" href="/">Home</a></li>
                        <li className="nav-item"><a className="nav-link custom-hover" href="#">About</a></li>
                        <li className="nav-item"><a className="nav-link custom-hover" href="#">Services</a></li>
                        <li className="nav-item"><a className="nav-link custom-hover" href="#">Success Gallery</a></li>
                        <li className="nav-item"><a className="nav-link custom-hover" href="#">Student Testimonials</a></li>
                        <li className="nav-item"><a className="nav-link custom-hover" href="#">Upcoming Classes</a></li>
                        <li className="nav-item"><a className="nav-link custom-hover" href="#">Blog</a></li>
                        <li className="nav-item"><a className="nav-link custom-hover" href="/ContactSection">Contact</a></li>

                    </ul>
                    <div className="d-none d-lg-block">
                        <Link href="/inquiry" className="btn btn-primary px-3 py-2" style={{ color: '#fff', fontWeight: 600 }}>
                            Send Inquiry
                        </Link>
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
                            border: 'none',
                            borderRadius: 0,
                            outline: 'none',
                            boxShadow: 'none',
                            fontWeight: 'bold',
                            fontSize: '1.3rem',

                        }}
                    >
                        <span className="navbar-toggler-icon" />
                    </button>


                    {/* Slide Menu (Mobile only) */}
                    <div className="slide-menu d-lg-none" id="navbarSupportedContent">
                        <div
                            className="d-flex justify-content-end align-items-center py-2 border-top border-bottom"

                        >

                            <button

                                type="button"
                                className="btn-close rounded-circle p-3 bg-white"
                                style={{
                                    marginRight: '0.5rem',
                                    filter: 'invert(1)'
                                }}
                                aria-label="Close"
                                onClick={() => {
                                    document.getElementById('navbarSupportedContent')?.classList.remove('show');
                                    document.body.classList.remove('right-menu-open');
                                    const backdrop = document.querySelector('.custom-backdrop');
                                    if (backdrop) backdrop.remove();
                                }}
                            >

                            </button>

                        </div>




                        <ul className="navbar-nav mb-2 mb-lg-0 gap-3 p-4">
                            <li className="nav-item"><a className="nav-link custom-hover active" href="/">Home</a></li>
                            <li className="nav-item"><a className="nav-link custom-hover" href="#">About</a></li>
                            <li className="nav-item"><a className="nav-link custom-hover" href="#">Services</a></li>
                            <li className="nav-item"><a className="nav-link custom-hover" href="#">Success Gallery</a></li>
                            <li className="nav-item"><a className="nav-link custom-hover" href="#">Student Testimonials</a></li>
                            <li className="nav-item"><a className="nav-link custom-hover" href="#">Upcoming Classes</a></li>
                            <li className="nav-item"><a className="nav-link custom-hover" href="#">Blog</a></li>
                            <li className="nav-item"><a className="nav-link custom-hover" href="/ContactSection">Contact</a></li>
                        </ul>
                        <div className="">
                            <Link href="/inquiry" className="btn btn-primary px-3 py-2" style={{ color: '#fff', fontWeight: 600 }}>
                                Send Inquiry
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

        </header>
    );
}