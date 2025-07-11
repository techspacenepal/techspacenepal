
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';



interface Course {
  _id: string;
  title: string;
  category: string;
  duration: string;
  image: string;
  coursesdescription: string;
}



export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  // const [courses, setCourses] = useState([]);
  // const [filteredCourses, setFilteredCourses] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses').then(r => setCourses(r.data));
  }, []);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => {
      if (selectedCategory === 'All') setFilteredCourses(courses);
      else setFilteredCourses(courses.filter(c => c.category === selectedCategory));
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedCategory, courses]);

  const categories = ['All', ...new Set(courses.map(c => c.category))];

  return (
    <div className="container my-5">
      {/* Category Filter Buttons */}
      <div className="mb-5 d-flex flex-wrap justify-content-center gap-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn fw-semibold rounded-pill px-4 py-2 ${
              selectedCategory === cat
                ? 'btn-primary shadow-lg text-white'
                : 'btn-outline-primary'
            }`}
            style={{ minWidth: 110, transition: 'all 0.3s ease' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="row g-4">
        {filteredCourses.length === 0 && (
          <p className="text-center w-100 text-muted">No courses found.</p>
        )}

        {filteredCourses.map((c, idx) => (
          <div
            key={c._id}
            className={`col-12 col-sm-6 col-md-4 col-lg-3 course-col ${
              animate ? 'fade-slide-in' : ''
            }`}
            style={{ '--delay': `${idx * 100}ms` } as React.CSSProperties}
          >
            <div
              className="card course-card h-100 shadow-sm rounded-4 overflow-hidden"
              style={{
                background: 'rgba(255 255 255 / 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              {/* image + content same as before */}
              <div className="position-relative overflow-hidden rounded-top">
                <img
                  src={`http://localhost:5000${c.image}`}
                  alt={c.title}
                  className="card-img-top"
                  style={{ height: 200, objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
                <span
                  className="badge bg-white text-primary fw-semibold position-absolute"
                  style={{
                    top: '1rem',
                    right: '1rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    boxShadow: '0 0 10px rgba(0,0,0,0.07)',
                    fontSize: '0.8rem',
                  }}
                >
                  {c.duration}
                </span>
              </div>
              <div className="card-body d-flex flex-column">
                <span className="badge bg-light text-primary mb-2 px-3 py-1 rounded-pill text-uppercase fw-semibold small">
                  {c.category}
                </span>
                <h5 className="card-title fw-bold text-dark mb-3">{c.title}</h5>
                 <p
                    className="card-text text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {c.coursesdescription?.substring(0, 500) ||
                      "No description available."}
                  </p>
                <a href="#" className="mt-auto text-decoration-none fw-semibold text-primary">
                  Learn More →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        .course-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }
        .course-card:hover img {
          transform: scale(1.06);
        }
        .course-col {
          opacity: 0;
          transform: translateY(30px);
        }
        .fade-slide-in {
          animation: fadeSlideIn 500ms ease forwards;
          animation-delay: var(--delay);
        }
        @keyframes fadeSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
