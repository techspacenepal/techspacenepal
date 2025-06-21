// app/announcement/page.tsx (for Next.js)
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Announcement {
  _id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const res = await axios.get("http://localhost:5000/api/announcements");
      setAnnouncements(res.data);
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      <h1 className="text-2xl font-bold mb-4">Announcements</h1>
      {announcements.map((ann) => (
        <div key={ann._id} className="border p-4 mb-4 rounded shadow">
          <h2 className="text-lg font-semibold">{ann.title}</h2>
          <p className="text-sm text-gray-600">
            {new Date(ann.date).toLocaleDateString()} by {ann.author}
          </p>
          <p className="mt-2">{ann.content}</p>
        </div>
      ))}
    </div>
  );
}
