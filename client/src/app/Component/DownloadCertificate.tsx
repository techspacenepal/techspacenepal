
// "use client";
// import axios from "axios";

// interface DownloadCertificateProps {
//   studentId: string;
//   courseId: string;
// }

// export default function DownloadCertificate({ studentId, courseId }: DownloadCertificateProps) {
//   const generateAndDownload = async () => {
//     try {
//       // First request: generate and get the PDF link
//       const { data } = await axios.get(`http://localhost:5000/api/certificates/${studentId}/${courseId}`);

//       if (!data.success) {
//         alert("Failed to generate certificate.");
//         return;
//       }

//       const pdfUrl = `http://localhost:5000${data.link}`;
//       const response = await axios.get(pdfUrl, {
//         responseType: "blob",
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `${studentId}_certificate.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       alert("Failed to download certificate. Please try again.");
//       console.error(error);
//     }
//   };

//   return (
//     <button className="btn btn-success btn-sm" onClick={generateAndDownload}>
//       🎓 Download Certificate
//     </button>
//   );
// }



'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface DownloadProps {
  studentId: string;
  courseId: string;
}

export default function DownloadCertificate({ studentId, courseId }: DownloadProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/certificates/${studentId}/${courseId}`,
        {
          responseType: 'blob', // Important for file download
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate_${studentId}_${courseId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download certificate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="btn btn-success btn-sm" onClick={handleDownload} disabled={loading}>
      {loading ? 'Downloading...' : '🎓 Download Certificate'}
    </button>
  );
}
