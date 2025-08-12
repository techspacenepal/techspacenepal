'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Course {
  _id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses').then((r) => setCourses(r.data));
  }, []);

  useEffect(() => {
    let data = [...courses];
    if (selectedCategory !== 'All') {
      data = data.filter((c) => c.category === selectedCategory);
    }
    if (searchTerm) {
      data = data.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredCourses(data);
  }, [selectedCategory, courses, searchTerm]);

  const visibleCourses = filteredCourses.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCourses.length;

  const categories: string[] = ['All', ...new Set(courses.map((c) => c.category))];

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-wrapper')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="container my-5">
      {/* Top Row: Filter Button + Title + Search */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="d-flex align-items-center gap-2 px-3 py-2"
          style={{
            border: '1px solid #dee2e6',
            backgroundColor: 'white',
            borderRadius: '8px',
            fontWeight: '500',
            fontSize: '1rem',
            color: '#000',
          }}
        >
          <i className="bi bi-funnel-fill" style={{ fontSize: '1.1rem' }}></i>
          <span>Filter</span>
        </button>

        <h2 className="fw-bold text-center flex-grow-1 mb-0">All Courses</h2>

        <div className="position-relative search-wrapper" style={{ maxWidth: 250 }}>
          <input
            type="text"
            className="form-control pe-5"
            placeholder="Search Courses"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
          />
          {/* Close button - before search icon */}
          <div className='align-items-center g-5'>
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setShowDropdown(false);
                  setSelectedCategory('All');
                }}
                className="btn position-absolute top-50 end-0 translate-middle-y me-4 p-0 border-0 bg-transparent"
                style={{ fontSize: '1.2rem', color: '#888', zIndex: 2 }}
              >
                &times;
              </button>
            )}


            {/* Search icon */}
            <button
              onClick={() => {
                setShowDropdown(false);
                setSelectedCategory('All');
              }}
              className="btn position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 bg-transparent"
              style={{ fontSize: '1rem', color: '#0d6efd' }}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>

          {showDropdown && searchTerm && filteredCourses.length > 0 && (
            <ul
              className="list-group position-absolute w-100 mt-1 z-3"
              style={{
                maxHeight: 200,
                overflowY: 'auto',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                zIndex: 10,
              }}
            >
              {filteredCourses.map((course) => (
                <li
                  key={course._id}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSearchTerm(course.title);
                    setShowDropdown(false);
                    setFilteredCourses([course]);
                  }}
                >
                  {course.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Category Filter Bar (Only on Filter Click) */}
      {showFilters && (
        <div
          className="mb-4 d-flex flex-nowrap justify-content-start gap-3 overflow-auto px-2 border-bottom pb-2"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(12);
              }}
              className="bg-transparent border-0 fw-semibold px-3 py-2 text-nowrap"
              style={{
                color: selectedCategory === cat ? '#0d6efd' : '#333',
                fontSize: '1rem',
                transition: 'color 0.3s ease',
                whiteSpace: 'nowrap',
                fontWeight: selectedCategory === cat ? '600' : '500',
                letterSpacing: '0.5px',
                textTransform: 'capitalize',
              }}
            >
              <span style={{ position: 'relative', display: 'inline-block' }}>
                {cat}
                {selectedCategory === cat && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: -2,
                      height: '2px',
                      width: '100%',
                      backgroundColor: '#0d6efd',
                      borderRadius: '1px',
                      transition: 'width 0.3s ease',
                    }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Course Grid */}
      <div className="row g-4">
        {visibleCourses.map((c) => {
          const slug = slugify(c.title);
          return (
            <div key={c._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div
                className="card h-100 rounded-2 overflow-hidden transition-courses"
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

                <div className="card-body d-flex flex-column pt-0">
                  <Link href={`/courses/${slug}`} className="text-decoration-none">
                    <h5
                      className="card-title mb-2"
                      style={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: '#1a1a1a',
                        textTransform: 'capitalize',
                        cursor: 'pointer',
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

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={() => setVisibleCount(prev => prev + 4)}
            className="btn d-inline-flex align-items-center justify-content-center"
            style={{
              backgroundColor: '#0057d8',
              color: '#ffffff',
              fontWeight: '600',
              padding: '10px 24px',
              borderRadius: '8px',
              border: 'none',
              textTransform: 'uppercase',
              gap: '8px'
            }}
          >
            Load More <i className="bi bi-arrow-down" style={{ fontSize: '18px' }}></i>
          </button>
        </div>
      )}
    </div>
  );
}
