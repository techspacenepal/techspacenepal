'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/app/context/AuthContext';



export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
     
      {children}
      
    </AuthProvider>
  );
}


