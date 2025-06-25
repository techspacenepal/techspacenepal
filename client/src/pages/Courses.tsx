// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Courses() {
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [courses, setCourses] = useState([]);
//     const [filteredCourses, setFilteredCourses] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/courses').then(r => setCourses(r.data));
//     }, []);

//     useEffect(() => {
//         if (selectedCategory === 'All') setFilteredCourses(courses);
//         else setFilteredCourses(courses.filter(c => c.category === selectedCategory));
//     }, [selectedCategory, courses]);

//     const categories = ['All', ...new Set(courses.map(c => c.category))];

//     return (
//         <div className="container my-4">
//             {/* Category buttons (same as your component) */}
//             <div className="mb-3">
//                 <div className="d-flex overflow-auto" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
//                     <style>{`div::-webkit-scrollbar { display: none; }`}</style>
//                     {categories.map(cat => (
//                         <a
//                             key={cat}
//                             className={`btn-${selectedCategory === cat ? 'primary' : 'outline-primary'} me-5 mb-2`}
//                             onClick={() => setSelectedCategory(cat)}
//                             style={{ cursor: 'pointer' }}
//                         >
//                             {cat}
//                         </a>

//                     ))}
//                 </div>
//             </div>


//             <div className="row overflow-scroll-wrapper">
//                 {filteredCourses.map(c => (
//                     <div className="col-12 col-sm-6 col-md-3 mb-4" key={c._id}>
//                         <div className="card h-100 shadow-sm rounded border border-light-subtle overflow-hidden">
//                             <div className="position-relative">
//                                 <div className="p-3 pb-0 overflow-hidden">
//                                     <div className="image-hover-wrapper rounded w-100">
//                                         <img
//                                             src={`http://localhost:5000${c.image}`}
//                                             alt={c.title}
//                                             className="card-img-top rounded w-100 image-hover"
//                                             style={{
//                                                 height: '200px',
//                                                 objectFit: 'cover',
//                                             }}
//                                         />
//                                     </div>
//                                     <span
//                                         className="badge bg-primary text-danger d-inline-flex align-items-center px-3 py-2 rounded fw-medium position-absolute"
//                                         style={{
//                                             top: '1.5rem',
//                                             right: '1.5rem',
//                                             zIndex: 1,
//                                         }}
//                                     >
//                                         {c.duration}
//                                     </span>
//                                 </div>
//                                 <div className="card-body">
//                                     <p className="bg-primary text-danger d-inline-flex align-items-center px-3 py-2 mb-1 rounded fw-medium">
//                                         {c.category}
//                                     </p>
//                                     <h5 className="card-title">{c.title}</h5>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>




//         </div>
//     );
// }
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [animate, setAnimate] = useState(false);

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
