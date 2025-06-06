import React from 'react'
import { Coding } from './Javascript';
import { Designing } from './Javascript';
import { Data } from './Javascript';
import { Cloud } from './Javascript';
import { AutoCAD } from './Javascript';
import { Other } from './Javascript';



function Courses() {
    return (
        <>
            <section className='py-3'>
                <div className="container mt-4">
                    <div className="col-lg-7">
                        <h3 className="text-start fw-bold">Choose your course and set your career in motion</h3>
                        <p className="text-start text-muted">Enroll in our highly-rated courses and learn all you need to land the job you want.</p>
                    </div>

                    {/* <h2 className="section-title fw-semibold mt-4">{Coding.category}</h2> */}
                    {/* {Coding.map((Coding, index) => (
                            <h2 className="section-title fw-semibold">{Coding.category}</h2>
                        ))} */}

                    <h4 className="section-title fw-semibold mt-4">Popular in Coding</h4>
                    <div className="row">
                        {Coding.map((Coding, index) => (
                            <div key={Coding.id} className="col-md-3">
                                <div className="card Coding-card shadow-sm rounded-2">
                                    <img src={Coding.image} alt={Coding.title} className="card-img-top rounded-2" />
                                    <span className="badge text-dark duration position-absolute top-0 end-0 m-2 px-2 py-1">{Coding.duration}</span>
                                </div>
                                <h5 className="card-title text-start py-2">{Coding.title}</h5>
                            </div>
                        ))}
                    </div>

                    <h4 className="section-title fw-semibold mt-4">Popular in Designing</h4>
                    <div className="row">
                        {Designing.map((Designing, index) => (
                            <div key={Designing.id} className="col-md-3">
                                <div className="card Designing-card shadow-sm rounded-2">
                                    <img src={Designing.image} alt={Designing.title} className="card-img-top rounded-2" />
                                    <span className="badge text-dark duration position-absolute top-0 end-0 m-2 px-2 py-1">{Designing.duration}</span>
                                </div>
                                <h5 className="card-title text-start py-2">{Designing.title}</h5>
                            </div>
                        ))}
                    </div>
                    <h4 className="section-title fw-semibold mt-4">Popular in Data and AI</h4>
                    <div className="row">
                        {Data.map((Data, index) => (
                            <div key={Data.id} className="col-md-3">
                                <div className="card Data-card shadow-sm rounded-2">
                                    <img src={Data.image} alt={Data.title} className="card-img-top rounded-2" />
                                    <span className="badge text-dark duration position-absolute top-0 end-0 m-2 px-2 py-1">{Data.duration}</span>
                                </div>
                                <h5 className="card-title text-start py-2">{Data.title}</h5>
                            </div>
                        ))}
                    </div>

                    <h4 className="section-title fw-semibold mt-4">Popular in Cloud, Networking, Security & DevOps</h4>
                    <div className="row">
                        {Cloud.map((Cloud, index) => (
                            <div key={Cloud.id} className="col-md-3">
                                <div className="card Data-card shadow-sm rounded-2">
                                    <img src={Cloud.image} alt={Cloud.title} className="card-img-top rounded-2" />
                                    <span className="badge text-dark duration position-absolute top-0 end-0 m-2 px-2 py-1">{Cloud.duration}</span>
                                </div>
                                <h5 className="card-title text-start py-2">{Cloud.title}</h5>
                            </div>
                        ))}
                    </div>

                    <h4 className="section-title fw-semibold mt-4">AutoCAD 2D & 3D, SketchUp, Estimating & Costing</h4>
                    <div className="row">
                        {AutoCAD.map((AutoCAD, index) => (
                            <div key={AutoCAD.id} className="col-md-3">
                                <div className="card Data-card shadow-sm rounded-2">
                                    <img src={AutoCAD.image} alt={AutoCAD.title} className="card-img-top rounded-2" />
                                    <span className="badge text-dark duration position-absolute top-0 end-0 m-2 px-2 py-1">{AutoCAD.duration}</span>
                                </div>
                                <h5 className="card-title text-start py-2">{AutoCAD.title}</h5>
                            </div>
                        ))}
                    </div>

                    <h4 className="section-title fw-semibold mt-4"> Other Popular Courses</h4>
                    <div className="row">
                        {Other.map((Other, index) => (
                            <div key={Other.id} className="col-md-3">
                                <div className="card Data-card shadow-sm rounded-2">
                                    <img src={Other.image} alt={Other.title} className="card-img-top rounded-2" />
                                    <span className="badge text-dark duration position-absolute top-0 end-0 m-2 px-2 py-1">{Other.duration}</span>
                                </div>
                                <h5 className="card-title text-start py-2">{Other.title}</h5>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </>
    )
}

export default Courses;

