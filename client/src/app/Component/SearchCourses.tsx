'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as bootstrap from 'bootstrap';

interface Course {
  _id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
}

interface SearchCoursesProps {
  onFiltered?: (data: Course[]) => void; // optional callback
}

export default function SearchCourses({ onFiltered }: SearchCoursesProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const router = useRouter();

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
 
  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(res => {
        setCourses(res.data);
        setFilteredCourses(res.data);
        onFiltered && onFiltered(res.data);
      })
      .catch(() => {
        setCourses([]);
        setFilteredCourses([]);
      });
  }, [onFiltered]);

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    const data = courses.filter(c => c.title?.toLowerCase().includes(term));
    setFilteredCourses(data);
    onFiltered && onFiltered(data);
  }, [searchTerm, courses, onFiltered]);

const handleClick = (title: string) => {
  const course = courses.find(c => c.title === title);
  if (course) {
    const slug = slugify(course.title);
    router.push(`/courses/${slug}`);

    // Close the offcanvas if open
    const offcanvasEl = document.getElementById("offcanvasSearch");
    if (offcanvasEl) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  }
};



  return (
    <div className="position-relative search-wrapper" style={{ width: '100%' }}>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-2"
        style={{ paddingLeft: "15px" }}
      />

      {searchTerm ? (
        <button
          onClick={() => setSearchTerm('')}
          className="btn position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent"
          style={{ padding: "0 10px", cursor: "pointer" }}
        >
          <i className="bi bi-x-circle-fill" style={{ fontSize: "18px", color: "#888" }}></i>
        </button>
      ) : (
        <span
          className="position-absolute end-0 top-50 translate-middle-y"
          style={{ padding: "0 10px" }}
        >
          <i className="bi bi-search" style={{ fontSize: "18px", color: "#888" }}></i>
        </span>
      )}

      {/* Search Hints */}
      {searchTerm && filteredCourses.length > 0 && (
        <div
          className="position-absolute bg-white border rounded w-100 mt-1"
          style={{ zIndex: 10, maxHeight: '200px', overflowY: 'auto' }}
        >
          {filteredCourses.map(c => (
            <div
              key={c._id}
              className="px-3 py-2"
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick(c.title)}
            >
              {c.title}
            </div>
          ))}
        </div>
      )}

      {/* No Result Found */}
      {searchTerm && filteredCourses.length === 0 && (
        <div className="text-center py-2 position-absolute" style={{ color: "#888" }}>
        <span className='py-2 bg-light rounded p-3'> No Result Found!</span> 
        </div>
      )}
    </div>
  );
}
