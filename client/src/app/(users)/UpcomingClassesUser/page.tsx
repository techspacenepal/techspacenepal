"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UpcomingClassesUserPanel() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.error("Failed to fetch classes"));
  }, []);

  return (
    <div className="container py-4">
      <h4 className="mb-3">Upcoming Classes ({classes.length})</h4>

      <div className="row">
        {classes.map((data) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={data._id}>
            <div className="card shadow-sm rounded overflow-hidden border border-light-subtle">
              <div className="position-relative">
                <img
                  src={`http://localhost:5000${data?.imageUrl || "/uploads/default.jpg"}`}
                  alt={data?.title || "Class"}
                  className="w-100"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                {data?.duration && (
                  <span className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 small rounded-bottom-start">
                    {data.duration}
                  </span>
                )}
              </div>
              <div className="p-3">
                <h5 className="mb-1">{data.title}</h5>
                <p className="mb-1 fw-semibold text-muted">UPCOMING CLASSES</p>
                <div className="d-flex justify-content-between">
                  <span><i className="bi bi-calendar3"></i> {new Date(data.date).toLocaleDateString()}</span>
                  <span><i className="bi bi-clock"></i> {data.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
