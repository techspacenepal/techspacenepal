import express from 'express';
import CourseVideo from "../models/CourseVideo.js"; 

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const video = await CourseVideo.findById(id); 
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json({ video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});




export default router;
