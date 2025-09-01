'use client';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'http://localhost:5000/api';

export default function AdminBlogPanel() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState<{ title: string; content: string; image: File | null }>({
    title: '',
    content: '',
    image: null,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const editorRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null); // for scroll

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/blogs`);
      setBlogs(res.data);
    } catch (error) {
      toast.error('Failed to load blogs.');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, html);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const content = editorRef.current?.innerHTML || '';
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', content);
    if (form.image) formData.append('image', form.image);

    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/blogs/${editingId}`, formData);
        toast.success('Blog updated successfully!');
        setEditingId(null);
      } else {
        await axios.post(`${BASE_URL}/blogs`, formData);
        toast.success('Blog added successfully!');
      }

      setForm({ title: '', content: '', image: null });
      if (editorRef.current) editorRef.current.innerHTML = '';
      fetchBlogs();
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const handleEdit = (blog: any) => {
    setForm({ title: blog.title, content: blog.content, image: null });
    if (editorRef.current) editorRef.current.innerHTML = blog.content;
    setEditingId(blog._id);

    // Scroll to form
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await axios.delete(`${BASE_URL}/blogs/${id}`);
        toast.success('Blog deleted successfully!');
        fetchBlogs();
      } catch (error) {
        toast.error('Failed to delete blog.');
      }
    }
  };

  return (
    <>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12">
            <h2 className="mb-4 text-center">
              {editingId ? 'Edit Blog' : 'Add Blog'}
            </h2>

            <form
              onSubmit={handleSubmit}
              ref={formRef}
              encType="multipart/form-data"
              className="p-4 border rounded shadow-sm bg-white"
            >
              <div className="mb-3">
                <label className="form-label fw-semibold">Title *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Content *</label>
                <div
                  ref={editorRef}
                  className="form-control"
                  contentEditable
                  onPaste={handlePaste}
                  style={{
                    minHeight: '150px',
                    overflowY: 'auto',
                  }}
                  suppressContentEditableWarning={true}
                ></div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Upload Image *</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.files?.[0] || null })
                  }
                />
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-success px-4">
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>



      {/* Blog preview section */}
      <section>
        <div className="container">
          <h4>All Blogs</h4>
          <div className="row">
            {blogs.map((blog: any) => {
              const div = document.createElement('div');
              div.innerHTML = blog.content;
              const text = div.textContent || div.innerText || '';
              const preview = text.length > 50 ? text.slice(0, 50) + '...' : text;

              return (
                <div key={blog._id} className="col-lg-4 col-md-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    {blog.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${blog.image}`}
                        alt={blog.title}
                        className="card-img-top"
                        style={{ objectFit: 'cover', height: '180px' }}
                      />
                    ) : (
                      <div
                        style={{
                          height: '180px',
                          backgroundColor: '#f0f0f0',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: '#888',
                          fontSize: '14px',
                        }}
                      >
                        No Image Available
                      </div>
                    )}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{blog.title}</h5>
                      <p className="card-text flex-grow-1" style={{ fontSize: '0.9rem' }}>
                        {preview}
                      </p>
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleEdit(blog)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(blog._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
