'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

interface User {
  username: string;
  email: string;
}

export function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [circleColor, setCircleColor] = useState('bg-primary'); // default blue
  const router = useRouter();

  // 🎨 Available Bootstrap background classes
  const colors = ['bg-danger', 'bg-warning', 'bg-primary', 'bg-success']; // red, orange, blue, green

 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // 🎯 Set a random color once on component mount
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCircleColor(randomColor);
  }, []);

   const logout = () => {
    Cookies.remove('adminToken');
    router.push('/auth/studentLogin');
  };

  if (!user) return null;

  

  return (
    <div className="dropdown">
      <button
        className="btn btn-light p-0 border-0"
        type="button"
        id="userDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div
          className={`rounded-circle text-white d-flex align-items-center justify-content-center fw-bold ${circleColor}`}
          style={{ width: '40px', height: '40px' }}
        >
          {user.username?.charAt(0).toUpperCase()}
        </div>
      </button>

      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
        <li className="px-3 py-2">
          <div className="d-flex flex-column">
            <span className="fw-bold">{user.username}</span>
            <small className="text-muted">{user.email || 'Email not found'}</small>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link href={'/teacherDashboard/profile'} className='text-decoration-none'>
          <button className="dropdown-item ">Profile</button>
          </Link>
        </li>
        <li>
          <button className="dropdown-item">Settings</button>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button onClick={logout} className="dropdown-item text-danger d-flex align-items-center gap-2">
            <LogOut size={18} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
