

import EnrolledCourse from '../models/enrolledCourses.js';

const checkEnrollmentBeforeUpload = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const enrolled = await EnrolledCourse.find({ courseId });

    if (enrolled.length === 0) {
      return res.status(403).json({
        message: '📛 No students enrolled yet. Upload not allowed.',
      });
    }

    next();
  } catch (error) {
    console.error('Enrollment check failed:', error.message);
    res.status(500).json({ message: 'Server error checking enrollment' });
  }
};

export default checkEnrollmentBeforeUpload;
