
// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   type ReactNode,
// } from "react";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";

// // User type definition
// interface User {
//   username: string;
//   role: "admin" | "user" | string;
// }

// // Auth context shape
// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: User | null;
//   token: string | null;
//   login: (token: string, userDetails: User) => void;
//   logout: () => void;
//   isLoading: boolean;
// }

// // Create context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Provider component
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   // Restore auth from storage on mount
//   useEffect(() => {
//     const storedToken = Cookies.get("adminToken") || localStorage.getItem("adminToken");
//     const storedUser = localStorage.getItem("user");

//     if (storedToken && storedUser) {
//       try {
//         const parsedUser: User = JSON.parse(storedUser);
//         setToken(storedToken);
//         setUser(parsedUser);
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.error("Failed to parse stored user:", error);
//         Cookies.remove("adminToken");
//         localStorage.removeItem("adminToken");
//         localStorage.removeItem("user");
//       }
//     }

//     setIsLoading(false);
//   }, []);

//   // Login function
//   const login = (newToken: string, userDetails: User) => {
//     setToken(newToken);
//     setUser(userDetails);
//     setIsAuthenticated(true);

//     Cookies.set("adminToken", newToken, { expires: 7 });
//     localStorage.setItem("adminToken", newToken);
//     localStorage.setItem("user", JSON.stringify(userDetails));
//   };

//   // Logout function
//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     setIsAuthenticated(false);

//     Cookies.remove("adminToken");
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("user");

//     router.push("/auth/adminLogin");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, user, token, login, logout, isLoading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // useAuth hook
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
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
  role: "admin" | "student" | "teacher" | "user";
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

// Helper to map role to token key
const getTokenKeyByRole = (role: string) => {
  switch (role) {
    case "admin":
      return "adminToken";
    case "student":
      return "studentToken";
    case "teacher":
      return "adminToken";
    default:
      return "adminToken";
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        const tokenKey = getTokenKeyByRole(parsedUser.role);
        const storedToken = Cookies.get(tokenKey) || localStorage.getItem(tokenKey);

        if (storedToken) {
          setToken(storedToken);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } else {
          console.warn("Token not found for role:", parsedUser.role);
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
        // ["adminToken", "studentToken", "userToken"].forEach(Cookies.remove);
        ["adminToken", "studentToken", "userToken"].forEach((tokenKey) => Cookies.remove(tokenKey));

      }
    }

    setIsLoading(false);
  }, []);

  const login = (newToken: string, userDetails: User) => {
    const tokenKey = getTokenKeyByRole(userDetails.role);

    setToken(newToken);
    setUser(userDetails);
    setIsAuthenticated(true);

    Cookies.set(tokenKey, newToken, { expires: 7 });
    localStorage.setItem(tokenKey, newToken);
    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  const logout = () => {
    const role = user?.role || "user";
    const tokenKey = getTokenKeyByRole(role);

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    Cookies.remove(tokenKey);
    localStorage.removeItem(tokenKey);
    localStorage.removeItem("user");

    if (role === "admin") {
      router.push("/auth/adminLogin");
    } else if (role === "student") {
      router.push("/auth/studentLogin");
    } else if (role === "teacher") {
      router.push("/auth/teacherLogin");
    } else {
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
