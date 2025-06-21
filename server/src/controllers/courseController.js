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
    const { title, category, duration } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newCourse = new Course({ title, category, duration, image });
    await newCourse.save();

    res.json({ success: true, message: 'Course added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE course
export const updateCourse = async (req, res) => {
  try {
    const { title, category, duration } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    if (req.file) {
      // delete old image if exists
      if (course.image) {
        const imagePath = path.join('public', course.image);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      }
      course.image = `/uploads/${req.file.filename}`;
    }

    course.title = title;
    course.category = category;
    course.duration = duration;

    await course.save();

    res.json({ success: true, message: 'Course updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    // delete image if exists
    if (course.image) {
      const imagePath = path.join('public', course.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// Get single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};