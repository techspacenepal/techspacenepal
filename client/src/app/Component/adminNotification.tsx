'use client';

import React from 'react';
import Link from 'next/link';

interface NotificationItem {
  _id: string;
  name: string;
  course: string;
  type: 'inquiry' | 'contact';
  createdAt: string;
}

interface Props {
  items: NotificationItem[];
}

const NotificationDropdown: React.FC<Props> = ({ items }) => {
  return (
    <div className="dropdown-menu dropdown-menu-end show p-2 shadow" style={{ minWidth: '300px' }}>
      <h6 className="dropdown-header">Notifications</h6>
      {items.length === 0 ? (
        <span className="dropdown-item text-muted">No new notifications</span>
      ) : (
        items.map((item) => (
          <div key={item._id} className="dropdown-item small">
            <strong>{item.name}</strong> sent a new {item.type}
            <br />
            <small className="text-muted">
              {new Date(item.createdAt).toLocaleString('en-GB')}
            </small>
          </div>
        ))
      )}

      <div className="dropdown-divider" />
      <div className="text-center">
        <Link href="/auth/admin/allContact" className="dropdown-item small text-primary">
          View All Contacts
        </Link>
        <Link href="/auth/admin/allinquiry" className="dropdown-item small text-primary">
          View All Inquiries
        </Link>
      </div>
    </div>
  );
};

export default NotificationDropdown;
