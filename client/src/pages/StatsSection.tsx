'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface StatItem {
  _id: string;
  icon: string;
  value: number;
  label: string;
}

export default function StatsSection() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [counts, setCounts] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const animatedOnce = useRef(false);
  const hasBeenVisibleBefore = useRef(false);

  const startCountAnimation = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    const incrementValues = stats.map((stat) => stat.value / steps);

    let step = 0;

    const counter = setInterval(() => {
      step++;
      const updatedCounts = incrementValues.map((inc, i) =>
        step < steps ? Math.round(inc * step) : stats[i].value
      );

      setCounts(updatedCounts);

      if (step >= steps) clearInterval(counter);
    }, interval);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/stats');
        setStats(data);
        setCounts(data.map(() => 0));
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasBeenVisibleBefore.current) {
            // First visible on page load — do NOT animate yet
            hasBeenVisibleBefore.current = true;
          } else if (!animatedOnce.current) {
            // Visible again after being hidden — start animation
            animatedOnce.current = true;
            startCountAnimation();
            observer.disconnect();
          }
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [stats]);

  return (
    <section className="py-5 bg-light" ref={sectionRef}>
      <div className="container">
        {/* On md and above, use a single row. Below md, split into 2 rows with 2 items each */}
        <div className="d-none d-md-block">
          <div className="row text-center">
            {stats.map((stat, index) => (
              <div
                key={stat._id}
                className={`col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0 ${index !== stats.length - 1 ? 'border-end border-light-subtle-5' : ''
                  }`}
              >
                <div className="d-flex flex-column align-items-center">
                  <i className={`${stat.icon} text-primary fs-1 mb-2`}></i>
                  <h3 className="fw-bold text-primary">
                    {counts[index]?.toLocaleString() ?? 0}+
                  </h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Below md: 2 rows, each with 2 cards */}
        <div className="d-md-none">
          <div className="bg-white rounded-4 p-3 shadow-sm">
            {[0, 2].map((startIndex) => (
              <div className="row text-center" key={startIndex}>
                {stats.slice(startIndex, startIndex + 2).map((stat, i) => (
                  <div key={stat._id} className="col-6 mb-3">
                    <div className="child-card d-flex flex-column align-items-center justify-content-center px-2 py-3">
                      <i className={`${stat.icon} child-icon mb-2`}></i>
                      <h6 className="fw-semibold mb-1">{counts[startIndex + i]?.toLocaleString() ?? 0}+</h6>
                      <small className="text-muted">{stat.label}</small>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>

  );
}
