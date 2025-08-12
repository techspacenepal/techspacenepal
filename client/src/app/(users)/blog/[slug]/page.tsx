'use client';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { FaRegCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import toast, { Toaster } from "react-hot-toast";

interface Blog {
    _id: string;
    title: string;
    content: string;
    image: string;
    date: string;
}
interface Viewer {
    name: string;
    email: string;
    viewedAt: string;
}
interface Comment {
    id: string;
    name: string;
    email: string;
    content: string;
    date: string;
}

// 📝 This helper disables truncation; returns full HTML string
function truncateHtml(html: string, maxLength: number): string {
    return html;
}

export default function BlogDetailPage() {
    const params = useParams();
    const router = useRouter();

    const [blog, setBlog] = useState<Blog | null>(null);
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewers] = useState<Viewer[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [viewsCount, setViewsCount] = useState(0);
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    // ✅ Handle comment form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !content) return alert("All fields are required!");

        setLoading(true);

        try {
            const res = await axios.post("http://localhost:5000/api/comments", {
                blogId: blog?._id, // 💡 Pass blogId to link comment with the blog
                name,
                email,
                content,
            });

            if (res.status === 201) {
                // 🎉 Add new comment at the top
                const newComment: Comment = {
                    id: res.data._id, // ⬅ Backend sends _id
                    name: res.data.name,
                    email: res.data.email,
                    content: res.data.content,
                    date: res.data.createdAt, // ⬅ Accurate creation date
                };
                setComments([newComment, ...comments]);

                // ✨ Reset form fields
                setName("");
                setEmail("");
                setContent("");

                toast.success("Comment posted successfully!");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to post comment!");
        } finally {
            setLoading(false);
        }
    };

    // 📥 Fetch all comments for this blog
    useEffect(() => {
        const fetchComments = async () => {
            if (!blog?._id) return;

            try {
                const res = await axios.get(`http://localhost:5000/api/comments/${blog._id}`);
                setComments(res.data);
            } catch (error) {
                console.error("Failed to fetch comments:", error);
            }
        };

        fetchComments();
    }, [blog]);

    // 👁 Track unique blog views (1 per tab/session)
    useEffect(() => {
        if (!blog?._id) return;

        const viewKey = `viewed-${blog._id}`;
        const hasViewed = sessionStorage.getItem(viewKey);

        if (!hasViewed) {
            let name = "Unknown";
            let email = "unknown@example.com";

            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    name = parsedUser.name || "Unknown";
                    email = parsedUser.email || "unknown@example.com";
                } catch (error) {
                    console.error("Failed to parse user info:", error);
                }
            }

            axios.post(`http://localhost:5000/api/blogs/${blog._id}/view`, {
                name,
                email,
            })
                .then(() => {
                    sessionStorage.setItem(viewKey, "true"); // ✅ Mark as viewed
                })
                .catch(err => console.error("View log failed:", err));
        }
    }, [blog]);

    // 🔄 Fetch total number of views for this blog
    useEffect(() => {
        if (!blog?._id) return;

        const fetchViewsCount = async () => {
            try {
                const res = await axios.get<Viewer[]>(`http://localhost:5000/api/blogs/${blog._id}/views`);
                setViewsCount(res.data.length);
            } catch (error) {
                console.error("Failed to fetch views count", error);
            }
        };

        fetchViewsCount();
    }, [blog, viewers]);

    // 🆕 Generate URL-friendly slugs from blog titles
    const createSlug = (title: string): string =>
        title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');


    useEffect(() => {
        const rawSlug = (params as { slug?: string | string[] }).slug;
        const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

        if (!slug) {
            router.replace('/404');
            return;
        }

        const stored = sessionStorage.getItem("recentBlogs");

        if (stored) {
            try {
                const parsed: Blog[] = JSON.parse(stored);
                const currentBlog = parsed.find((b: Blog) => createSlug(b.title) === slug);
                if (!currentBlog) {
                    router.replace('/404');
                    return;
                }
                setBlog(currentBlog);
                setRecentBlogs(parsed.filter((b: Blog) => b._id !== currentBlog._id).slice(0, 9));
                setLoading(false);
            } catch (err) {
                console.error(err);
                router.replace('/404');
            }
        } else {
            // fallback: backend fetch if no sessionStorage (e.g. direct access)
            axios.get("http://localhost:5000/api/blogs").then(res => {
                const allBlogs: Blog[] = res.data;
                const currentBlog = allBlogs.find((b: Blog) => createSlug(b.title) === slug);
                if (!currentBlog) {
                    router.replace('/404');
                    return;
                }
                setBlog(currentBlog);
                setRecentBlogs(allBlogs.filter((b: Blog) => b._id !== currentBlog._id).slice(0, 9));
                setLoading(false);
            }).catch(err => {
                console.error(err);
                router.replace('/404');
            });
        }
    }, [params, router]);
    // ⏳ Show loader while fetching
    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status" />
            </div>
        );
    }

    // ❌ Blog not found fallback
    if (!blog) {
        return (
            <div className="container py-5 text-center">
                <h2 className="text-danger">Blog not found</h2>
            </div>
        );
    }

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Head>
                <title>{blog?.title || 'Blog Detail'}</title>
                <meta name="description" content={blog?.content?.replace(/<[^>]*>?/gm, '').slice(0, 150) || 'Blog description'} />
                <meta property="og:title" content={blog?.title} />
                <meta property="og:description" content={blog?.content?.replace(/<[^>]*>?/gm, '').slice(0, 150)} />
                <meta property="og:image" content={`http://localhost:5000/uploads/${blog?.image}`} />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blog?.title} />
                <meta name="twitter:description" content={blog?.content?.replace(/<[^>]*>?/gm, '').slice(0, 150)} />
                <meta name="twitter:image" content={`http://localhost:5000/uploads/${blog?.image}`} />
            </Head>

            <div className="container py-5">
                <div className="row">
                    <div className="col-md-9">
                        <h1 className="fw-bold text-primary">{blog.title}</h1>
                        {/* Social Media Share Buttons */}





                        {blog.image && (
                            <div
                                style={{
                                    paddingTop: '1rem',
                                    paddingBottom: '1rem',
                                    display: 'flex',
                                    justifyContent: 'start',
                                }}
                            >
                                <img
                                    src={`http://localhost:5000/uploads/${blog.image}`}
                                    alt={blog.title}
                                    className="w-100 rounded mb-3 me-3"
                                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                                />
                            </div>
                        )}




                        <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                            {/* LEFT: Blog meta info */}
                            <div className="d-flex align-items-center gap-3">
                                <div
                                    className="text-muted mb-0 d-flex align-items-center"
                                    style={{ fontSize: '0.85rem' }}
                                >
                                    <FaRegCalendarAlt className="me-2" />
                                    {new Date(blog.date).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </div>

                                <div
                                    className="d-flex align-items-center"
                                    style={{ cursor: "pointer", gap: "0.25rem" }}
                                >
                                    <i className="bi bi-eye"></i>
                                    <span>{viewsCount}</span>
                                    <span>views</span>
                                </div>

                                <div
                                    className="d-flex align-items-center gap-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShowComments(!showComments)}
                                >
                                    <i className="bi bi-chat-dots"></i>
                                    {comments.length > 0 && <span>{comments.length}</span>}
                                    <span>Comments</span>
                                </div>
                            </div>

                            {/* RIGHT: Share buttons */}
                            <div className="d-flex align-items-center gap-2">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                    style={{ width: "30px", height: "30px", backgroundColor: "#3b5998", color: "#fff" }}
                                >
                                    <FaFacebookF size={14} />
                                </a>

                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                    style={{ width: "30px", height: "30px", backgroundColor: "#1da1f2", color: "#fff" }}
                                >
                                    <FaTwitter size={14} />
                                </a>

                                <a
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                    style={{ width: "30px", height: "30px", backgroundColor: "#0077b5", color: "#fff" }}
                                >
                                    <FaLinkedinIn size={14} />
                                </a>

                                <a
                                    href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                    style={{ width: "30px", height: "30px", backgroundColor: "#0088cc", color: "#fff" }}
                                >
                                    <FaTelegramPlane size={14} />
                                </a>

                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                    style={{ width: "30px", height: "30px", backgroundColor: "#25D366", color: "#fff" }}
                                >
                                    <FaWhatsapp size={14} />
                                </a>
                            </div>
                        </div>
                        <p
                            className="text-muted mb-0"
                            style={{ fontSize: "0.95rem", lineHeight: "1.6", flexGrow: 1 }}
                            dangerouslySetInnerHTML={{ __html: truncateHtml(blog.content, 120) }}
                        ></p>



                        <div className="pt-5">
                            <h4 className="fw-bold text-primary mb-3">Leave Your Thoughts</h4>
                            <p className="text-muted mb-4">
                                Your email address will not be published. Required fields are marked <span className="text-danger">*</span>
                            </p>

                            <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded-4 bg-white shadow-sm">
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control py-2 px-4"
                                            placeholder="Full Name *"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            style={{ fontSize: "1rem", color: "#495057" }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="email"
                                            className="form-control py-2 px-4"
                                            placeholder="Email Address *"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            style={{ fontSize: "1rem", color: "#495057" }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <textarea
                                            className="form-control py-2 px-4"
                                            rows={5}
                                            placeholder="Write your comment here *"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            required
                                            style={{ fontSize: "1rem", color: "#495057" }}
                                        ></textarea>
                                    </div>
                                    <div className="col-12 text-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4 py-2 rounded"
                                            disabled={loading}
                                        >
                                            {loading ? "Submitting..." : "Post Comment"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div
                        className="col-lg-3 col-md-4 col-sm-12"
                        style={{
                            position: "relative",
                            border: "1px solid #dee2e6",
                            borderRadius: "4px",
                        }}
                    >
                        {/* Centered text overlapping the border */}
                        <h4
                            className="fw-bold text-primary mb-4 text-center fs-5"
                            style={{
                                display: "inline-block",
                                position: "absolute",
                                top: 0,                        
                                left: "50%",                  
                                transform: "translate(-50%, -50%)",
                                backgroundColor: "#fff",      
                                padding: "0 1rem",            
                            }}
                        >
                            Popular Posts
                        </h4>


                        <div
                            className="p-2"
                            style={{
                                marginTop: "25px",
                                marginBottom: "25px",
                            }}
                        >
                            <div className="d-flex flex-column gap-3">
                                {recentBlogs.map((b, index) => (
                                    <div
                                        key={b._id}
                                        className={`pb-3 ${index !== recentBlogs.length - 1 ? "border-bottom" : ""}`}
                                        style={{
                                            borderColor: "#dee2e6", 
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Link
                                            href={`/blog/${createSlug(b.title)}`}
                                            className="d-flex align-items-center p-2 border rounded gap-3 text-decoration-none text-dark w-100 shadow-sm"
                                            style={{ minHeight: "100px" }}
                                        >
                                            {/* Image */}
                                            <Image
                                                src={`http://localhost:5000/uploads/${b.image}`}
                                                alt={b.title}
                                                width={80}
                                                height={80}
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: "4px",
                                                    flexShrink: 0,
                                                }}
                                            />

                                            {/* Text */}
                                            <div>
                                                <h6 className="mb-1 fw-semibold" style={{ fontSize: "1rem" }}>
                                                    {b.title.length > 50 ? b.title.slice(0, 50) + "..." : b.title}
                                                </h6>
                                                <small className="text-muted" style={{ fontSize: "0.85rem" }}>
                                                    {new Date(b.date).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </small>
                                            </div>
                                        </Link>

                                    </div>
                                ))}
                            </div>



                        </div>

                    </div>




                </div>
            </div>





            {/* Comments Section show*/}
            {showComments && (
                <div
                    className="modal fade show d-block"
                    tabIndex={-1}
                    role="dialog"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Comments ({comments.length})</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowComments(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {comments.length === 0 ? (
                                    <p className="text-muted">No comments yet.</p>
                                ) : (
                                    comments.map((comment) => (
                                        <div key={comment.id} className="mb-4 border-bottom pb-3">
                                            <div className="d-flex align-items-start gap-3">
                                                <div
                                                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                                                    style={{ width: "40px", height: "40px" }}
                                                >
                                                    {comment.name[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="mb-1 fw-semibold">{comment.name}</p>
                                                    <p className="text-muted mb-2">{comment.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </>
    );
}
