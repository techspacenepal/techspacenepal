'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { FaRegCalendarAlt } from 'react-icons/fa';

interface Blog {
    _id: string;
    title: string;
    content: string;
    image: string;
    date: string;
}

interface BlogListProps {
    page?: number;
}

function truncateWords(html: string, maxWords: number): string {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
}

// ✅ NEW: BlogViews component
function BlogViews({ blogId }: { blogId: string }) {
    const [viewsCount, setViewsCount] = useState(0);

    useEffect(() => {
        if (!blogId) return;

        const viewKey = `viewed-${blogId}`;
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

            axios.post(`http://localhost:5000/api/blogs/${blogId}/view`, {
                name,
                email,
            })
                .then(() => {
                    sessionStorage.setItem(viewKey, "true");
                })
                .catch(err => console.error("View log failed:", err));
        }

        const fetchViewsCount = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/blogs/${blogId}/views`);
                setViewsCount(res.data.length);
            } catch (error) {
                console.error("Failed to fetch views count", error);
            }
        };

        fetchViewsCount();
    }, [blogId]);

    return (
        <div className="d-flex align-items-center" style={{ gap: "0.25rem" }}>
            <i className="bi bi-eye"></i>
            <span>{viewsCount}</span>
            <span>views</span>
        </div>
    );
}

export default function BlogListPage({ page }: BlogListProps): React.JSX.Element {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const router = useRouter();
    const blogsPerPage = 9;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get<Blog[]>('http://localhost:5000/api/blogs');
                setBlogs(res.data);
            } catch (error) {
                console.error('Error fetching blogs', error);
            }
        };
        fetchBlogs();
    }, []);

    const sortedBlogs = [...blogs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );



    const createSlug = (title: string) =>
        title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const currentBlogs = sortedBlogs.slice(0, 6);

    return (
        <>


            <section className='bg-light'>
                <div className="container py-5">
                    {blogs.length === 0 && (
                        <p className="text-center text-muted">No blogs found.</p>
                    )}

                    <h2
                        className='text-center mb-0'
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '700',
                            fontSize: '2.5rem',
                            color: '#00214D',
                            letterSpacing: '2px',
                            paddingBottom: '30px', // equal space below heading
                        }}
                    >
                        Blog
                    </h2>

                    <div
                        className="row g-4"
                        style={{
                            paddingBottom: '30px', // equal space below cards
                        }}
                    >
                        {currentBlogs.map((blog) => (
                            <div key={blog._id} className="col-12 col-sm-6 col-lg-4">
                                <div
                                    className="card border-1 shadow-md w-100 h-100 mb-0"
                                    style={{
                                        transition: 'transform 0.3s ease',
                                        minHeight: '470px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Link
                                        href={`/blog/${createSlug(blog.title)}`}
                                        onClick={() => {
                                            sessionStorage.setItem("recentBlogs", JSON.stringify(currentBlogs));
                                        }}
                                        className="d-block"
                                    >
                                        <img
                                            src={`http://localhost:5000/uploads/${blog.image}`}
                                            alt={blog.title}
                                            className="card-img-top"
                                            style={{
                                                height: '207px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Link>
                                    <div className="card-body d-flex flex-column">
                                        <div
                                            className="text-muted mb-3 d-flex align-items-center justify-content-between"
                                            style={{ fontSize: '0.85rem' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <FaRegCalendarAlt className="me-2" />
                                                {new Date(blog.date).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </div>
                                            {/* 👁 NEW: BlogViews */}
                                            <BlogViews blogId={blog._id} />
                                        </div>
                                        <Link
                                            href={`/blog/${createSlug(blog.title)}`}
                                            onClick={() => {
                                                sessionStorage.setItem("recentBlogs", JSON.stringify(currentBlogs));
                                            }}
                                            className="text-decoration-none text-dark mb-2"
                                        >
                                            <h5
                                                className="fw-bold text-dark"
                                                style={{ lineHeight: '1.4', fontSize: '1.8rem' }}
                                            >
                                                {blog.title}
                                            </h5>
                                        </Link>
                                        <p
                                            className="text-muted mb-0"
                                            style={{ fontSize: "0.95rem", lineHeight: "1.6", flexGrow: 1 }}
                                        >
                                            {truncateWords(blog.content, 25)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        className='text-center'
                        style={{
                            paddingTop: '30px', // equal space above button
                        }}
                    >
                        <Link
                            href="/blog"
                            className="blog-btn"
                        >
                            Read More
                        </Link>
                    </div>
                </div>
            </section>

        </>
    );
}
