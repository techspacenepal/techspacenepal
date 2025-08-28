// "use client"; // Required for client-side interactivity

// import { 
//   LayoutDashboard,
//   Calendar,
//   User,
//   MessageSquare,
//   LogOut,
//   Home,
//   Info,
//   Settings,
//   BookOpen,
//   Image as ImageIcon,
//   ChevronLeft,
//   ChevronRight,
//   Menu
// } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// interface SidebarProps {
//   isAuthenticated: boolean;
//   logout: () => void;
// }

// const AdminSidebar = ({ isAuthenticated, logout }: SidebarProps) => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setShowMobileMenu(false);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     if (isMobile) {
//       setShowMobileMenu(!showMobileMenu);
//     } else {
//       setIsCollapsed(!isCollapsed);
//     }
//   };

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button 
//         onClick={toggleSidebar}
//         className="d-md-none btn btn-primary position-fixed"
//         style={{
//           zIndex: 1000,
//           top: '10px',
//           left: '10px',
//           padding: '5px 10px'
//         }}
//       >
//         <Menu size={24} />
//       </button>

//       {/* Sidebar */}
//       <aside 
//         className={`sidebar bg-primary text-white p-3 ${isMobile ? (showMobileMenu ? 'mobile-show' : 'mobile-hide') : ''} ${isCollapsed ? 'collapsed' : ''}`}
//         style={{ 
//           overflowY: 'auto', 
//           height: '100vh',
//           transition: 'all 0.3s ease',
//           position: isMobile ? 'fixed' : 'relative',
//           zIndex: 999,
//           width: isMobile ? '250px' : isCollapsed ? '80px' : '250px'
//         }}
//       >
//         {!isMobile && (
//           <button 
//             onClick={toggleSidebar}
//             className="btn btn-sm btn-secondary mb-3"
//             style={{ position: 'absolute', right: '-15px', top: '20px' }}
//           >
//             {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
//           </button>
//         )}

//         <h2 className="mb-4 sidebar-title" style={{ display: isCollapsed && !isMobile ? 'none' : 'block' }}>
//           {isCollapsed && !isMobile ? '' : 'Admin Panel'}
//         </h2>

//         <nav className="nav flex-column gap-2">
//           {[
//             { href: "/auth/Dashboard/adminDashboard", icon: <LayoutDashboard size={18} />, text: "Dashboard" },
//             { href: "/auth/admin/home", icon: <Home size={18} />, text: "Home" },
//             { href: "/auth/admin/about", icon: <Info size={18} />, text: "About" },
//             { href: "/auth/admin/allUser", icon: <User size={18} />, text: "Users" },
//             { href: "/auth/admin/allContact", icon: <MessageSquare size={18} />, text: "Contacts" },
//             { href: "/auth/admin/allinquiry", icon: <MessageSquare size={18} />, text: "Inquiries" },
//             { href: "/auth/admin/ManageServices", icon: <Settings size={18} />, text: "Services" },
//             { href: "/auth/admin/addblog", icon: <BookOpen size={18} />, text: "Blog" },
//             { href: "/auth/admin/Gallery", icon: <ImageIcon size={18} />, text: "Success Gallery" },
//             { href: "/auth/admin/testimonial", icon: <MessageSquare size={18} />, text: "Testimonial" },
//             { href: "/auth/admin/addTeacherCourses", icon: <BookOpen size={18} />, text: "Add Teacher Courses" },
//             { href: "/auth/admin/teams", icon: <User size={18} />, text: "Teams" },
//             { href: "/auth/admin/courses", icon: <BookOpen size={18} />, text: "Courses" },
//             { href: "/auth/admin/addAnnouncement", icon: <MessageSquare size={18} />, text: "Add Announcements" },
//             { href: "/auth/admin/enrolledCourses", icon: <BookOpen size={18} />, text: "Enrolled Courses" },
//             { href: "/auth/admin/allstudents", icon: <User size={18} />, text: "All Students" },
//             { href: "/auth/admin/UpcomingClasses", icon: <Calendar size={18} />, text: "Upcoming classes" },
//             { href: "/auth/admin/footer", icon: <LayoutDashboard size={18} />, text: "Footer" },
//             { href: "/auth/adminRegister/superAdmin", icon: <User size={18} />, text: "Register" }
//           ].map((item, index) => (
//             <Link
//               key={index}
//               href={item.href}
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//               style={{ justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start' }}
//             >
//               {item.icon}
//               <span className="sidebar-text" style={{ display: isCollapsed && !isMobile ? 'none' : 'inline' }}>
//                 {item.text}
//               </span>
//             </Link>
//           ))}

//           <div className="mt-3">
//             {isAuthenticated ? (
//               <button
//                 onClick={logout}
//                 className="btn btn-danger d-flex align-items-center gap-2 w-100"
//                 style={{ justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start' }}
//               >
//                 <LogOut size={18} />
//                 <span style={{ display: isCollapsed && !isMobile ? 'none' : 'inline' }}>Logout</span>
//               </button>
//             ) : (
//               <Link 
//                 href="/auth/adminLogin" 
//                 className="btn btn-success w-100 d-flex align-items-center gap-2"
//                 style={{ justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start' }}
//               >
//                 <span style={{ display: isCollapsed && !isMobile ? 'none' : 'inline' }}>Login</span>
//               </Link>
//             )}
//           </div>
//         </nav>
//       </aside>

//       {/* Overlay for mobile */}
//       {isMobile && showMobileMenu && (
//         <div 
//           className="mobile-menu-overlay"
//           onClick={() => setShowMobileMenu(false)}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             zIndex: 998
//           }}
//         />
//       )}

//       <style jsx>{`
//         @media (max-width: 767.98px) {
//           .mobile-hide {
//             transform: translateX(-100%);
//           }
//           .mobile-show {
//             transform: translateX(0);
//           }
//         }
//         .sidebar-link {
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
//         .collapsed .sidebar-title {
//           display: none;
//         }
//       `}</style>
//     </>
//   );
// };

// export default AdminSidebar;

 {/* Sidebar */}
        <aside className="sidebar bg-dark text-white pt-0" style={{
          overflowY: 'auto',
          height: '100vh',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Fixed Profile Section at Top */}
          <div className=""
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              backgroundColor: 'inherit',

            }}
          >

            <div className="d-flex align-items-center mb-3 gap-2 mt-3">
              <div className="d-flex align-items-center">
                {currentUser.image ? (
                  <img
                    src={currentUser.image}
                    alt="User Profile"
                    className="rounded-circle"
                    style={{
                      width: "clamp(30px, 3vw, 40px)",
                      height: "clamp(30px, 3vw, 40px)",
                      objectFit: "cover",
                      minWidth: "30px"
                    }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-white text-primary d-flex justify-content-center align-items-center fw-bold"
                    style={{
                      width: "clamp(30px, 3vw, 40px)",
                      height: "clamp(30px, 3vw, 40px)",
                      minWidth: "30px",
                      fontSize: "clamp(12px, 1.5vw, 14px)"
                    }}
                  >
                    {currentUser.name ? getInitials(currentUser.name) : "AD"}
                  </div>
                )}
              </div>
              <div>
                <h2 className="sidebar-title mb-0" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>
                  Admin Panel
                </h2>
                <small className="text-white-50" style={{ fontSize: "clamp(0.7rem, 1vw, 0.85rem)" }}>
                  {currentUser.name}
                </small>
              </div>
            </div>
          </div>

          {/* Navigation - completely unchanged */}
          <nav className="nav flex-column gap-2">
            <Link
              href="/auth/Dashboard/adminDashboard"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <LayoutDashboard size={18} />
              <span className="sidebar-text">Dashboard</span>
            </Link>
            <Link
              href="/auth/admin/home"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <Home size={18} />
              <span className="sidebar-text">Home</span>
            </Link>
            <Link
              href="/auth/admin/about"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <Info size={18} />
              <span className="sidebar-text">About</span>
            </Link>

            <Link
              href="/auth/admin/allUser"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <User size={18} />
              <span className="sidebar-text">Users</span>
            </Link>

            <Link
              href="/auth/admin/allContact"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <MessageSquare size={18} />
              <span className="sidebar-text">Contacts</span>
            </Link>

            <Link
              href="/auth/admin/allinquiry"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <MessageSquare size={18} />
              <span className="sidebar-text">Inquiries</span>
            </Link>

            <Link
              href="/auth/admin/ManageServices"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <Settings size={18} />
              <span className="sidebar-text">Services</span>
            </Link>

            <Link
              href="/auth/admin/addblog"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <BookOpen size={18} />
              <span className="sidebar-text">Blog</span>
            </Link>

            <Link
              href="/auth/admin/Gallery"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <ImageIcon size={18} />
              <span className="sidebar-text">Success Gallery</span>
            </Link>

            <Link
              href="/auth/admin/testimonial"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <MessageSquare size={18} />
              <span className="sidebar-text">Testimonial</span>
            </Link>



            <Link
              href="/auth/admin/addTeacherCourses"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <BookOpen size={18} />
              <span className="sidebar-text">Add Teacher Courses</span>
            </Link>

            <Link
              href="/auth/admin/teams"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <User size={18} />
              <span className="sidebar-text">Teams</span>
            </Link>

            <Link
              href="/auth/admin/courses"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <BookOpen size={18} />
              <span className="sidebar-text">Courses</span>
            </Link>

            <Link
              href="/auth/admin/addAnnouncement"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <MessageSquare size={18} />
              <span className="sidebar-text">Add Announcements</span>
            </Link>

            <Link
              href="/auth/admin/enrolledCourses"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <BookOpen size={18} />
              <span className="sidebar-text">Enrolled Courses</span>
            </Link>

            <Link
              href="/auth/admin/allstudents"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <User size={18} />
              <span className="sidebar-text">All Students</span>
            </Link>

            <Link
              href="/auth/admin/UpcomingClasses"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <Calendar size={18} />
              <span className="sidebar-text">Upcomming classes</span>
            </Link>

            <Link
              href="/auth/admin/footer"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <LayoutDashboard size={18} />
              <span className="sidebar-text">Footer</span>
            </Link>

            <Link
              href="/auth/adminRegister/superAdmin"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link" style={{ paddingLeft: 0 }}

            >
              <User size={18} />
              <span className="sidebar-text">Register</span>
            </Link>

            <div className="mt-3">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="btn btn-danger d-flex align-items-center justify-content-center gap-2 py-2"
                  style={{ borderRadius: '4px', fontWeight: '500' }}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <Link
                  href="/auth/adminLogin"
                  className="btn btn-success d-flex align-items-center justify-content-center py-2"
                  style={{ borderRadius: '4px', fontWeight: '500' }}
                >
                  Login
                </Link>
              )}
            </div>

          </nav>

        </aside>