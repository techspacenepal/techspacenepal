
import Course from "../models/Course.js";
import fs from "fs";
import path from "path";

// 🔹 सबै कोर्सहरू प्राप्त गर्ने (GET)
export const getCourses = async (req, res) => {
  try {
    
     const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 नयाँ कोर्स थप्ने (POST)
export const addCourse = async (req, res) => {
  try {
    const { title, category, duration, description, coursesdescription  } =
      req.body;
    // यदि फाइल (image) छ भने image path सेट गर्ने
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // नयाँ कोर्सको डाटा बनाउने
    const newCourse = new Course({
      title,
      category,
      duration,
      description,
      coursesdescription,
      image,
    });
    await newCourse.save();

    res.json({ success: true, message: "Course added successfully" });
  } catch (err) {
    // त्रुटि आएमा प्रतिक्रिया पठाउने
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 कोर्स अपडेट गर्ने (PUT/PATCH)
export const updateCourse = async (req, res) => {
  try {
    const { title, category, duration, description, coursesdescription } =
      req.body;
    const course = await Course.findById(req.params.id);

    // यदि कोर्स पाइएन भने
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    // नयाँ image भएमा पुरानो image हटाउने
    if (req.file) {
      if (course.image) {
        const imagePath = path.join("public", course.image);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      }
      // नयाँ image सेट गर्ने
      course.image = `/uploads/${req.file.filename}`;
    }

    // अन्य विवरण अपडेट गर्ने
    course.title = title;
    course.category = category;
    course.duration = duration;
    course.description = description;
    course.coursesdescription = coursesdescription;
    await course.save();

    res.json({ success: true, message: "Course updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 कोर्स हटाउने (DELETE)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    // यदि कोर्स फेला परेन भने
    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    // image भएमा delete गर्ने
    if (course.image) {
      const imagePath = path.join("public", course.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    // कोर्स delete गर्ने
    await Course.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔹 ID को आधारमा एकल कोर्स प्राप्त गर्ने (GET by ID)
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      // यदि कोर्स छैन भने 404 पठाउने
      return res.status(404).json({ message: "Course not found" });
    }
    // सफल भएमा कोर्स डाटा पठाउने
    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// controllers/courseController.js
// export const publishCourse = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const course = await Course.findById(id);
//     if (!course) return res.status(404).json({ message: 'Course not found' });

//     course.status = 'published';
//     await course.save();

//     res.json({ message: 'Course published successfully', course });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
