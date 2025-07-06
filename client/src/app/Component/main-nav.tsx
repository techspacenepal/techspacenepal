'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, Book, People, ClipboardCheck, Cpu } from 'react-bootstrap-icons';

interface NavItem {
  href: string;
  title: string;
  icon: JSX.Element;
}

interface MainNavProps {
  collapsed: boolean;
}

export function MainNav({ collapsed }: MainNavProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: '/teacherDashboard', title: 'Dashboard', icon: <House /> },
    
    { href: '/teacherDashboard/courses', title: 'Courses', icon: <Book /> },
    { href: '/teacherDashboard/students', title: 'Students', icon: <People /> },
    { href: '/teacherDashboard/grades', title: 'Grades', icon: <ClipboardCheck /> },
    { href: '/teacherDashboard/teacherNotification', title: 'send Notification', icon: <Bell /> },
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
