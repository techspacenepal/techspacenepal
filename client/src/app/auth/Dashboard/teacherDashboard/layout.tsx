'use client';

import { useState } from 'react';

import { MainNav } from '@/app/Component/main-nav';
import { UserNav } from '@/app/Component/teacher-nav';
import { instructor } from '@/lib/placeholder-data';
import { List } from 'react-bootstrap-icons'; // Sidebar toggle icon

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <aside
        className={`bg-light border-end d-flex flex-column justify-content-between p-3 ${
          collapsed ? 'collapsed-sidebar' : ''
        }`}
        style={{ width: collapsed ? '70px' : '250px', transition: 'width 0.3s' }}
      >
        {/* Sidebar Header */}
        <div>
          <div className="d-flex align-items-center mb-4 text-decoration-none">
            <List size={28} className="me-2 text-primary" />
            {!collapsed && <span className="fs-5 fw-semibold">Skill Navigator</span>}
          </div>

          {/* Main Navigation */}
          {/* <MainNav /> */}
           <MainNav collapsed={collapsed} />
        </div>

        {/* Sidebar Footer */}
        {!collapsed && (
          <div className="mt-4 border-top pt-3">
            <div className="bg-body-secondary p-3 text-center rounded">
              <h6 className="fw-bold">Upgrade to Pro</h6>
              <p className="text-muted small">
                Unlock all features and get unlimited access to our support team.
              </p>
              <button className="btn btn-primary btn-sm w-100 mt-2">Upgrade</button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <header className="d-flex align-items-center justify-content-between border-bottom bg-white px-4 py-2 sticky-top shadow-sm " 
        style={{ zIndex: 1 }} >
          <button
            className="btn btn-outline-secondary d-md-none"
            onClick={() => setCollapsed(!collapsed)}
          >
            <List />
          </button>
          <div className="ms-auto">
             <UserNav/>

          </div>
        </header>

        {/* Children/Page Content */}
        <main className="p-4 flex-grow-1 bg-light">{children}</main>
      </div>
    </div>
  );
}
