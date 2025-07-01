export interface Instructor {
  name: string;
  title: string;
  email: string;
  avatar: string;
}

export type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  enrolledCoursesIds: string[];
};

export type Course = {
  id: string;
  name: string;
  description: string;
  instructor: string;
  progress: number; // percentage, 0-100
  grade?: string; // e.g., "A", "B+", "In Progress"
  modules: Module[];
  imageUrl?: string;
};

export type Module = {
  id: string;
  title: string;
  content: string; 
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string; // ISO date string
  author: string;
};

export type GradeEntry = {
  courseId: string;
  courseName: string;
  grade: string;
  progress: number;
};
