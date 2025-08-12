'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

type About = {
    _id: string;
    title: string;
    description: string;
    imageUrl?: string;
    phone?: string;
    email?: string;
};

export default function AboutSection() {
    const [about, setAbout] = useState<About | null>(null);

    useEffect(() => {
        async function fetchAbout() {
            try {
                const res = await axios.get('http://localhost:5000/api/about');
                // Assuming API returns an array, take first item
                if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                    setAbout(res.data[0]);
                }
            } catch (error) {
                console.error('Failed to load About data', error);
            }
        }

        fetchAbout();
    }, []);

    // Fallback content if data not loaded yet
    if (!about) {
        return (
            <div className="container py-5 border">
                <p className="text-center text-muted">Loading About information...</p>
            </div>
        );
    }

    return (
        <>
        <section className='py-5 bg-white'>
        <div className="container py-3">
            <div className="row align-items-center gy-5 g-5">
                {/* Left: Image */}
                <div className="col-lg-6">
                    <div
                        className="rounded overflow-hidden shadow-sm"
                        style={{ height: '100%', maxHeight: '420px' }}
                    >
                        {about.imageUrl ? (
                            <img
                                src={`http://localhost:5000${about.imageUrl}`}
                                alt={about.title}
                                className="w-100 h-100"
                                style={{
                                    objectFit: 'cover',
                                    transition: 'transform 0.4s ease-in-out',
                                }}
                            />
                        ) : (
                            <div
                                className="w-100 h-100 bg-secondary"
                                style={{ minHeight: '420px' }}
                            />
                        )}
                    </div>
                </div>

                {/* Right: Text */}
                <div className="col-lg-6">
                    <h2 className="fw-bold text-primary mb-4 display-6">{about.title || 'About Us'}</h2>

                    <p className="text-muted fs-6 lh-lg mb-4" style={{ whiteSpace: 'pre-wrap' }}>
                        {about.description ||
                            ''}
                    </p>

                    {/* Contact Info Card */}
                    <div className="">
                        <h5 className="fw-semibold mb-3 text-dark">Contact Us</h5>
                        <p className="mb-2">
                            <span className="fw-medium">Email:</span>{' '}
                            <a
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${about.email}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none text-primary fw-semibold"
                            >
                                {about.email || 'info@example.com'}
                            </a>


                        </p>
                        <p className="mb-0">
                            <span className="fw-medium">Phone:</span>{' '}
                            <a
                                href={`tel:${about.phone || '1234567890'}`}
                                className="text-decoration-none text-primary fw-semibold"
                            >
                                {about.phone || '123-456-7890'}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </section>
        </>
    );
}
