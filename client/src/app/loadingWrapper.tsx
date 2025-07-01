// 'use client'
// import React, { useState, useEffect } from 'react';
// import Header from './Component/Header';
// import Footer from './Component/Footer';
// export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="loader-container">
//         <svg
//           className="teachspace-logo-loader"
//           width="80"
//           height="80"
//           viewBox="0 0 100 100"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-label="Loading"
//           role="img"
//         >
//           {/* Outer ring */}
//           <circle
//             className="ring"
//             cx="50"
//             cy="50"
//             r="40"
//             stroke="#0066ff"
//             strokeWidth="8"
//             strokeLinecap="round"
//             strokeDasharray="251.2"
//             strokeDashoffset="0"
//           />
//           {/* Inner rotating squares */}
//           <rect className="square1" x="50" y="50" width="50" height="100" rx="3" fill="#ff6600" />
//           <rect className="square2" x="50" y="50" width="50" height="100" rx="3" fill="#00cc00" />
//           <rect className="square3" x="50" y="50" width="50" height="100" rx="3" fill="#ff0000" />
//           <rect className="square4" x="50" y="50" width="50" height="100" rx="3" fill="#0066ff" />
//         </svg>

//         <style>{`
//           .loader-container {
//             height: 100vh;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             background: #f0f4ff;
//           }

//           .teachspace-logo-loader {
//             animation: rotate 2.5s linear infinite;
//           }

//           .ring {
//             transform-origin: 50% 50%;
//             animation: dash 1.5s ease-in-out infinite;
//           }

//           .square1, .square2, .square3, .square4 {
//             transform-origin: 50% 50%;
//             animation: squares-rotate 2.5s linear infinite;
//           }

//           .square1 {
//             animation-delay: 0s;
//           }
//           .square2 {
//             animation-delay: 0.6s;
//           }
//           .square3 {
//             animation-delay: 1.2s;
//           }
//           .square4 {
//             animation-delay: 1.8s;
//           }

//           @keyframes rotate {
//             100% {
//               transform: rotate(360deg);
//             }
//           }

//           @keyframes dash {
//             0% {
//               stroke-dashoffset: 251.2;
//             }
//             50% {
//               stroke-dashoffset: 125.6;
//               transform: rotate(45deg);
//             }
//             100% {
//               stroke-dashoffset: 251.2;
//               transform: rotate(360deg);
//             }
//           }

//           @keyframes squares-rotate {
//             0% {
//               transform: translate(0,0) rotate(0deg);
//               opacity: 1;
//             }
//             50% {
//               transform: translate(0,8px) rotate(180deg);
//               opacity: 0.6;
//             }
//             100% {
//               transform: translate(0,0) rotate(360deg);
//               opacity: 1;
//             }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       {children}
//       <Footer />
//     </>
//   );
// }




// 'use client'
// import React, { useState, useEffect } from 'react';
// import Header from './Component/Header';
// import Footer from './Component/Footer';

// export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="loader-container">
//         <svg
//           className="teachspace-logo-loader"
//           width="80"
//           height="80"
//           viewBox="0 0 100 100"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-label="Loading"
//           role="img"
//         >
//           {/* Outer ring */}
//           <circle
//             className="ring"
//             cx="50"
//             cy="50"
//             r="40"
//             stroke="#0066ff"
//             strokeWidth="8"
//             strokeLinecap="round"
//             strokeDasharray="251.2"
//             strokeDashoffset="0"
//           />

//           {/* Rotated squares (diamonds) */}
//           <rect
//             className="square1"
//             x="50"
//             y="50"
//             width="50"
//             height="50"
//             rx="6"
//             fill="#ff6600"
//             transform="rotate(45 50 50)"
//           />
//           <rect
//             className="square2"
//             x="50"
//             y="50"
//             width="50"
//             height="50"
//             rx="6"
//             fill="#00cc00"
//             transform="rotate(45 50 50)"
//           />
//           <rect
//             className="square3"
//             x="50"
//             y="50"
//             width="50"
//             height="50"
//             rx="6"
//             fill="#ff0000"
//             transform="rotate(45 50 50)"
//           />
//           <rect
//             className="square4"
//             x="50"
//             y="50"
//             width="50"
//             height="50"
//             rx="6"
//             fill="#0066ff"
//             transform="rotate(45 50 50)"
//           />
//         </svg>

//         <style>{`
//           .loader-container {
//             height: 100vh;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             background: #f0f4ff;
//           }

//           .teachspace-logo-loader {
//             animation: rotate 2.5s linear infinite;
//           }

//           .ring {
//             transform-origin: 50% 50%;
//             animation: dash 1.5s ease-in-out infinite;
//           }

//           .square1, .square2, .square3, .square4 {
//             transform-origin: 50% 50%;
//             animation: squares-rotate 2.5s linear infinite;
//           }

//           .square1 {
//             animation-delay: 0s;
//           }
//           .square2 {
//             animation-delay: 0.6s;
//           }
//           .square3 {
//             animation-delay: 1.2s;
//           }
//           .square4 {
//             animation-delay: 1.8s;
//           }

//           @keyframes rotate {
//             100% {
//               transform: rotate(360deg);
//             }
//           }

//           @keyframes dash {
//             0% {
//               stroke-dashoffset: 251.2;
//             }
//             50% {
//               stroke-dashoffset: 125.6;
//               transform: rotate(45deg);
//             }
//             100% {
//               stroke-dashoffset: 251.2;
//               transform: rotate(360deg);
//             }
//           }

//           @keyframes squares-rotate {
//             0% {
//               transform: translate(0,0) rotate(0deg);
//               opacity: 1;
//             }
//             50% {
//               transform: translate(0,8px) rotate(180deg);
//               opacity: 0.6;
//             }
//             100% {
//               transform: translate(0,0) rotate(360deg);
//               opacity: 1;
//             }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       {children}
//       <Footer />
//     </>
//   );
// }





// 'use client'
// import React, { useState, useEffect } from 'react';
// import Header from './Component/Header';
// import Footer from './Component/Footer';

// export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2500);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="loader-container" role="alert" aria-busy="true" aria-label="Loading TeachSpace">
//         <svg
//           className="loader-svg"
//           width="120"
//           height="120"
//           viewBox="0 0 100 100"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-hidden="true"
//           role="img"
//         >
//           {/* Outer animated ring */}
//           <circle
//             className="ring"
//             cx="50"
//             cy="50"
//             r="42"
//             stroke="url(#ringGradient)"
//             strokeWidth="8"
//             strokeLinecap="round"
//             fill="none"
//             strokeDasharray="263.89"
//             strokeDashoffset="0"
//           />
//           <defs>
//             <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#0066ff" />
//               <stop offset="100%" stopColor="#00ccff" />
//             </linearGradient>
//           </defs>

//           {/* Group 1 - Rotating diamonds */}
//           <g className="group1" transform="translate(50 50)">
//             <rect
//               className="diamond"
//               width="25"
//               height="25"
//               rx="6"
//               ry="6"
//               fill="#ff6600"
//               transform="rotate(45) translate(-12.5 -12.5)"
//             />
//             <rect
//               className="diamond"
//               width="25"
//               height="25"
//               rx="6"
//               ry="6"
//               fill="#00cc00"
//               transform="rotate(135) translate(-12.5 -12.5)"
//             />
//           </g>

//           {/* Group 2 - Rotating smaller diamonds opposite direction */}
//           <g className="group2" transform="translate(50 50)">
//             <rect
//               className="diamond small"
//               width="15"
//               height="15"
//               rx="4"
//               ry="4"
//               fill="#ff0000"
//               transform="rotate(45) translate(-7.5 -7.5)"
//             />
//             <rect
//               className="diamond small"
//               width="15"
//               height="15"
//               rx="4"
//               ry="4"
//               fill="#0066ff"
//               transform="rotate(135) translate(-7.5 -7.5)"
//             />
//           </g>
//         </svg>

//         <style>{`
//           .loader-container {
//             height: 100vh;
//             background: #f0f4ff;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             filter: drop-shadow(0 0 15px rgba(0, 102, 255, 0.4));
//             user-select: none;
//           }

//           .loader-svg {
//             animation: rotate 8s linear infinite;
//             width: 120px;
//             height: 120px;
//           }

//           .ring {
//             transform-origin: 50% 50%;
//             animation: dash 3s ease-in-out infinite;
//             filter: drop-shadow(0 0 8px #00ccff);
//           }

//           .group1 {
//             animation: rotateClockwise 6s linear infinite;
//           }
//           .group2 {
//             animation: rotateCounterClockwise 4s linear infinite;
//           }

//           .diamond {
//             filter: drop-shadow(0 0 5px rgba(255, 102, 0, 0.7));
//             transform-origin: center;
//             animation: pulseScale 3s ease-in-out infinite;
//           }

//           .diamond.small {
//             filter: drop-shadow(0 0 5px rgba(0, 102, 255, 0.7));
//             animation-delay: 1.5s;
//             animation: pulseScale 3s ease-in-out infinite;
//             transform-origin: center;
//           }

//           /* Animations */
//           @keyframes rotate {
//             100% { transform: rotate(360deg); }
//           }

//           @keyframes dash {
//             0% { stroke-dashoffset: 263.89; }
//             50% { stroke-dashoffset: 131.95; transform: rotate(30deg); }
//             100% { stroke-dashoffset: 263.89; transform: rotate(360deg); }
//           }

//           @keyframes rotateClockwise {
//             100% { transform: rotate(360deg); }
//           }

//           @keyframes rotateCounterClockwise {
//             100% { transform: rotate(-360deg); }
//           }

//           @keyframes pulseScale {
//             0%, 100% { transform: scale(1); opacity: 1; }
//             50% { transform: scale(1.3); opacity: 0.7; }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       {children}
//       <Footer />
//     </>
//   );
// }





// 'use client'
// import React, { useState, useEffect } from 'react';
// import Header from './Component/Header';
// import Footer from './Component/Footer';

// export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="loader-container" role="alert" aria-busy="true" aria-label="Loading TeachSpace">
//         <svg
//           className="loader-svg"
//           width="140"
//           height="140"
//           viewBox="0 0 100 100"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-hidden="true"
//           role="img"
//         >
//           <defs>
//             {/* Gradient for outer ring */}
//             <linearGradient id="gradientRing" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="var(--blue-light)" />
//               <stop offset="50%" stopColor="var(--blue)" />
//               <stop offset="100%" stopColor="var(--blue-dark)" />
//             </linearGradient>

//             {/* Glow filter */}
//             <filter id="glow" x="-50%" y="-50%" width="200%" height="200%" >
//               <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="var(--blue)" floodOpacity="0.6" />
//               <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="var(--blue-light)" floodOpacity="0.3" />
//             </filter>
//           </defs>

//           {/* Outer ring with animated stroke gradient */}
//           <circle
//             className="ring"
//             cx="50"
//             cy="50"
//             r="42"
//             stroke="url(#gradientRing)"
//             strokeWidth="8"
//             fill="none"
//             strokeLinecap="round"
//             strokeDasharray="263.89"
//             strokeDashoffset="0"
//             filter="url(#glow)"
//           />

//           {/* Large diamonds group (rotated squares) */}
//           <g className="group-large" transform="translate(50 50)">
//             <rect
//               className="diamond large"
//               width="26"
//               height="26"
//               rx="7"
//               ry="7"
//               fill="var(--orange)"
//               transform="rotate(45) translate(-13 -13)"
//             />
//             <rect
//               className="diamond large"
//               width="26"
//               height="26"
//               rx="7"
//               ry="7"
//               fill="var(--green)"
//               transform="rotate(135) translate(-13 -13)"
//             />
//             <rect
//               className="diamond large"
//               width="26"
//               height="26"
//               rx="7"
//               ry="7"
//               fill="var(--red)"
//               transform="rotate(225) translate(-13 -13)"
//             />
//             <rect
//               className="diamond large"
//               width="26"
//               height="26"
//               rx="7"
//               ry="7"
//               fill="var(--blue)"
//               transform="rotate(315) translate(-13 -13)"
//             />
//           </g>

//           {/* Medium diamonds with trailing blur */}
//           <g className="group-medium" transform="translate(50 50)">
//             {[0, 90, 180, 270].map((angle, i) => (
//               <rect
//                 key={i}
//                 className="diamond medium"
//                 width="18"
//                 height="18"
//                 rx="5"
//                 ry="5"
//                 fill="var(--blue-light)"
//                 transform={`rotate(${angle}) translate(-9 -35)`}
//                 style={{ filter: 'url(#glow)', opacity: 0.6 }}
//               />
//             ))}
//           </g>

//           {/* Small diamonds pulse */}
//           <g className="group-small" transform="translate(50 50)">
//             {[45, 135, 225, 315].map((angle, i) => (
//               <rect
//                 key={i}
//                 className="diamond small"
//                 width="12"
//                 height="12"
//                 rx="4"
//                 ry="4"
//                 fill="var(--orange)"
//                 transform={`rotate(${angle}) translate(-6 -28)`}
//               />
//             ))}
//           </g>
//         </svg>

//         <style>{`
//           :root {
//             --orange: #ff6600;
//             --green: #00cc00;
//             --red: #ff0000;
//             --blue: #0066ff;
//             --blue-light: #66b3ff;
//             --blue-dark: #003d99;
//           }

//           .loader-container {
//             height: 100vh;
//             background: #f0f4ff;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             user-select: none;
//             filter: drop-shadow(0 0 20px rgba(0, 102, 255, 0.6));
//           }

//           .loader-svg {
//             width: 140px;
//             height: 140px;
//             animation: rotate 12s linear infinite;
//           }

//           .ring {
//             transform-origin: 50% 50%;
//             animation: dash 4.5s cubic-bezier(0.645, 0.045, 0.355, 1) infinite;
//           }

//           /* Groups rotate at different speeds and directions */
//           .group-large {
//             transform-origin: center;
//             animation: rotateClockwise 10s linear infinite;
//           }
//           .group-medium {
//             transform-origin: center;
//             animation: rotateCounterClockwise 6s linear infinite;
//           }
//           .group-small {
//             transform-origin: center;
//             animation: pulseRotate 5s ease-in-out infinite;
//           }

//           /* Diamonds pulse and scale */
//           .diamond.large {
//             animation: pulseScale 6s ease-in-out infinite;
//             filter: drop-shadow(0 0 7px var(--orange));
//           }
//           .diamond.medium {
//             animation: pulseOpacity 6s ease-in-out infinite;
//           }
//           .diamond.small {
//             animation: pulseScale 3.5s ease-in-out infinite;
//             filter: drop-shadow(0 0 5px var(--orange));
//           }

//           /* Animations */
//           @keyframes rotate {
//             100% {
//               transform: rotate(360deg);
//             }
//           }
//           @keyframes dash {
//             0% {
//               stroke-dashoffset: 263.89;
//             }
//             50% {
//               stroke-dashoffset: 131.95;
//               transform: rotate(45deg);
//             }
//             100% {
//               stroke-dashoffset: 263.89;
//               transform: rotate(360deg);
//             }
//           }
//           @keyframes rotateClockwise {
//             100% {
//               transform: rotate(360deg);
//             }
//           }
//           @keyframes rotateCounterClockwise {
//             100% {
//               transform: rotate(-360deg);
//             }
//           }
//           @keyframes pulseRotate {
//             0%, 100% {
//               transform: rotate(0deg);
//             }
//             50% {
//               transform: rotate(15deg);
//             }
//           }
//           @keyframes pulseScale {
//             0%, 100% {
//               transform: scale(1);
//               opacity: 1;
//             }
//             50% {
//               transform: scale(1.25);
//               opacity: 0.75;
//             }
//           }
//           @keyframes pulseOpacity {
//             0%, 100% {
//               opacity: 0.6;
//             }
//             50% {
//               opacity: 1;
//             }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       {children}
//       <Footer />
//     </>
//   );
// }




// 'use client'
// import React, { useState, useEffect } from 'react';
// import Header from './Component/Header';
// import Footer from './Component/Footer';

// export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 3500);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div
//         className="loader-container"
//         role="alert"
//         aria-busy="true"
//         aria-label="Loading TeachSpace"
//       >
//         <svg
//           className="loader-svg"
//           width="150"
//           height="150"
//           viewBox="0 0 100 100"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-hidden="true"
//           role="img"
//         >
//           <defs>
//             {/* Dynamic animated gradient */}
//             <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#0066ff" />
//               <stop offset="50%" stopColor="#00ccff" />
//               <stop offset="100%" stopColor="#0066ff" />
//               <animate
//                 attributeName="x1"
//                 values="0%;100%;0%"
//                 dur="6s"
//                 repeatCount="indefinite"
//               />
//               <animate
//                 attributeName="x2"
//                 values="100%;0%;100%"
//                 dur="6s"
//                 repeatCount="indefinite"
//               />
//             </linearGradient>

//             {/* Glow Filter */}
//             <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
//               <feDropShadow
//                 dx="0"
//                 dy="0"
//                 stdDeviation="3"
//                 floodColor="#00ccff"
//                 floodOpacity="0.7"
//               />
//               <feDropShadow
//                 dx="0"
//                 dy="0"
//                 stdDeviation="6"
//                 floodColor="#0066ff"
//                 floodOpacity="0.3"
//               />
//             </filter>

//             {/* Mask for reveal */}
//             <mask id="maskReveal">
//               <rect width="100%" height="100%" fill="white" />
//               <circle
//                 cx="50"
//                 cy="50"
//                 r="42"
//                 fill="black"
//                 className="mask-circle"
//               />
//             </mask>
//           </defs>

//           {/* Outer rotating gradient ring */}
//           <circle
//             className="ring"
//             cx="50"
//             cy="50"
//             r="42"
//             stroke="url(#grad1)"
//             strokeWidth="8"
//             fill="none"
//             strokeLinecap="round"
//             filter="url(#glow)"
//             mask="url(#maskReveal)"
//           />

//           {/* 3D perspective rotating group */}
//           <g className="rotating-3d" transform="translate(50 50)">
//             {[0, 90, 180, 270].map((angle) => (
//               <rect
//                 key={angle}
//                 className="diamond"
//                 width="30"
//                 height="30"
//                 rx="8"
//                 ry="8"
//                 fill="#ff6600"
//                 transform={`rotate(${angle}) translate(-15 -35) skewX(20) skewY(10)`}
//               />
//             ))}
//             {[45, 135, 225, 315].map((angle) => (
//               <circle
//                 key={angle}
//                 className="glow-orb"
//                 r="6"
//                 fill="#00ccff"
//                 transform={`rotate(${angle}) translate(0 -45)`}
//               />
//             ))}
//           </g>
//         </svg>

//         <style>{`
//           .loader-container {
//             height: 100vh;
//             background: linear-gradient(135deg, #001122 0%, #004488 100%);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             user-select: none;
//             perspective: 600px;
//             filter: drop-shadow(0 0 20px #00ccff);
//           }

//           .loader-svg {
//             width: 150px;
//             height: 150px;
//             transform-style: preserve-3d;
//             animation: spin3d 8s linear infinite;
//           }

//           .ring {
//             transform-origin: 50% 50%;
//             animation: dashStroke 4.5s cubic-bezier(0.645, 0.045, 0.355, 1) infinite;
//           }

//           .mask-circle {
//             animation: maskRevealAnim 3.5s ease-in-out infinite alternate;
//           }

//           .rotating-3d {
//             transform-origin: center;
//             animation: rotate3dGroup 6s linear infinite;
//             transform-style: preserve-3d;
//           }

//           .diamond {
//             filter: drop-shadow(0 0 8px #ff6600);
//             animation: pulseScale3d 4s ease-in-out infinite;
//             transform-origin: center;
//           }

//           .glow-orb {
//             filter: drop-shadow(0 0 15px #00ccff);
//             animation: glowPulse 3.5s ease-in-out infinite;
//           }

//           /* Animations */
//           @keyframes spin3d {
//             0% {
//               transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
//             }
//             50% {
//               transform: rotateX(180deg) rotateY(180deg) rotateZ(180deg);
//             }
//             100% {
//               transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
//             }
//           }

//           @keyframes dashStroke {
//             0% {
//               stroke-dashoffset: 263.89;
//             }
//             50% {
//               stroke-dashoffset: 131.95;
//               transform: rotate(45deg);
//             }
//             100% {
//               stroke-dashoffset: 263.89;
//               transform: rotate(360deg);
//             }
//           }

//           @keyframes maskRevealAnim {
//             0% {
//               r: 42;
//             }
//             50% {
//               r: 50;
//             }
//             100% {
//               r: 42;
//             }
//           }

//           @keyframes rotate3dGroup {
//             0% {
//               transform: rotateX(0deg) rotateY(0deg);
//             }
//             50% {
//               transform: rotateX(180deg) rotateY(180deg);
//             }
//             100% {
//               transform: rotateX(360deg) rotateY(360deg);
//             }
//           }

//           @keyframes pulseScale3d {
//             0%, 100% {
//               transform: scale3d(1,1,1);
//               opacity: 1;
//             }
//             50% {
//               transform: scale3d(1.2,1.2,1.2);
//               opacity: 0.75;
//             }
//           }

//           @keyframes glowPulse {
//             0%, 100% {
//               opacity: 0.8;
//               filter: drop-shadow(0 0 15px #00ccff);
//             }
//             50% {
//               opacity: 1;
//               filter: drop-shadow(0 0 25px #00ccff);
//             }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       {children}
//       <Footer />
//     </>
//   );
// }



// 'use client'
// import React, { useState, useEffect } from 'react';
// import Header from './Component/Header';
// import Footer from './Component/Footer';

// export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 3500);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div
//         className="loader-container"
//         role="alert"
//         aria-busy="true"
//         aria-label="Loading TeachSpace"
//       >
//         <svg
//           className="loader-svg"
//           width="150"
//           height="150"
//           viewBox="0 0 100 100"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-hidden="true"
//         >
//           <defs>
//             {/* Gradient ring */}
//             <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#ff0000" />
//               <stop offset="33%" stopColor="#ff6600" />
//               <stop offset="66%" stopColor="#0066ff" />
//               <stop offset="100%" stopColor="#00cc00" />
//             </linearGradient>

//             <filter id="glow">
//               <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.5" />
//               <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ffffff" floodOpacity="0.3" />
//             </filter>
//           </defs>

//           {/* Outer rotating ring */}
//           <circle
//             className="ring"
//             cx="50"
//             cy="50"
//             r="42"
//             stroke="url(#grad1)"
//             strokeWidth="8"
//             fill="none"
//             strokeLinecap="round"
//             filter="url(#glow)"
//           />

//           {/* 3D rotating rectangles */}
//           <g className="rotating-3d" transform="translate(50 50)">
//             <rect className="rect red" width="30" height="15" rx="4" transform="rotate(0) translate(-15 -40)" />
//             <rect className="rect green" width="30" height="15" rx="4" transform="rotate(90) translate(-15 -40)" />
//             <rect className="rect orange" width="30" height="15" rx="4" transform="rotate(180) translate(-15 -40)" />
//             <rect className="rect blue" width="30" height="15" rx="4" transform="rotate(270) translate(-15 -40)" />
//           </g>
//         </svg>

//         <style>{`
//           .loader-container {
//             height: 100vh;
//             background: linear-gradient(135deg, #001122, #003355);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             perspective: 800px;
//           }

//           .loader-svg {
//             animation: spin3d 10s linear infinite;
//             transform-style: preserve-3d;
//           }

//           .ring {
//             transform-origin: 50% 50%;
//             animation: dashRing 4s ease-in-out infinite;
//           }

//           .rotating-3d {
//             animation: rotateGroup 6s linear infinite;
//             transform-origin: center;
//           }

//           .rect {
//             transform-origin: center;
//             animation: pulseRect 3s ease-in-out infinite;
//             filter: drop-shadow(0 0 8px rgba(0,0,0,0.3));
//           }

//           .red { fill: #ff0000; }
//           .green { fill: #00cc00; }
//           .orange { fill: #ff6600; }
//           .blue { fill: #0066ff; }

//           @keyframes spin3d {
//             100% {
//               transform: rotateX(360deg) rotateY(360deg);
//             }
//           }

//           @keyframes dashRing {
//             0% {
//               stroke-dashoffset: 263.89;
//             }
//             50% {
//               stroke-dashoffset: 131.95;
//               transform: rotate(45deg);
//             }
//             100% {
//               stroke-dashoffset: 263.89;
//               transform: rotate(360deg);
//             }
//           }

//           @keyframes rotateGroup {
//             100% {
//               transform: rotate(360deg);
//             }
//           }

//           @keyframes pulseRect {
//             0%, 100% {
//               transform: scale(1);
//               opacity: 1;
//             }
//             50% {
//               transform: scale(1.2);
//               opacity: 0.75;
//             }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       {children}
//       <Footer />
//     </>
//   );
// }





// 'use client'
// import React, { useState, useEffect } from 'react';
// import Header from './Component/Header';
// import Footer from './Component/Footer';

// export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 3500);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="loader-container" role="alert" aria-busy="true" aria-label="Loading TeachSpace">
//         <svg
//           className="loader-svg"
//           width="150"
//           height="150"
//           viewBox="0 0 100 100"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-hidden="true"
//         >
//           <defs>
//             <linearGradient id="colorRing" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="var(--red)" />
//               <stop offset="50%" stopColor="var(--orange)" />
//               <stop offset="100%" stopColor="var(--blue)" />
//               <animate attributeName="x1" values="0%;100%;0%" dur="5s" repeatCount="indefinite" />
//               <animate attributeName="x2" values="100%;0%;100%" dur="5s" repeatCount="indefinite" />
//             </linearGradient>

//             <filter id="glow">
//               <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.2" />
//               <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ffffff" floodOpacity="0.4" />
//             </filter>
//           </defs>

//           {/* Animated outer ring */}
//           <circle
//             className="ring"
//             cx="50"
//             cy="50"
//             r="42"
//             stroke="url(#colorRing)"
//             strokeWidth="8"
//             fill="none"
//             strokeLinecap="round"
//             strokeDasharray="263.89"
//             strokeDashoffset="0"
//             filter="url(#glow)"
//           />

//           {/* Colored Diamonds in 3D rotate group */}
//           <g className="rotate-group" transform="translate(50 50)">
//             <rect className="diamond red" width="30" height="30" rx="6" ry="6" transform="rotate(0) translate(-15 -35)" />
//             <rect className="diamond orange" width="30" height="30" rx="6" ry="6" transform="rotate(90) translate(-15 -35)" />
//             <rect className="diamond blue" width="30" height="30" rx="6" ry="6" transform="rotate(180) translate(-15 -35)" />
//             <rect className="diamond green" width="30" height="30" rx="6" ry="6" transform="rotate(270) translate(-15 -35)" />
//           </g>
//         </svg>

//         <style>{`
//           :root {
//             --red: #ff0000;
//             --orange: #ff6600;
//             --blue: #0066ff;
//             --green: #00cc00;
//           }

//           .loader-container {
//             height: 100vh;
//             background: #f0f4ff;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             perspective: 800px;
//           }

//           .loader-svg {
//             animation: spin3D 10s linear infinite;
//             transform-style: preserve-3d;
//           }

//           .ring {
//             transform-origin: 50% 50%;
//             animation: strokeDash 4s ease-in-out infinite;
//           }

//           .rotate-group {
//             animation: rotateGroup 6s linear infinite;
//             transform-origin: center;
//           }

//           .diamond {
//             transform-origin: center;
//             animation: scalePulse 3s ease-in-out infinite;
//             filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.2));
//           }

//           .red {
//             fill: var(--red);
//           }
//           .orange {
//             fill: var(--orange);
//           }
//           .blue {
//             fill: var(--blue);
//           }
//           .green {
//             fill: var(--green);
//           }

//           @keyframes spin3D {
//             100% { transform: rotateX(360deg) rotateY(360deg); }
//           }

//           @keyframes rotateGroup {
//             100% { transform: rotate(360deg); }
//           }

//           @keyframes strokeDash {
//             0% { stroke-dashoffset: 263.89; }
//             50% { stroke-dashoffset: 131.95; transform: rotate(45deg); }
//             100% { stroke-dashoffset: 263.89; transform: rotate(360deg); }
//           }

//           @keyframes scalePulse {
//             0%, 100% { transform: scale(1); opacity: 1; }
//             50% { transform: scale(1.2); opacity: 0.75; }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       {children}
//       <Footer />
//     </>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import Header from "./Component/Header";
import Footer from "./Component/Footer";

export default function LogoLoader({ children, size = 120 }: { children: React.ReactNode; size?: number }) {
  const [phase, setPhase] = useState("start");
  const [loading, setLoading] = useState(true); // Show loader first

  useEffect(() => {
    // Set loading false after 3.5s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Handle animation sequence
    const sequence = () => {
      setPhase("flying");
      setTimeout(() => {
        setPhase("rotating");
      }, 2500); // transition to rotating
    };

    sequence(); // start once
    const interval = setInterval(sequence, 6500);
    return () => clearInterval(interval);
  }, []);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "30px",
      fontFamily: "Arial, sans-serif",
      perspective: "1000px",
      height: "100vh",
      justifyContent: "center",
    },
    stage: {
      position: "relative",
      width: `${size * 3}px`,
      height: `${size * 3}px`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    logoContainer: {
      position: "relative",
      width: `${size}px`,
      height: `${size}px`,
      animation: phase === "rotating" ? "finalSpin 2s linear infinite" : "none",
    },
    rectangle: {
      position: "absolute",
      borderRadius: `${size * 0.08}px`,
      opacity: phase === "start" ? 0 : 1,
    },
    green: {
      width: `${size * 0.75}px`,
      height: `${size * 0.4}px`,
      background: "linear-gradient(135deg, #6BCF7F, #4CAF50)",
      boxShadow: "0 4px 20px rgba(76, 175, 80, 0.3)",
      ...(phase === "start"
        ? { transform: "translate(-400px, -400px) rotate(-180deg) scale(0.3)", opacity: 0 }
        : phase === "flying"
        ? { animation: "flyInGreen 3s ease forwards" }
        : { top: "0px", left: `${size * 0.125}px`, transform: "rotate(0deg) scale(1)" }),
      zIndex: 3,
    },
    orange: {
      width: `${size * 0.4}px`,
      height: `${size * 0.75}px`,
      background: "linear-gradient(135deg, #FF9500, #FF6F00)",
      boxShadow: "0 4px 20px rgba(255, 149, 0, 0.3)",
      ...(phase === "start"
        ? { transform: "translate(-500px, 0px) rotate(270deg) scale(0.2)", opacity: 0 }
        : phase === "flying"
        ? { animation: "flyInOrange 3s ease 0.5s forwards" }
        : { top: `${size * 0.125}px`, left: "0px", transform: "rotate(0deg) scale(1)" }),
      zIndex: 2,
    },
    blue: {
      width: `${size * 0.4}px`,
      height: `${size * 0.75}px`,
      background: "linear-gradient(135deg, #4A90E2, #1976D2)",
      boxShadow: "0 4px 20px rgba(74, 144, 226, 0.3)",
      ...(phase === "start"
        ? { transform: "translate(400px, -400px) rotate(90deg) scale(0.3)", opacity: 0 }
        : phase === "flying"
        ? { animation: "flyInBlue 3s ease 1s forwards" }
        : { top: `${size * 0.125}px`, right: "0px", transform: "rotate(0deg) scale(1)" }),
      zIndex: 2,
    },
    red: {
      width: `${size * 0.75}px`,
      height: `${size * 0.4}px`,
      background: "linear-gradient(135deg, #FF5252, #D32F2F)",
      boxShadow: "0 4px 20px rgba(255, 82, 82, 0.3)",
      ...(phase === "start"
        ? { transform: "translate(500px, 500px) rotate(180deg) scale(0.2)", opacity: 0 }
        : phase === "flying"
        ? { animation: "flyInRed 3s ease 1.5s forwards" }
        : { bottom: "0px", left: `${size * 0.125}px`, transform: "rotate(0deg) scale(1)" }),
      zIndex: 3,
    },
    loadingText: {
      color: "#333",
      fontSize: "18px",
      fontWeight: 600,
      textAlign: "center",
      animation: "textPulse 2s ease-in-out infinite",
    },
  };

  const getPhaseText = () => {
    switch (phase) {
      case "start":
        return "Initializing...";
      case "flying":
        return "Assembling Components...";
      case "rotating":
        return "Ready! Loading...";
      default:
        return "Loading...";
    }
  };

  // Animation styles
  const animationStyles = `
    @keyframes flyInGreen {
      0% { transform: translate(-400px, -400px) rotate(-180deg) scale(0.3); opacity: 0; }
      100% { transform: translate(${size * 0.125}px, 0px) rotate(0deg) scale(1); opacity: 1; }
    }
    @keyframes flyInOrange {
      0% { transform: translate(-500px, ${size * 0.125}px) rotate(270deg) scale(0.2); opacity: 0; }
      100% { transform: translate(0px, ${size * 0.125}px) rotate(0deg) scale(1); opacity: 1; }
    }
    @keyframes flyInBlue {
      0% { transform: translate(400px, -400px) rotate(90deg) scale(0.3); opacity: 0; }
      100% { transform: translate(${size * 0.6}px, ${size * 0.125}px) rotate(0deg) scale(1); opacity: 1; }
    }
    @keyframes flyInRed {
      0% { transform: translate(500px, 500px) rotate(180deg) scale(0.2); opacity: 0; }
      100% { transform: translate(${size * 0.125}px, ${size * 0.6}px) rotate(0deg) scale(1); opacity: 1; }
    }
    @keyframes finalSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes textPulse {
      0%, 100% { opacity: 0.7; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.05); }
    }
  `;

  // 🔁 Render Loader first, then main content after loading is false
  return (
    <>
      <style jsx>{animationStyles}</style>
      {loading ? (
        <div style={styles.container}>
          <div style={styles.stage}>
            <div style={styles.logoContainer}>
              <div style={{ ...styles.rectangle, ...styles.green }}></div>
              <div style={{ ...styles.rectangle, ...styles.orange }}></div>
              <div style={{ ...styles.rectangle, ...styles.blue }}></div>
              <div style={{ ...styles.rectangle, ...styles.red }}></div>
            </div>
          </div>
          <div style={styles.loadingText}>{getPhaseText()}</div>
        </div>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}
