// app/auth/adminLogin/layout.tsx
import React from 'react';

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Optional: Custom layout UI like sidebar, headers, etc */}
      {children}
    </div>
  );
}
