import Blog from '../models/blogModel.js';
import fs from 'fs';

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ date: -1 });
  res.json(blogs);
};

export const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file.filename;
  const blog = await Blog.create({ title, content, image });
  res.status(201).json(blog);
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  if (req.file) {
    updateData.image = req.file.filename;
    const oldBlog = await Blog.findById(id);
    if (oldBlog?.image) {
      fs.unlinkSync(`uploads/${oldBlog.image}`);
    }
  }

  const updated = await Blog.findByIdAndUpdate(id, updateData, { new: true });
  res.json(updated);
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).json({ error: 'Not found' });

  fs.unlinkSync(`uploads/${blog.image}`);
  await Blog.findByIdAndDelete(id);
  res.json({ message: 'Deleted' });
};

export const addBlogView = async (req, res) => {
  const { blogId } = req.params;
  const { name, email } = req.body;
  const blog = await Blog.findById(blogId);
  blog.views.push({ name, email });
  await blog.save();
  res.status(200).json({ message: 'View added' });
};

export const getBlogViews = async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
  res.json(blog?.views || []);
};
