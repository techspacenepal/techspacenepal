'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface Course {
  _id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
}

const slugify = (text: string | undefined | null) =>
  text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '';

export default function CategoryCoursesPage() {
  const { category } = useParams() as { category: string };
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses').then((res) => {
      const all: Course[] = res.data;
      setCourses(all);

      if (category) {
        const filtered = all.filter((c) => slugify(c.category) === category);
        setFilteredCourses(filtered);
      }
    });
  }, [category]);

  return (
    <>
      <section>
        <div className="container py-5">

          <h2 className="fw-bold mb-3 " style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
            {category?.replace(/-/g, ' ').toUpperCase()}
          </h2>
          
          <div className="row g-4 py-1">
            {filteredCourses.length === 0 && (
              <p className="text-center w-100 text-muted">No courses found in this category.</p>
            )}

            {filteredCourses.map((c) => {
              const slug = slugify(c.title);
              return (
                <div key={c._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div
                    className="card h-100 rounded-2 overflow-hidden"
                    style={{
                      border: "0.3px solid #dee2e6",
                      boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="position-relative overflow-hidden">
                      <Link href={`/courses/${slug}`}>
                        <img
                          src={`http://localhost:5000${c.image}`}
                          alt={c.title}
                          className="card-img-top p-3"
                          style={{
                            height: 200,
                            objectFit: 'cover',
                            borderRadius: '1.3rem',
                            cursor: 'pointer',
                          }}
                        />
                      </Link>
                      <span
                        className="badge bg-danger text-white fw-semibold position-absolute"
                        style={{
                          top: '1.5rem',
                          right: '1.5rem',
                          padding: '0.5rem 1rem',
                          boxShadow: '0 0 10px rgba(0,0,0,0.07)',
                          fontSize: '0.8rem',
                        }}
                      >
                        {c.duration}
                      </span>
                    </div>

                    <div className="card-body pt-0">
                      <Link href={`/courses/${slug}`} className="text-decoration-none">
                        <h5
                          className="card-title mb-2"
                          style={{
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            color: '#1a1a1a',
                            textTransform: 'capitalize',
                          }}
                        >
                          {c.title}
                        </h5>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
