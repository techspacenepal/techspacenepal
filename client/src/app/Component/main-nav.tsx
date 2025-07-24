'use client';

import { Bell, ClipboardList, ListCheck } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { House, Book, People, ClipboardCheck, Cpu } from 'react-bootstrap-icons';

interface NavItem {
  href: string;
  title: string;
  // icon: JSX.Element;
   icon: React.ReactNode; 
}

interface MainNavProps {
  collapsed: boolean;
}

export function MainNav({ collapsed }: MainNavProps) {
  const pathname = usePathname();
  const params = useParams();
const videoId = params?.videoId;

  const navItems: NavItem[] = [
    { href: '/auth/Dashboard/teacherDashboard', title: 'Dashboard', icon: <House /> },    
    { href: '/auth/Dashboard/teacherDashboard/courses', title: 'Courses', icon: <Book /> },
    { href: '/auth/Dashboard/teacherDashboard/students', title: 'Students', icon: <People /> },
    { href: '/auth/Dashboard/teacherDashboard/grades', title: 'Grades', icon: <ClipboardCheck /> },

    
    { href: '/auth/Dashboard/teacherDashboard/teacherNotification', title: 'send Notification', icon: <Bell /> },
    { href: '/auth/Dashboard/teacherDashboard/todolist', title: 'Todo List', icon: <ListCheck />},
  ];

  return (
    <nav className="d-flex flex-column gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none transition ${
              isActive ? 'bg-primary text-white' : 'text-secondary'
            } ${collapsed ? 'justify-content-center' : ''}`}
          >
            <span className="fs-5">{item.icon}</span>
            {!collapsed && <span className="fw-medium">{item.title}</span>}
          </Link>

          
        );
      })}
    </nav>
  );
}
