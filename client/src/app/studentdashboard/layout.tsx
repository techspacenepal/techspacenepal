
// import type { ReactNode } from 'react';
// import {
//   SidebarProvider,
//   Sidebar,
//   SidebarHeader,
//   SidebarContent,
//   SidebarFooter,
//   SidebarTrigger,
//   SidebarInset,
//   SidebarMenuButton
// } from '@/components/ui/sidebar';
// import { DashboardNav } from '@/app/Component/dashboard-nav';
// import { UserNav } from '@/app/Component/user-nav';
// import { GraduationCap } from 'lucide-react'; // Teachspace logo icon

// export default function DashboardLayout({ children }: { children: ReactNode }) {
//   return (
//     <SidebarProvider defaultOpen>
//       <div className="flex min-h-screen">
//         <Sidebar collapsible="icon" className="border-r">
//           <SidebarHeader className="p-4 border-b">
//             <div className="flex items-center gap-2">
//                <GraduationCap className="h-8 w-8 text-primary" />
//                <h2 className="text-xl font-headline font-semibold text-primary group-data-[collapsible=icon]:hidden">Teachspace</h2>
//             </div>
//           </SidebarHeader>
//           <SidebarContent className="p-2">
//             <DashboardNav />
//           </SidebarContent>
//           <SidebarFooter className="p-2 border-t">
//             {/* You can add footer items here if needed, like a settings button */}
//              <SidebarMenuButton tooltip="Settings" disabled>
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings h-5 w-5 mr-3"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
//                 <span className="truncate">Settings</span>
//             </SidebarMenuButton>
//           </SidebarFooter>
//         </Sidebar>
//         <SidebarInset className="flex-1 flex flex-col">
//           <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur px-6">
//             <SidebarTrigger className="md:hidden" /> {/* Only show on mobile */}
//             <div className="flex items-center gap-4 ml-auto">
//               <UserNav />
//             </div>
//           </header>
//           <main className="flex-1 p-6 overflow-auto page-transition">
//             {children}
//           </main>
//         </SidebarInset>
//       </div>
//     </SidebarProvider>
//   );
// }




"use client";

import type { ReactNode } from "react";
import { GraduationCap } from "lucide-react";
import { DashboardNav } from "@/app/Component/dashboard-nav";
import { UserNav } from "@/app/Component/user-nav";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <nav
        id="sidebarMenu"
        className="d-md-flex flex-column flex-shrink-0 p-3 bg-light border-end"
        style={{ width: "280px" }}
      >
        {/* Sidebar Header */}
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
          <GraduationCap className="text-primary" size={32} />
          <span className="fs-4 fw-semibold text-primary ms-2 d-none d-md-inline">Teachspace</span>
        </div>

        {/* Sidebar Content */}
        <DashboardNav />

        {/* Sidebar Footer */}
        <div className="mt-auto pt-3 border-top">
          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            disabled
            title="Settings (Coming soon)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-gear me-2"
              viewBox="0 0 16 16"
            >
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.54l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.54-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zM8 10.93a2.929 2.929 0 1 1 0-5.858 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
            Settings
          </button>
        </div>
      </nav>

      {/* Main content area */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <header className="sticky-top bg-white border-bottom d-flex align-items-center justify-content-between px-3" style={{ height: "64px" }}>
          {/* Sidebar toggle button for small screens */}
          <button
            className="btn btn-outline-primary d-md-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle sidebar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="ms-auto d-flex align-items-center gap-3">
            <UserNav />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
