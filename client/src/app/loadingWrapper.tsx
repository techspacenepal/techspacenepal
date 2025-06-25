'use client'
import React, { useState, useEffect } from 'react';
import Header from './Component/Header';
import Footer from './Component/Footer';

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="logo-loader">
          <div className="square orange"></div>
          <div className="square blue"></div>
          <div className="square red"></div>
          <div className="square green"></div>
        </div>
        <style>{`
            .logo-loader {
              position: relative;
              width: 60px;
              height: 60px;
              animation: spin 1.5s linear infinite;
            }
            .square {
              position: absolute;
              width: 25px;
              height: 25px;
              border-radius: 4px;
            }
            .orange {
              background-color: #ff6600;
              top: 0;
              left: 0;
            }
            .blue {
              background-color: #0066ff;
              top: 0;
              right: 0;
            }
            .red {
              background-color: #ff0000;
              bottom: 0;
              left: 0;
            }
            .green {
              background-color: #00cc00;
              bottom: 0;
              right: 0;
            }
            @keyframes spin {
              0% { transform: rotate(0deg) }
              100% { transform: rotate(360deg) }
            }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
