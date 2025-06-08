import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-3">
            <div className="container">
                <div className="row text-start">
                    {/* Left - About */}
                    <div className="col-md-4 mb-4">
                        <img src="https://scontent.fbwa5-2.fna.fbcdn.net/v/t39.30808-6/498308640_122112024194854994_1291870746683761076_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Ql78o40m5gcQ7kNvwF9-Si3&_nc_oc=AdnKnj6dp0iNDHDG-6THHdTW-BfnDJfv8r2vNqVZuUY19C9Bqdn5OoetyPhqKYUQ5A6QEEYlZB_Ur5y4OIc_y7gW&_nc_zt=23&_nc_ht=scontent.fbwa5-2.fna&_nc_gid=mx4iFWa0OAJ-jI7yZOPZDA&oh=00_AfPyoDdWF2HxxFtEHqF_-2nCkV1qrarxktbNXJ2Zj-EB7g&oe=684A53E3" alt="Logo" width={120} height={50} />
                        <p className="mt-3" style={{ textAlign: 'justify' }}>
                            Tech Space Nepal promises to offer every course in the most professional way so that it can be the best value for money to you...
                        </p>
                    </div>

                    {/* Middle - Quick Links */}
                    <div className="col-md-2 mb-4">
                        <h5 className="fw-bold">QUICK LINKS</h5>
                        <ul className="list-unstyled">
                            <li><i className="fas fa-chevron-right me-2"></i>Courses</li>
                            <li><i className="fas fa-chevron-right me-2"></i>Testimonials</li>
                            <li><i className="fas fa-chevron-right me-2"></i>Placements</li>
                            <li><i className="fas fa-chevron-right me-2"></i>Partners</li>
                            <li><i className="fas fa-chevron-right me-2"></i>Privacy Policy</li>
                            <li><i className="fas fa-chevron-right me-2"></i>Terms and Conditions</li>
                        </ul>

                    </div>

                    {/* Middle - Contact Info */}
                    <div className="col-md-3 mb-4">
                        <h5 className="fw-bold">CONTACT INFO</h5>
                        <p><i className="fas fa-map-marker-alt me-2"></i>Lalmatiya -2 Dang Nepal</p>
                        <p><i className="fas fa-envelope me-2"></i>InfoTechSpaceNepal@.com</p>
                        <p><i className="fas fa-phone me-2"></i>+977 01-5244419</p>
                        <p><i className="fab fa-whatsapp me-2"></i>+977-9813906662</p>
                    </div>

                    {/* Right - Newsletter & Social */}
                    <div className="col-md-3">
                        <h5 className="fw-bold">GET IN TOUCH WITH US</h5>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Your email" />
                            <button className="btn btn-primary" type="button">
                                <i className="fab fa-telegram-plane"></i>
                            </button>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <div className="border p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="fab fa-facebook-f fa-lg"></i>
                            </div>
                            <div className="border p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="fab fa-linkedin-in fa-lg"></i>
                            </div>
                            <div className="border p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="fab fa-twitter fa-lg"></i>
                            </div>
                            <div className="border p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="fab fa-instagram fa-lg"></i>
                            </div>
                            <div className="border p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <i className="fab fa-youtube fa-lg"></i>
                            </div>
                        </div>

                        <h6 className="fw-bold">WE ACCEPT</h6>
                        <div className="d-flex gap-2">
                            <img src="https://skilltrainingnepal.com/front/assets/images/fonepay.webp" alt="Fonepay" width={80} height={30} />
                            <img src="https://skilltrainingnepal.com/front/assets/images/esewa.webp" alt="eSewa" width={80} height={30} />
                        </div>
                    </div>
                </div>

                <div className="text-center pt-3 border-top mt-4">
                    <small>
                        Copyright © 2025 | <a href="#" className="text-decoration-none text-info">Tech Space Nepal</a>
                    </small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
