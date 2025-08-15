
"use client";
import Link from 'next/link';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
interface Schedule {
    secondDate: string;
    secondTime: string;
}

interface ClassItem {
    _id: string;
    title: string;
    date: string;
    time: string;
    duration: string;
    imageUrl: string;
    secondSchedules?: Schedule[];
}



export default function UpcommingPage() {
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showFormFor, setShowFormFor] = useState<string | null>(null);
    const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [showDateWarning, setShowDateWarning] = useState<boolean>(false);


    const fetchClasses = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/classes");
            setClasses(res.data);
            setError(null);
        } catch (err) {
            setError("Failed to load classes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
        const interval = setInterval(fetchClasses, 10000);
        return () => clearInterval(interval);
    }, []);

    // Slugify function
    const slugify = (text: string): string =>
        text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

    const getScheduleOptions = (cls: ClassItem) => {
        return [
            { date: cls.date, time: cls.time },
            ...(cls.secondSchedules || []).map((s: Schedule) => ({
                date: s.secondDate,
                time: s.secondTime,
            })),
        ];
    };

    const handleDateChange = (date: string, cls: ClassItem) => {
        setSelectedDate(date);
        const options = getScheduleOptions(cls);
        const allTimes = options.map((opt) => opt.time);
        setAvailableTimes(allTimes);
    };


    if (loading) return <div className="text-center my-5">Loading...</div>;
    if (error) return <div className="text-center text-danger my-5">{error}</div>;

    return (
        <>
            <section className='py-5'>
                <div className="container position-relative">
                    <h4 className="mb-4">Upcoming Classes ({classes.length})</h4>

                    {/* 🔶 FORM OPENED ABOVE CARD */}
                    {selectedClass && showFormFor && (
                        <div
                            className="form-overlay"
                            style={{
                                position: "fixed",
                                top: 80,
                                left: 0,
                                height: "90vh",
                                width: "100vw",
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                zIndex: 999,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <div
                                className="bg-white shadow animate-form"
                                style={{
                                    width: "95%",
                                    maxWidth: "500px",
                                    padding: "2rem",
                                    borderRadius: "1rem",
                                    position: "relative",
                                }}
                            >
                                <h5 className="mb-3 text-uppercase fw-bold text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
                                    Register
                                </h5>

                                {/* 🔷 FORM BODY */}
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Full Name <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" placeholder="Enter your full name" required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email <span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" placeholder="Enter your email" required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Phone <span className="text-danger">*</span></label>
                                        <input type="tel" className="form-control" placeholder="Enter your phone" required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Course</label>
                                        <input className="form-control" value={selectedClass.title} readOnly />
                                    </div>

                                    {/* 🔸 DATE SELECT */}
                                    <div className="mb-3">
                                        <label className="form-label">Select Date</label>
                                        <select
                                            className="form-select"
                                            value={selectedDate}
                                            onChange={(e) => handleDateChange(e.target.value, selectedClass)}
                                            required
                                        >
                                            <option value="">-- Select Date --</option>
                                            {[...new Set(getScheduleOptions(selectedClass).map(opt => opt.date))].map((date, idx) => (
                                                <option key={idx} value={date}>
                                                    {new Date(date).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* 🔸 TIME SELECT */}
                                    <div className="mb-3">
                                        <label className="form-label">Select Time</label>
                                        <select
                                            className="form-select"
                                            required
                                            onFocus={() => {
                                                if (!selectedDate) setShowDateWarning(true);
                                            }}
                                            onBlur={() => setTimeout(() => setShowDateWarning(false), 2000)}
                                        >
                                            {!selectedDate && showDateWarning ? (
                                                <option value="">Select Date First</option>
                                            ) : (
                                                <>
                                                    <option value="">-- Select Time --</option>
                                                    {availableTimes.map((time, idx) => (
                                                        <option key={idx} value={time}>
                                                            {time}
                                                        </option>
                                                    ))}
                                                </>
                                            )}
                                        </select>
                                    </div>

                                    {/* 🔸 BUTTONS */}
                                    <div className="d-flex gap-2">
                                        <button type="submit" className="btn btn-success w-100">Submit</button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={() => {
                                                setShowFormFor(null);
                                                setSelectedClass(null);
                                                setSelectedDate("");
                                                setAvailableTimes([]);
                                            }}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {/* 🔶 CLASS CARDS */}
                    <div className="row">
                        {classes.slice(0, 4).map((cls) => (
                            <div className="col-12 col-sm-6 col-md-3 mb-4" key={cls._id}>
                                <div
                                    className="card h-100 rounded-2"
                                    style={{
                                        minHeight: "367px",
                                        border: "0.5px solid #dee2e6",
                                        boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                                        transition: "box-shadow 0.7s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = "0 0 30px rgba(0, 0, 0, 0.20)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = "0 0 8px rgba(0, 0, 0, 0.1)";
                                    }}
                                >

                                    {/* ⬇️ Wrap image with Link */}
                                    <Link href={`/courses/${slugify(cls.title)}`}>
                                        <img
                                            src={`http://localhost:5000${cls.imageUrl || "/uploads/default.jpg"}`}
                                            alt={cls.title}
                                            className="card-img-top p-3"
                                            style={{ height: "180px", objectFit: "cover", borderRadius: "1.3rem", cursor: "pointer" }}
                                        />
                                    </Link>
                                    <div className="card-body d-flex flex-column justify-content-between pt-0">
                                        <div>
                                            {/* ⬇️ Wrap title with Link */}
                                            <Link href={`/courses/${slugify(cls.title)}`} className="text-decoration-none">
                                                <h5 className="card-title fw-bold text-uppercase" style={{ color: "#00214D", fontFamily: "Poppins, sans-serif", fontSize: "1.2rem", cursor: "pointer" }}>
                                                    {cls.title}
                                                </h5>
                                            </Link>
                                            <p className="text-uppercase fw-semibold small mb-2" style={{ color: "#6c757d", fontFamily: "Poppins, sans-serif", fontSize: "0.75rem" }}>Upcoming Classes</p>

                                            <Swiper
                                                modules={[Autoplay, Pagination]}
                                                spaceBetween={10}
                                                slidesPerView={1}
                                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                                loop={true}
                                                pagination={{ clickable: true }}
                                            >
                                                <SwiperSlide>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div>
                                                            <div><i className="bi bi-calendar3 me-2"></i>{new Date(cls.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</div>
                                                            <div><i className="bi bi-clock me-2"></i>{cls.time}</div>
                                                        </div>
                                                        <div className="mt-2 small text-end" style={{ color: "#00214D", fontWeight: 600 }}>
                                                            <span className="me-1">Class:</span>{(cls.secondSchedules?.length ?? 0) + 1}
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                {cls.secondSchedules?.map((schedule, index) => (
                                                    <SwiperSlide key={index}>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div>
                                                                <div><i className="bi bi-calendar3 me-2"></i>{new Date(schedule.secondDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</div>
                                                                <div><i className="bi bi-clock me-2"></i>{schedule.secondTime}</div>
                                                            </div>
                                                            <div className="mt-2 small" style={{ color: "#00214D", fontWeight: 600 }}>
                                                                <span className="me-1">Class:</span>{(cls.secondSchedules?.length ?? 0) + 1}
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>

                                            {/* Swiper CSS */}
                                            <style jsx>{`
                    :global(.swiper-pagination) {
                      margin-top: 0.5rem;
                      position: relative !important;
                      bottom: 0 !important;
                      text-align: center;
                    }
                    :global(.swiper-pagination-bullet) {
                      background: #0d6efd;
                      opacity: 0.5;
                    }
                    :global(.swiper-pagination-bullet-active) {
                      opacity: 1;
                    }
                    .hover-shadow:hover {
                      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12), 0 0 12px rgba(0, 0, 0, 0.05) !important;
                      transition: box-shadow 0.3s ease;
                    }
                    @keyframes slideDown {
                      0% {
                        opacity: 0;
                        transform: translateY(-10px);
                      }
                      100% {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                    .animate-form {
                      animation: slideDown 0.3s ease;
                    }
                  `}</style>
                                        </div>

                                        {/* Duration Badge */}
                                        {cls.duration && (
                                            <span className="badge bg-success text-white fw-semibold position-absolute color-[#20C997]" style={{
                                                top: "1.5rem",
                                                right: "1.5rem",
                                                padding: "0.5rem 1rem",
                                                boxShadow: "0 0 10px rgba(0,0,0,0.07)",
                                                fontSize: "0.8rem",
                                                fontFamily: "Poppins, sans-serif",
                                                textTransform: "uppercase",
                                            }}>{cls.duration}</span>
                                        )}

                                        {/* 🔘 REGISTER BUTTON */}
                                        <button
                                            style={{
                                                padding: '0.6rem 1.5rem',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                fontFamily: "'Poppins', sans-serif",
                                                color: '#fff',
                                                backgroundColor: '#007bff',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s ease',
                                                display: 'block',
                                                width: 'fit-content',
                                                margin: '0 auto',
                                            }}
                                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
                                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#007bff')}
                                            onClick={() => {
                                                setShowFormFor(cls._id);
                                                setSelectedClass(cls);
                                                setSelectedDate("");
                                                setAvailableTimes([]);
                                            }}
                                        >
                                            Register
                                        </button>


                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='text-center mt-4'>
                        <Link
                            href="/upcomming-classes"
                            className="btn d-inline-flex align-items-center"
                            style={{
                                backgroundColor: '#0057d8',
                                color: '#ffffff',
                                fontWeight: '500',
                                padding: '12px 17px',
                                borderRadius: '8px',
                                border: 'none',
                                fontSize: '16px',
                                textDecoration: 'none',
                                gap: '8px'
                            }}
                        >
                            View Details
                        </Link>
                    </div>


                </div>
            </section>
        </>
    );
}