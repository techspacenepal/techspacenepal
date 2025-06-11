'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/app/context/authContext';

import Footer from '../Component/Footer';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
     
      {children}
      <Footer/>
    </AuthProvider>
  );
}
