import type { Student, Course, Announcement, GradeEntry } from './types';

export const mockStudent: Student = {
  id: 'student123',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '555-123-4567',
  avatarUrl: 'https://placehold.co/100x100.png',
  enrolledCoursesIds: ['course1', 'course2', 'course3', 'course4'],
};

export const mockCourses: Course[] = [
  {
    id: 'course1',
    name: 'Introduction to Web Development',
    description: 'Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.',
    instructor: 'Dr. Emily Carter',
    progress: 75,
    grade: 'A-',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'web development',
    modules: [
      { id: 'm1c1', title: 'HTML Basics', content: 'Content for HTML Basics' },
      { id: 'm2c1', title: 'CSS Fundamentals', content: 'Content for CSS Fundamentals' },
    ],
  },
  {
    id: 'course2',
    name: 'Advanced JavaScript Concepts',
    description: 'Dive deep into closures, promises, async/await, and other advanced JS topics.',
    instructor: 'Prof. John Smith',
    progress: 40,
    grade: 'In Progress',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'javascript programming',
    modules: [
      { id: 'm1c2', title: 'Closures', content: 'Content for Closures' },
      { id: 'm2c2', title: 'Async/Await', content: 'Content for Async/Await' },
    ],
  },
  {
    id: 'course3',
    name: 'Data Structures and Algorithms',
    description: 'Understand common data structures and algorithms for efficient problem-solving.',
    instructor: 'Dr. Sarah Lee',
    progress: 90,
    grade: 'A',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'data structures',
    modules: [
      { id: 'm1c3', title: 'Arrays and Strings', content: 'Content for Arrays and Strings' },
      { id: 'm2c3', title: 'Trees and Graphs', content: 'Content for Trees and Graphs' },
    ],
  },
   {
    id: 'course4',
    name: 'Introduction to AI',
    description: 'Explore the basics of Artificial Intelligence and Machine Learning.',
    instructor: 'Dr. Alan Turing',
    progress: 25,
    grade: 'In Progress',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'artificial intelligence',
    modules: [
      { id: 'm1c4', title: 'What is AI?', content: 'Content for What is AI?' },
      { id: 'm2c4', title: 'Machine Learning Basics', content: 'Content for ML Basics' },
    ],
  },
];

export const mockStudentEnrolledCourses: Course[] = mockCourses.filter(course => 
  mockStudent.enrolledCoursesIds.includes(course.id)
);

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann1',
    title: 'Mid-term Exam Schedule Announced',
    content: 'The mid-term exams for all courses will be held from October 25th to October 30th. Please check the detailed schedule on the portal.',
    date: '2024-09-15T10:00:00Z',
    author: 'Admin Office',
  },
  {
    id: 'ann2',
    title: 'New Course: "Cloud Computing Fundamentals" Available',
    content: 'We are excited to announce a new course on Cloud Computing! Enrollment is now open. Enhance your skills in this high-demand area.',
    date: '2024-09-10T14:30:00Z',
    author: 'Academic Department',
  },
  {
    id: 'ann3',
    title: 'Guest Lecture on Cybersecurity Trends',
    content: 'Join us for an insightful guest lecture by industry expert Ms. Jane Doe on current cybersecurity trends. Date: September 20th, 3 PM.',
    date: '2024-09-05T09:00:00Z',
    author: 'Dr. Emily Carter',
  },
];

export const mockGradebook: GradeEntry[] = mockStudentEnrolledCourses.map(course => ({
  courseId: course.id,
  courseName: course.name,
  grade: course.grade || 'N/A',
  progress: course.progress,
}));

export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};
