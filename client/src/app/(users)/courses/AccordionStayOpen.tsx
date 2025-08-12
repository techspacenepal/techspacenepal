'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccordionStayOpen = ({ courseId }: { courseId: string }) => {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'faq'>('syllabus');
  const [syllabus, setSyllabus] = useState<{ title: string; content: string }[]>([]);
  const [faq, setFaq] = useState<{ title: string; content: string }[]>([]);

  useEffect(() => {
    const allShown = document.querySelectorAll('.accordion-collapse.show');
    allShown.forEach((el) => el.classList.remove('show'));
  }, [activeTab]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
        if (res.data) {
          setSyllabus(res.data.syllabus || []);
          setFaq(res.data.faq || []);
        }
      } catch (err) {
        console.error('Error fetching course data:', err);
      }
    };
    fetchData();
  }, [courseId]);
  return (
    <section className='py-5'>
      <div className="container"> 
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 ">
            {/* Tabs */}
            <div className="mb-4 d-flex gap-3">
              <button
                className={`btn ${activeTab === 'syllabus' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('syllabus')}
              >
                Course Syllabus
              </button>
              <button
                className={`btn ${activeTab === 'faq' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveTab('faq')}
              >
                FAQ
              </button>
            </div>

            {/* Syllabus */}
            {activeTab === 'syllabus' && (
              <>
                <h5 className="responsive-heading">Course Syllabus</h5>
                <div className="accordion" id="syllabusAccordion">
                  {syllabus.map((item, index) => (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id={`syllabus-heading-${index}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#syllabus-collapse-${index}`}
                          aria-expanded="false"
                          aria-controls={`syllabus-collapse-${index}`}
                        >
                          <strong>{item.title}</strong>
                        </button>
                      </h2>
                      <div
                        id={`syllabus-collapse-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`syllabus-heading-${index}`}
                      >
                        <div className="accordion-body">
                          <ul className="mb-0">
                            {item.content.split('\n').map((line, i) => (
                              <li key={i}>{line}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* FAQ */}
            {activeTab === 'faq' && (
              <>
                <h5 className="responsive-heading">Frequently Asked Questions</h5>
                <div className="accordion" id="faqAccordion">
                  {faq.map((item, index) => (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id={`faq-heading-${index}`}>
                        <button
                          className="accordion-button collapsed fw-bold"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq-collapse-${index}`}
                          aria-expanded="false"
                          aria-controls={`faq-collapse-${index}`}
                        >
                          {item.title}
                        </button>
                      </h2>
                      <div
                        id={`faq-collapse-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`faq-heading-${index}`}
                      >
                        <div className="accordion-body">
                          {item.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccordionStayOpen;
