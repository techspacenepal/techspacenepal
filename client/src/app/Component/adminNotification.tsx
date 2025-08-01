// 'use client';

// import React from 'react';
// import Link from 'next/link';

// interface NotificationItem {
//   _id: string;
//   name: string;
//   course: string;
//   type: 'inquiry' | 'contact';
//   createdAt: string;
// }

// interface Props {
//   items: NotificationItem[];
// }

// const NotificationDropdown: React.FC<Props> = ({ items }) => {
//   return (
//     <div className="dropdown-menu dropdown-menu-end show p-2 shadow" style={{ minWidth: '300px' }}>
//       <h6 className="dropdown-header">Notifications</h6>
//       {items.length === 0 ? (
//         <span className="dropdown-item text-muted">No new notifications</span>
//       ) : (
//         items.map((item) => (
//           <div key={item._id} className="dropdown-item small">
//             <strong>{item.name}</strong> sent a new {item.type}
//             <br />
//             <small className="text-muted">
//               {new Date(item.createdAt).toLocaleString('en-GB')}
//             </small>
//           </div>
//         ))
//       )}

//       <div className="dropdown-divider" />
//       <div className="text-center">
//         <Link href="/auth/admin/allContact" className="dropdown-item small text-primary">
//           View All Contacts
//         </Link>
//         <Link href="/auth/admin/allinquiry" className="dropdown-item small text-primary">
//           View All Inquiries
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default NotificationDropdown;

"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext"; // Ensure this path is correct

interface NotificationItem {
  _id: string;
  name: string;
  title?: string;
  message?: string;
  createdAt: string;
  seenBy?: string[]; 
  type: "student_notification" | string;
}

interface NotificationDropdownProps {
  notifications?: NotificationItem[];
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications = [],
}) => {
  const { user } = useAuth(); // ✅ Get user context
  const currentUserRole = user?.role || ""; // For seenBy matching

  const studentNotifications = notifications.filter(
    (n) => n.type === "student_notification"
  );

  const todayStr = new Date().toISOString().slice(0, 10);

  const todayNotifications = studentNotifications.filter((notif) => {
    const notifDateStr = new Date(notif.createdAt).toISOString().slice(0, 10);
    return notifDateStr === todayStr;
  });

  // Slice after filtering today
  const recentFive = todayNotifications.slice(0, 5);

  return (
    <div
      className="dropdown-menu dropdown-menu-end show p-2 shadow"
      style={{ minWidth: "300px", maxHeight: "400px", overflowY: "auto" }}
    >
      <h6 className="dropdown-header fw-bold">Today's Student Notifications</h6>

      {recentFive.length === 0 ? (
        <span className="dropdown-item text-muted">No new notifications for today</span>
      ) : (
        recentFive.map((item) => (
          <div
            key={item._id}
            className="dropdown-item small border-bottom pb-2 mb-2 d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{item.name}</strong> sent a notification
              <br />
              <span className="fw-semibold">{item.title}</span>
              <br />
              <small>{item.message ?? "No message provided"}</small>
              <br />
              <small className="text-muted">
                {new Date(item.createdAt).toLocaleString("en-GB")}
              </small>
            </div>

            {/* ✅ Show red dot if not seen by current user */}
            {!item.seenBy?.includes(currentUserRole) && (
              <span
                className="rounded-circle bg-danger"
                style={{ width: 10, height: 10, display: "inline-block" }}
                title="New notification"
              />
            )}
          </div>
        ))
      )}

      <div className="dropdown-divider" />
      <div className="text-center">
        <Link
          href="/auth/admin/allstudentnotifications"
          className="dropdown-item small text-primary"
        >
          View All Student Notifications
        </Link>
      </div>
    </div>
  );
};

export default NotificationDropdown;
