// import React from 'react'
// import { Coding } from './Javascript';




// function Courses(props) {
//     return (
//         <>
//             <section className='py-3'>
//                 <div className="container mt-4">
//                     <div className="col-lg-7">
//                         <h3 className="text-start fw-bold">Choose your course and set your career in motion</h3>
//                         <p className="text-start text-muted">Enroll in our highly-rated courses and learn all you need to land the job you want.</p>
//                     </div>

//                     <h4 className="section-title fw-semibold mt-4">{props.CatName}</h4>
//                     <div className="row">
//                         {Coding.map((Coding, index) => (
//                             <div key={Coding.id} className="col-md-3">
//                                 <div className="card Coding-card shadow-sm rounded-2">
//                                     <img src={Coding.image} alt={Coding.title} className="card-img-top rounded-2" />
//                                     <span className="badge text-dark duration position-absolute top-0 end-0 m-2 px-2 py-1">{Coding.duration}</span>
//                                 </div>
//                                 <h5 className="card-title text-start py-2">{Coding.title}</h5>
//                             </div>
//                         ))}
//                     </div>


//                 </div>

//             </section>
//         </>
//     )
// }

// export default Courses;

'use client';
import { useState, useEffect } from 'react';
import { coursesData } from './Javascript';
export default function Courses() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredCourses(coursesData);
        } else {
            setFilteredCourses(
                coursesData.filter(course => course.category === selectedCategory)
            );
        }
    }, [selectedCategory]);

    const categories = ['All', ...new Set(coursesData.map(course => course.category))];

    return (
        <div className="container my-4">
            <div className="mb-3">
                <div
                    className="d-md-block d-flex overflow-auto"
                    style={{
                        whiteSpace: 'nowrap',
                        scrollbarHeight: 'none', // For Firefox
                        msOverflowStyle: 'none', // IE and Edge
                        WebkitOverflowScrolling: 'touch', // Smooth scrolling for iOS
                    }}
                >
                    <div style={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollbarWidth: 'none', // Firefox
                        WebkitOverflowScrolling: 'touch',
                    }} className="w-100">
                        <style>
                            {`
          /* Hide scrollbar for WebKit browsers */
          div::-webkit-scrollbar {
            display: none;
          }
        `}
                        </style>
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`btn btn-${selectedCategory === category ? 'primary' : 'outline-primary'} me-2 mb-2`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            <div className="row">
                {filteredCourses.map(course => (
                    <div className="col-md-4 mb-4" key={course.id}>
                        <div className="card">
                            <img src={course.image} alt={course.title} className="card-img-top rounded-2 p-3" />

                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">{course.category}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
