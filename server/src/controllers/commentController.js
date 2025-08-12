import Comment from '../models/commentModel.js';

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { blogId, name, email, content } = req.body;

    if (!blogId || !name || !email || !content) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const comment = await Comment.create({ blogId, name, email, content });
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Failed to create comment.' });
  }
};

// Get all comments for a specific blog
export const getCommentsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments.' });
  }
};
