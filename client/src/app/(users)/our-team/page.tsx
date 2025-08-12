"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    company: string;
    experience: string;
    image: string;
}

export default function TeamListPage() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [visibleCount, setVisibleCount] = useState(8); // ✅ Start with 8

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const { data } = await axios.get<TeamMember[]>("http://localhost:5000/api/team");
                setTeam(data);
            } catch (error) {
                console.error("Failed to load team data", error);
            }
        };

        fetchTeam();
    }, []);

    const loadMore = () => {
        setVisibleCount((prev) => prev + 4); // ✅ Load 4 more each click
    };

    return (
        <div className="container py-5">
            <h2
                className="text-center fw-bold mb-5"
                style={{ fontSize: "2rem", color: "#222", textTransform: "uppercase" }}
            >
                Our Team
            </h2>

            <div className="row g-4">
                {team.slice(0, visibleCount).map((member) => (
                    <div key={member._id} className="col-sm-6 col-md-4 col-lg-3">
                        <div
                            className="w-100"
                            style={{
                                borderRadius: "8px",
                                overflow: "hidden",
                                transition: "box-shadow 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLDivElement).style.boxShadow =
                                    "0 .5rem 1rem rgba(0, 0, 0, 0.15)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                            }}
                        >
                            <div style={{ overflow: "hidden", borderRadius: "8px" }}>
                                <img
                                    src={`http://localhost:5000/uploads/${member.image}`}
                                    alt={member.name}
                                    className="img-fluid"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        aspectRatio: "1/1",
                                        borderRadius: "8px",
                                        objectFit: "cover",
                                        transition: "transform 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                />
                            </div>

                            <div className="p-3 text-center">
                                <p
                                    className="mb-1"
                                    style={{
                                        fontWeight: 600,
                                        color: "#555",
                                        fontSize: "0.85rem",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        fontFamily: "'Poppins', 'Inter', 'Arial', sans-serif",
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {member.role}
                                </p>

                                <h5
                                    className="fw-bold mb-1"
                                    style={{
                                        color: "#000",
                                        fontSize: "1.1rem",
                                        fontWeight: 700,
                                        textTransform: "capitalize",
                                        fontFamily: "'Poppins', 'Inter', 'Arial', sans-serif",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {member.name}
                                </h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* ✅ Show Load More if more than 8 members and not all visible */}
            {team.length > 8 && visibleCount < team.length && (
                <div className="text-center my-5">
                    <button className="btn btn-outline-primary d-inline-flex align-items-center" onClick={loadMore} style={{
                        backgroundColor: '#0057d8',
                        color: '#ffffff',
                        fontWeight: '500',
                        padding: '11px 15px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: 'clamp(14px, 2.5vw, 16px)',
                        textDecoration: 'none',
                        gap: '8px',
                        whiteSpace: 'nowrap'
                    }}>
                        Load More  <i className="bi bi-arrow-down" style={{ fontSize: '18px' }}></i>
                    </button>
                </div>
            )}
        </div>
    );
}
