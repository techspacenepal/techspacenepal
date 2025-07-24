// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import toast, { Toaster } from "react-hot-toast";

// interface Video {
//   _id: string;
//   videoUrl: string;
//   uploadedAt: string;
//   title: string;
//   assignmentUrl?: string;
// }

// export default function TeachersVideoUploadForm({
//   teacherId,
//   courseId,
// }: {
//   teacherId: string;
//   courseId: string;
// }) {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [selectedAssignment, setSelectedAssignment] = useState<File | null>(null);
//   const [videoUrl, setVideoUrl] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [title, setTitle] = useState("");
//   const [studentCount, setStudentCount] = useState(0);

//   useEffect(() => {
//     if (!courseId) return;
//     fetchVideos();
//     fetchStudentCount();
//   }, [courseId]);

//   const fetchVideos = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/teacherCourses/videos/${courseId}?teacherId=${teacherId}`
//       );
//       setVideos(res.data);
//     } catch (error) {
//       toast.error("Failed to load videos");
//     }
//   };

//   const fetchStudentCount = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/enrolledCourses/count/${courseId}`
//       );
//       setStudentCount(res.data.count);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedFile && !videoUrl) {
//       toast.error("Please select either a file or enter a video URL");
//       return;
//     }

//     const token = Cookies.get("teacherToken");
//     const formData = new FormData();

//     if (selectedFile) formData.append("video", selectedFile);
//     if (selectedAssignment) formData.append("assignment", selectedAssignment);
//     if (videoUrl) formData.append("videoUrl", videoUrl);
//     formData.append("title", title);

//     setUploading(true);
//     try {
//       await axios.post(
//         `http://localhost:5000/api/teacherCourses/upload/${teacherId}/${courseId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success("Video and assignment uploaded successfully");
//       setVideoUrl("");
//       setSelectedFile(null);
//       setSelectedAssignment(null);
//       setTitle("");
//       await fetchVideos();
//     } catch (err) {
//       toast.error("Upload failed");
//       console.error(err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDelete = async (videoId: string) => {
//     const token = Cookies.get("teacherToken");
//     const confirmed = confirm("Are you sure you want to delete this video?");
//     if (!confirmed) return;

//     try {
//       await axios.delete(
//         `http://localhost:5000/api/teacherCourses/videos/${videoId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("Video deleted");
//       fetchVideos();
//     } catch (error) {
//       toast.error("Failed to delete video");
//     }
//   };

//   return (
//     <>
//       <Toaster position="top-right" />
//       <form onSubmit={handleUpload} className="mt-4 border p-4 rounded shadow">
//         <h5 className="mb-3">🎥 Upload or Link a Course Video with Assignment</h5>

//         <div className="mb-3">
//           <label className="form-label">📝 Video Title:</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter video title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">📁 Upload Video File:</label>
//           <input
//             type="file"
//             accept="video/*"
//             className="form-control"
//             onChange={(e) => {
//               setSelectedFile(e.target.files?.[0] || null);
//               setVideoUrl("");
//             }}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">🔗 Or Paste Video URL:</label>
//           <input
//             type="url"
//             className="form-control"
//             placeholder="https://youtube.com/watch?v=..."
//             value={videoUrl}
//             onChange={(e) => {
//               setVideoUrl(e.target.value);
//               setSelectedFile(null);
//             }}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">📎 Upload Assignment (PDF, Image, Doc, or Video):</label>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx,image/*,video/*"
//             className="form-control"
//             onChange={(e) => setSelectedAssignment(e.target.files?.[0] || null)}
//           />
//         </div>

//         <button className="btn btn-primary" disabled={studentCount === 0 || uploading}>
//           {uploading ? "Uploading..." : "Upload Video & Assignment"}
//         </button>
//         {studentCount === 0 && (
//           <p className="text-danger mt-2">⚠️ No student enrolled yet. Upload not allowed.</p>
//         )}
//       </form>

//       {/* Video Table */}
//       <div className="mt-5">
//         <h5 className="mb-3">Uploaded Videos</h5>
//         <div className="table-responsive">
//           <table className="table table-striped table-bordered">
//             <thead className="table-dark">
//               <tr>
//                 <th>S.N</th>
//                 <th>Title</th>
//                 <th>Uploaded</th>
//                 <th>Courses Video</th>
//                 <th>Assignments</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {videos.map((video, index) => {
//                 const isExternal = video.videoUrl.startsWith("http");
//                 const formattedDate = new Date(video.uploadedAt).toLocaleDateString();

//                 const isVideo = video.assignmentUrl?.match(/\.(mp4|webm|ogg|mov)$/i);
//                 const isImage = video.assignmentUrl?.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i);
//                 const isPDF = video.assignmentUrl?.match(/\.pdf$/i);

//                 return (
//                   <tr key={video._id}>
//                     <td>{index + 1}</td>
//                     <td>{video.title}</td>
//                     <td>{formattedDate}</td>
//                     <td>
//                       {isExternal ? (
//                         <img
//                           src="/default-thumbnail.png"
//                           alt="Video"
//                           style={{ width: "100px", height: "60px", objectFit: "cover" }}
//                         />
//                       ) : (
//                         <video
//                           muted
//                           width="100"
//                           height="60"
//                           style={{ objectFit: "cover" }}
//                         >
//                           <source src={`http://localhost:5000${video.videoUrl}`} />
//                         </video>
//                       )}
//                     </td>
//                     <td>
//                       {video.assignmentUrl ? (
//                         isVideo ? (
//                           <video
//                             muted
//                             width="100"
//                             height="60"
//                             style={{ objectFit: "cover" }}
//                           >
//                             <source src={`http://localhost:5000${video.assignmentUrl}`} />
//                           </video>
//                         ) : isImage ? (
//                           <img
//                             src={`http://localhost:5000${video.assignmentUrl}`}
//                             alt="assignment"
//                             style={{ width: "100px", height: "60px", objectFit: "cover" }}
//                           />
//                         ) : isPDF ? (
//                           <iframe
//                             src={`http://localhost:5000${video.assignmentUrl}`}
//                             width="100"
//                             height="60"
//                             title="PDF Preview"
//                           />
//                         ) : (
//                           <a
//                             href={`http://localhost:5000${video.assignmentUrl}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="btn btn-sm btn-outline-secondary"
//                           >
//                             📎 Download
//                           </a>
//                         )
//                       ) : (
//                         <span className="text-muted">N/A</span>
//                       )}
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => handleDelete(video._id)}
//                         className="btn btn-sm btn-danger"
//                       >
//                         🗑 Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }





"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

interface Video {
  _id: string;
  videoUrl: string;
  uploadedAt: string;
  title: string;
  assignmentUrl?: string;
}

export default function TeachersVideoUploadForm({
  teacherId,
  courseId,
}: {
  teacherId: string;
  courseId: string;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<File | null>(
    null
  );
  const [assignmentUrl, setAssignmentUrl] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
    fetchVideos();
    fetchStudentCount();
  }, [courseId]);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/teacherCourses/videos/${courseId}?teacherId=${teacherId}`
      );
      setVideos(res.data);
    } catch (error) {
      toast.error("Failed to load videos");
    }
  };

  const fetchStudentCount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/enrolledCourses/count/${courseId}`
      );
      setStudentCount(res.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setIsEditMode(false);
    setEditingVideoId(null);
    setSelectedFile(null);
    setSelectedAssignment(null);
    setAssignmentUrl("");
    setVideoUrl("");
    setTitle("");
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("teacherToken");
    setUploading(true);

  
    if (isEditMode && editingVideoId) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        if (selectedFile) formData.append("video", selectedFile);
        else formData.append("videoUrl", videoUrl);

        if (selectedAssignment)
          formData.append("assignment", selectedAssignment);
        else formData.append("assignmentUrl", assignmentUrl); 

        await axios.put(
          `http://localhost:5000/api/videos/update/${editingVideoId}`,
           formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Video updated successfully");
        resetForm();
        await fetchVideos();
        return;
      } catch (err) {
        toast.error("Update failed");
        console.error(err);
        return;
      } finally {
        setUploading(false);
      }
    }

//     if (isEditMode && editingVideoId) {
//   try {
//     const formData = new FormData();
//     formData.append("title", title);

//     if (selectedFile) formData.append("video", selectedFile);
//     else formData.append("videoUrl", videoUrl);

//     if (selectedAssignment) formData.append("assignment", selectedAssignment);
//     else formData.append("assignmentUrl", assignmentUrl);

//     const token = Cookies.get("teacherToken");

//     await axios.put(
//       `http://localhost:5000/api/videos/update/${editingVideoId}`,
//       formData, // ✅ send FormData here!
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data", // ✅ important for FormData
//         },
//       }
//     );

//     toast.success("Video updated successfully");
//     resetForm();
//     await fetchVideos();
//     return;
//   } catch (err) {
//     toast.error("Update failed");
//     console.error(err);
//     return;
//   } finally {
//     setUploading(false);
//   }
// }


    if (!selectedFile && !videoUrl) {
      toast.error("Please select either a file or enter a video URL");
      setUploading(false);
      return;
    }

    const formData = new FormData();
    if (selectedFile) formData.append("video", selectedFile);
    if (selectedAssignment) formData.append("assignment", selectedAssignment);
    if (assignmentUrl) formData.append("assignmentUrl", assignmentUrl);
    if (videoUrl) formData.append("videoUrl", videoUrl);
    formData.append("title", title || "");

    try {
      const token = Cookies.get("teacherToken");
      console.log("Token being sent:", token);

      await axios.post(
        `http://localhost:5000/api/teacherCourses/upload/${teacherId}/${courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Video and assignment uploaded successfully");
      resetForm();
      await fetchVideos();
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (videoId: string) => {
    const token = Cookies.get("teacherToken");
    const confirmed = confirm("Are you sure you want to delete this video?");
    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/teacherCourses/videos/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Video deleted");
      fetchVideos();
    } catch (error) {
      toast.error("Failed to delete video");
    }
  };

  const handleEditFromTable = (video: Video) => {
    setIsEditMode(true);
    setEditingVideoId(video._id);
    setTitle(video.title);
    setVideoUrl(video.videoUrl || "");
    setAssignmentUrl(video.assignmentUrl || "");
    setSelectedFile(null);
    setSelectedAssignment(null);
    window.scrollTo({ top: 50, behavior: "smooth" });
  };

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleUpload} className="mt-4 border p-4 rounded shadow">
        <h5 className="mb-3">
          {isEditMode
            ? "✏️ Edit Video"
            : "🎥 Upload or Link a Course Video with Assignment"}
        </h5>

        <div className="mb-3">
          <label className="form-label fw-bold"> Video Title:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter video title"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold"> Upload Video File:</label>
          <input
            type="file"
            accept="video/*"
            className="form-control"
            onChange={(e) => {
              setSelectedFile(e.target.files?.[0] || null);
              setVideoUrl("");
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">🔗 Or Paste Video URL:</label>
          <input
            type="url"
            className="form-control"
            placeholder="https://youtube.com/watch?v=..."
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              setSelectedFile(null);
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
             Upload Assignment (PDF, Image, Doc, or Video):
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,image/*,video/*"
            className="form-control"
            onChange={(e) => {
              setSelectedAssignment(e.target.files?.[0] || null);
              setAssignmentUrl("");
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">🔗 Or Paste Assignment URL:</label>
          <input
            type="url"
            className="form-control"
            placeholder="https://drive.google.com/..."
            value={assignmentUrl}
            onChange={(e) => {
              setAssignmentUrl(e.target.value);
              setSelectedAssignment(null);
            }}
          />
        </div>

        <button
          className="btn btn-primary"
          disabled={studentCount === 0 || uploading}
        >
          {uploading
            ? isEditMode
              ? "Updating..."
              : "Uploading..."
            : isEditMode
            ? "Update Video"
            : "Upload Video & Assignment"}
        </button>
        {studentCount === 0 && (
          <p className="text-danger mt-2">
            ⚠️ No student enrolled yet. Upload not allowed.
          </p>
        )}
      </form>

      {/* Video Table */}
      <div className="mt-5">
        <h5 className="mb-3">Uploaded Videos</h5>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>S.N</th>
                <th>Title</th>
                <th>Uploaded</th>
                <th>Course Video</th>
                <th>Assignment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video, index) => {
                const isExternalVideo = video.videoUrl?.startsWith("http");
                const isExternalAssignment =
                  video.assignmentUrl?.startsWith("http");
                const formattedDate = new Date(
                  video.uploadedAt
                ).toLocaleDateString();
                const isVideo = video.assignmentUrl?.match(
                  /\.(mp4|webm|ogg|mov)$/i
                );
                const isImage = video.assignmentUrl?.match(
                  /\.(jpg|jpeg|png|gif|bmp|webp)$/i
                );
                const isPDF = video.assignmentUrl?.match(/\.pdf$/i);

                return (
                  <tr key={video._id}>
                    <td>{index + 1}</td>
                    <td>{video.title}</td>
                    <td>{formattedDate}</td>
                    <td>
                      {isExternalVideo ? (
                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🔗 External Link
                        </a>
                      ) : (
                        <video
                          muted
                          width="100"
                          height="60"
                          style={{ objectFit: "cover" }}
                        >
                          <source
                            src={`http://localhost:5000${video.videoUrl}`}
                          />
                        </video>
                      )}
                    </td>
                    <td>
                      {isExternalAssignment ? (
                        <a
                          href={video.assignmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          🔗 Open Assignment
                        </a>
                      ) : video.assignmentUrl ? (
                        isVideo ? (
                          <video
                            muted
                            width="100"
                            height="60"
                            style={{ objectFit: "cover" }}
                          >
                            <source
                              src={`http://localhost:5000${video.assignmentUrl}`}
                            />
                          </video>
                        ) : isImage ? (
                          <img
                            src={`http://localhost:5000${video.assignmentUrl}`}
                            alt="assignment"
                            style={{
                              width: "100px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                        ) : isPDF ? (
                          <iframe
                            src={`http://localhost:5000${video.assignmentUrl}`}
                            width="100"
                            height="60"
                            title="PDF Preview"
                          />
                        ) : (
                          <a
                            href={`http://localhost:5000${video.assignmentUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-secondary"
                          >
                            📎 Download
                          </a>
                        )
                      ) : (
                        <span className="text-muted">N/A</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleEditFromTable(video)}
                        className="btn btn-sm btn-warning me-2 text-white "
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="btn btn-sm btn-danger"
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
