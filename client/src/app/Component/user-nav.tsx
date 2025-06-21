"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { User as UserIcon, LogOut } from "lucide-react";
import SettingsModal from "../Component/settingModel";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}

export function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const logout = () => {
    Cookies.remove("adminToken");
    router.push("/auth/studentLogin");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("adminToken");
        if (!token) return;

        const { data } = await axios.get("http://localhost:5000/api/students/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-light dropdown-toggle d-flex align-items-center rounded-circle p-0 border-0"
          type="button"
          id="userMenu"
          data-bs-toggle="dropdown"
          aria-expanded={showDropdown}
          onClick={toggleDropdown}
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name || "User"}
              className="rounded-circle"
              width={40}
              height={40}
            />
          ) : user.name ? (
            <div
              className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40, fontWeight: "bold" }}
            >
              {user.name.substring(0, 2).toUpperCase()}
            </div>
          ) : (
            <div
              className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40 }}
            >
              <UserIcon size={24} />
            </div>
          )}
        </button>

        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
          <li className="dropdown-header">
            <strong>{user.name}</strong>
            <div className="small text-muted">{user.email}</div>
          </li>
          <li><hr className="dropdown-divider" /></li>

          <li>
            <Link href="/studentdashboard/profile" className="dropdown-item">
              <i className="bi bi-person-circle me-2"></i> Profile
            </Link>
          </li>

          <li>
            <button className="dropdown-item" onClick={() => setShowSettingsModal(true)}>
              <i className="bi bi-gear me-2"></i> Settings
            </button>
          </li>

          <li><hr className="dropdown-divider" /></li>

          <li>
            <button
              onClick={logout}
              className="dropdown-item text-danger d-flex align-items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </li>
        </ul>
      </div>

      {showSettingsModal && (
        <SettingsModal user={user} onClose={() => setShowSettingsModal(false)} />
      )}
    </>
  );
}
 