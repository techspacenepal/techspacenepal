// 'use client';
// import { useState, useEffect } from 'react';
// import { coursesData } from './Javascript';
// export default function Courses() {
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [filteredCourses, setFilteredCourses] = useState([]);

//     useEffect(() => {
//         if (selectedCategory === 'All') {
//             setFilteredCourses(coursesData);
//         } else {
//             setFilteredCourses(
//                 coursesData.filter(course => course.category === selectedCategory)
//             );
//         }
//     }, [selectedCategory]);

//     const categories = ['All', ...new Set(coursesData.map(course => course.category))];

//     return (
//         <div className="container my-4">
//             <div className="mb-3">
//                 <div
//                     className="d-md-block d-flex overflow-auto"
//                     style={{
//                         whiteSpace: 'nowrap',
//                         scrollbarHeight: 'none', // For Firefox
//                         msOverflowStyle: 'none', // IE and Edge
//                         WebkitOverflowScrolling: 'touch', // Smooth scrolling for iOS
//                     }}
//                 >
//                     <div style={{
//                         display: 'flex',
//                         overflowX: 'auto',
//                         scrollbarWidth: 'none', // Firefox
//                         WebkitOverflowScrolling: 'touch',
//                     }} className="w-100">
//                         <style>
//                             {`
//           /* Hide scrollbar for WebKit browsers */
//           div::-webkit-scrollbar {
//             display: none;
//           }
//         `}
//                         </style>
//                         {categories.map(category => (
//                             <button
//                                 key={category}
//                                 className={`btn btn-${selectedCategory === category ? 'primary' : 'outline-primary'} me-2 mb-2`}
//                                 onClick={() => setSelectedCategory(category)}
//                             >
//                                 {category}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>


//             <div className="row">
//                 {filteredCourses.map(course => (
//                     <div className="col-md-4 mb-4" key={course.id}>
//                         <div className="card">
//                             <img src={course.image} alt={course.title} className="card-img-top rounded-2 p-3" />

//                             <div className="card-body">
//                                 <h5 className="card-title">{course.title}</h5>
//                                 <p className="card-text">{course.category}</p>
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

    useEffect(() => {
        axios.get('http://localhost:5000/api/courses').then(r => setCourses(r.data));
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All') setFilteredCourses(courses);
        else setFilteredCourses(courses.filter(c => c.category === selectedCategory));
    }, [selectedCategory, courses]);

    const categories = ['All', ...new Set(courses.map(c => c.category))];

    return (
        <div className="container my-4">
            {/* Category buttons (same as your component) */}
            <div className="mb-3">
                <div className="d-flex overflow-auto" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                    <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                    {categories.map(cat => (
                        <a
                            key={cat}
                            className={`btn-${selectedCategory === cat ? 'primary' : 'outline-primary'} me-5 mb-2`}
                            onClick={() => setSelectedCategory(cat)}
                            style={{ cursor: 'pointer' }}
                        >
                            {cat}
                        </a>

                    ))}
                </div>
            </div>


            <div className="row overflow-scroll-wrapper">
                {filteredCourses.map(c => (
                    <div className="col-12 col-sm-6 col-md-3 mb-4" key={c._id}>
                        <div className="card h-100 shadow-sm rounded border border-light-subtle overflow-hidden">
                            <div className="position-relative">
                                <div className="p-3 pb-0 overflow-hidden">
                                    <div className="image-hover-wrapper rounded w-100">
                                        <img
                                            src={`http://localhost:5000${c.image}`}
                                            alt={c.title}
                                            className="card-img-top rounded w-100 image-hover"
                                            style={{
                                                height: '200px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                    <span
                                        className="badge bg-primary text-danger d-inline-flex align-items-center px-3 py-2 rounded fw-medium position-absolute"
                                        style={{
                                            top: '1.5rem',
                                            right: '1.5rem',
                                            zIndex: 1,
                                        }}
                                    >
                                        {c.duration}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <p className="bg-primary text-danger d-inline-flex align-items-center px-3 py-2 mb-1 rounded fw-medium">
                                        {c.category}
                                    </p>
                                    <h5 className="card-title">{c.title}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>




        </div>
    );
}
