import Course from '../models/Course.js';
import fs from 'fs';
import path from 'path';

// GET all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ADD course
export const addCourse = async (req, res) => {
  try {
    const {
      title,
      category,
      duration,
      description,
      coursesdescription,
      courseoverview,
      syllabus,
      faq
    } = req.body;

    const newCourse = new Course({
      title,
      category,
      duration,
      description,
      coursesdescription,
      courseoverview,
      syllabus: JSON.parse(syllabus || "[]"),
      faq: JSON.parse(faq || "[]"),
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await newCourse.save();
    res.json({ success: true, message: "Course added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE course
export const updateCourse = async (req, res) => {
  try {
    const {
      title,
      category,
      duration,
      description,
      coursesdescription,
      courseoverview,
      syllabus,
      faq
    } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({ success: false, message: "Course not found" });

    if (req.file) {
      if (course.image) {
        const imagePath = path.join("uploads", path.basename(course.image));
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      }
      course.image = `/uploads/${req.file.filename}`;
    }

    course.title = title;
    course.category = category;
    course.duration = duration;
    course.description = description;
    course.coursesdescription = coursesdescription;
    course.courseoverview = courseoverview;
    course.syllabus = JSON.parse(syllabus || "[]");
    course.faq = JSON.parse(faq || "[]");

    await course.save();
    res.json({ success: true, message: "Course updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    if (course.image) {
      const imagePath = path.join('uploads', path.basename(course.image));
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// ✅ Make sure this function is correct
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      title: course.title,
      syllabus: course.syllabus,
      faq: course.faq,
      // include any other fields you want
    });
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};
