

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Sparkles,
  UserCircle,
} from "lucide-react";

const navItems = [
  { href: "/studentdashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/studentdashboard/profile", label: "Profile", icon: UserCircle },
  { href: "/studentdashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/studentdashboard/gradebook", label: "Gradebook", icon: ClipboardList },
  { href: "/studentdashboard/announcements", label: "Announcements", icon: Megaphone },
  { href: "/studentdashboard/recommendations", label: "Recommendations", icon: Sparkles },
 

];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="nav flex-column nav-pills">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
              isActive ? "active bg-primary text-white" : "text-dark"
            }`}
          >
            <item.icon size={18} />
            <span className="d-none d-md-inline">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
