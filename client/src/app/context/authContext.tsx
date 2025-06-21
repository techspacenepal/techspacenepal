// 'use client';

// import type { ReactNode } from 'react';
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';

// interface User {
//   username: string;
//   role: 'admin' | 'user' | string; // Allow string for flexibility if roles expand
// }

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: User | null;
//   token: string | null;
//   login: (token: string, userDetails: User) => void;
//   logout: () => void;
//   isLoading: boolean;
// }





// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

// ////---------------------------------------------login and display header part in Dashboard
//    const [role, setRole] = useState("");


//     useEffect(() => {
//     // LocalStorage मा token भएमा login भएको मान्ने
//     const token = localStorage.getItem("adminToken");
//     if (token) {
//       setIsAuthenticated(true);
//       const user = JSON.parse(localStorage.getItem("user") || "{}");
//       setRole(user?.role || "");
//     }
//   }, []);



//    // Login function: login पछि token र role सेट गर्ने
//   const Login = (token: string, userRole: string) => {
//     setIsAuthenticated(true);
//     setRole(userRole);
//   };

//   //-----------------------------------


//   useEffect(() => {
//     const storedToken = Cookies.get('adminToken') || localStorage.getItem('adminToken');
//     const storedUser = localStorage.getItem('user');

//     if (storedToken && storedUser) {
//       try {
//         const parsedUser: User = JSON.parse(storedUser);
//         setToken(storedToken);
//         setUser(parsedUser);
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.error("Failed to parse user from localStorage", error);
//         // Clear invalid stored data
//         Cookies.remove('adminToken');
//         localStorage.removeItem('adminToken');
//         localStorage.removeItem('user');
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   const login = (newToken: string, userDetails: User) => {
//     setToken(newToken);
//     setUser(userDetails);
//     setIsAuthenticated(true);
//     Cookies.set('adminToken', newToken, { expires: 7 }); // Expires in 7 days
//     localStorage.setItem('adminToken', newToken);
//     localStorage.setItem('user', JSON.stringify(userDetails));
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     setIsAuthenticated(false);
//     Cookies.remove('adminToken');
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('user');
//     router.push('/auth/adminLogin');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };



"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// User type definition
interface User {
  username: string;
  role: "admin" | "user" | string;
}

// Auth context shape
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string, userDetails: User) => void;
  logout: () => void;
  isLoading: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Restore auth from storage on mount
  useEffect(() => {
    const storedToken = Cookies.get("adminToken") || localStorage.getItem("adminToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        Cookies.remove("adminToken");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("user");
      }
    }

    setIsLoading(false);
  }, []);

  // Login function
  const login = (newToken: string, userDetails: User) => {
    setToken(newToken);
    setUser(userDetails);
    setIsAuthenticated(true);

    Cookies.set("adminToken", newToken, { expires: 7 });
    localStorage.setItem("adminToken", newToken);
    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    Cookies.remove("adminToken");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");

    router.push("/auth/adminLogin");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
