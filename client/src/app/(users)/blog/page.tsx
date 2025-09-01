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

export default function BlogList({ page }: BlogListProps): React.JSX.Element {
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

    const totalPages = Math.ceil(sortedBlogs.length / blogsPerPage);
    const currentPage = page && page >= 1 ? page : 1;
    const currentBlogs = sortedBlogs.slice(
        (currentPage - 1) * blogsPerPage,
        currentPage * blogsPerPage
    );

    const goToPage = (p: number) => {
        if (p === 1) {
            router.push('/blog');
        } else {
            router.push(`/blog/page/${p}`);
        }
    };

    const createSlug = (title: string) =>
        title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    return (
        <>
            <section
                className="text-white"
                style={{
                    background: 'linear-gradient(135deg, #1d3557, #457b9d)',
                    minHeight: '300px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="container text-center py-5">
                    <h1
                        className="fw-bold mb-3"
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            lineHeight: '1.3',
                        }}
                    >
                        Blog
                    </h1>
                   
                </div>
            </section>

            <section>
                <div className="container py-5">
                    {blogs.length === 0 && (
                        <p className="text-center text-muted">No blogs found.</p>
                    )}

                    <div className="row g-4">
                        {currentBlogs.map((blog) => (
                            <div key={blog._id} className="col-12 col-sm-6 col-lg-4">
                                <div
                                    className="card border-1 shadow-md w-100 h-100"
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
                                    >                                        <img
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
                                        <div className="text-muted mb-3 d-flex align-items-center justify-content-between" style={{ fontSize: '0.85rem' }}>
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
                                            href={`/blog/${createSlug(blog.title)}`} onClick={() => {
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-5 flex-wrap gap-2">
                            {/* Previous */}
                            {currentPage > 1 ? (
                                <Link href={currentPage - 1 === 1 ? "/blog" : `/blog/page/${currentPage - 1}`} passHref legacyBehavior>
                                    <a className="border rounded px-3 py-1 text-decoration-none">«</a>
                                </Link>
                            ) : (
                                <span className="border rounded px-3 py-1 text-muted">«</span>
                            )}

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => {
                                const pageNum = i + 1;
                                const isActive = pageNum === currentPage;
                                const href = pageNum === 1 ? "/blog" : `/blog/page/${pageNum}`;

                                return (
                                    <Link href={href} key={pageNum} passHref legacyBehavior>
                                        <a
                                            className={`border rounded px-3 py-1 text-decoration-none ${isActive ? "bg-primary text-white" : "bg-white text-primary"
                                                }`}
                                        >
                                            {pageNum}
                                        </a>
                                    </Link>
                                );
                            })}

                            {/* Next */}
                            {currentPage < totalPages ? (
                                <Link href={`/blog/page/${currentPage + 1}`} passHref legacyBehavior>
                                    <a className="border rounded px-3 py-1 text-decoration-none">»</a>
                                </Link>
                            ) : (
                                <span className="border rounded px-3 py-1 text-muted">»</span>
                            )}
                        </div>
                    )}



                </div>
            </section>
        </>
    );
}
