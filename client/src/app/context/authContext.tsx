
'use client'

import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  adminToken: string | null;
  setAdminToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  adminToken: null,
  setAdminToken: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminToken, setAdminToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) setAdminToken(token);
  }, []);

  return (
    <AuthContext.Provider value={{ adminToken, setAdminToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);