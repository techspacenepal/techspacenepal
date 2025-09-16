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

export interface Course {
  id: string;
  name: string;
  title?: string;   
  description: string;
  content: string;
  studentCount: number;
  status: "Draft" | "Published" | "Archived";
  thumbnail: string;
  instructor: string;
  progress: number;

  // अतिरिक्त fields
  grade?: string;       // ⬅️ अब error हट्छ
  imageUrl?: string;    // ⬅️ mockCourses भित्र imageUrl मिल्छ
  dataAiHint?: string;  // ⬅️ AI hint field support हुन्छ

  modules: {
    id: string;
    title: string;
    content: string;
  }[];
}



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




