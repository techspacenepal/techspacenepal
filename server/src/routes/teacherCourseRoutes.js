import express from 'express';

import { createTeacherCourse, deleteTeacherCourse, getAllTeacherCourses, getCoursesByTeacher, getTeacherCourseWithStudentCount,   } from '../controllers/teacherCourseController.js';

const router = express.Router();

// ✅ Important: 'thumbnail' field name must match frontend
router.post('/', createTeacherCourse);
router.get('/', getAllTeacherCourses);
router.delete('/:id', deleteTeacherCourse);
router.get('/teacher/:teacherId', getCoursesByTeacher);


// 👇 New route for student count per course
router.get('/teacher/:teacherId/enrollments', getTeacherCourseWithStudentCount);


 

export default router;
