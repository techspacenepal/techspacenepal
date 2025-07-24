// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useParams } from 'next/navigation';
// import toast, { Toaster } from 'react-hot-toast';

// interface Video {
//   _id: string;
//   title: string;
//   videoUrl: string;
//   uploadedAt: string;
// }

// export default function CourseVideosPage() {
//   const { courseId } = useParams() as { courseId: string };
//   const [studentId, setStudentId] = useState<string | null>(null);
//   const [teacherId, setTeacherId] = useState<string | null>(null);
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [videoCompleted, setVideoCompleted] = useState(false);
//   const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   // ✅ Get studentId from localStorage
// useEffect(() => {
//   const fetchId = async () => {
//     const id = localStorage.getItem("studentId");

//     if (id) {
//       setStudentId(id);
//     } else {
//       // fallback fetch
//       try {
//         const token = Cookies.get("studentToken");
//         const res = await axios.get("http://localhost:5000/api/students/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const profileId = res.data._id;
//         setStudentId(profileId);
//         localStorage.setItem("studentId", profileId);
//         console.log("🎓 studentId fallback from profile:", profileId);
//       } catch (error) {
//         console.error("❌ Could not fetch student profile as fallback", error);
//       }
//     }
//   };

//   fetchId();
// }, []);

//   // ✅ Fetch enrollment to get teacherId
//   useEffect(() => {
//     console.log("🧪 Current video object:", currentVideo);
// console.log("▶️ Final video src:", `http://localhost:5000${currentVideo?.videoUrl}`);

//     const fetchEnrollment = async () => {
//       if (!courseId || !studentId) {
//         console.log("⛔ courseId or studentId missing");
//         return;
//       }

//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/enrolledCourses/byCourseAndStudent/${courseId}/${studentId}`
//         );
//         console.log("✅ enrollment fetched:", res.data);
//         setTeacherId(res.data?.teacherId);
//       } catch (err) {
//         console.error("❌ Enrollment fetch error:", err);
//         toast.error("Enrollment not found");
//       }
//     };
//     fetchEnrollment();
//   }, [courseId, studentId]);

//   // ✅ Fetch videos
//   useEffect(() => {
//     const fetchVideos = async () => {
//       console.log("📹 Fetching videos with:", { teacherId, courseId });

//       if (!teacherId || !courseId) {
//         console.log("⚠️ Missing teacherId or courseId");
//         return;
//       }

//       try {
//         const token = Cookies.get("studentToken");
//         const res = await axios.get(
//           `http://localhost:5000/api/teacherCourses/videos/${courseId}?teacherId=${teacherId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         console.log("✅ Videos fetched:", res.data);

//         const sorted = res.data.sort(
//           (a: Video, b: Video) =>
//             new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
//         );

//         setVideos(sorted);
//       } catch (err) {
//         console.error("❌ Video fetch error:", err);
//         toast.error("Failed to fetch videos");
//       } finally {
//         setLoading(false); // ✅ Always stop loading
//       }
//     };

//     fetchVideos();
//   }, [teacherId, courseId]);

//   // ✅ Load watched videos from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem(`watched-${courseId}`);
//     if (stored) {
//       console.log("👁️ Watched videos loaded from localStorage:", stored);
//       setWatchedVideos(JSON.parse(stored));
//     }
//   }, [courseId]);

//   // ✅ Sync initial progress
//   useEffect(() => {
//     if (!studentId || !courseId || videos.length === 0) return;

//     const stored = localStorage.getItem(`watched-${courseId}`);
//     if (!stored) return;

//     const watched: string[] = JSON.parse(stored);
//     const validWatched = watched.filter((id) => videos.some((v) => v._id === id));
//     const totalVideos = videos.length || 1;
//     const progress = Math.floor((validWatched.length / totalVideos) * 100);

//     const updateProgress = async () => {
//       try {
//         const token = Cookies.get("studentToken");
//         await axios.put(
//           `http://localhost:5000/api/enrolledCourses/updateProgress/${studentId}/${courseId}`,
//           { progress },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log("📈 Progress updated to", progress, "%");
//       } catch (err) {
//         console.error("⚠️ Initial progress sync failed");
//       }
//     };

//     updateProgress();
//   }, [videos, courseId, studentId]);

//   // ✅ Handle video end
//   const handleVideoEnd = async () => {
//     const currentVideoId = videos[currentIndex]?._id;
//     if (!currentVideoId) return;

//     let updated = watchedVideos;
//     if (!watchedVideos.includes(currentVideoId)) {
//       updated = [...watchedVideos, currentVideoId];
//       setWatchedVideos(updated);
//       localStorage.setItem(`watched-${courseId}`, JSON.stringify(updated));
//     }

//     const validWatched = updated.filter((id) => videos.some((v) => v._id === id));
//     const totalVideos = videos.length || 1;
//     const progress = Math.floor((validWatched.length / totalVideos) * 100);

//     try {
//       const token = Cookies.get("studentToken");
//       await axios.put(
//         `http://localhost:5000/api/enrolledCourses/updateProgress/${studentId}/${courseId}`,
//         { progress },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success(`Progress updated to ${progress}%`);
//     } catch (error) {
//       toast.error("Progress update failed");
//     }

//     setVideoCompleted(true);
//   };

//   // ✅ Next button
//   const handleNextVideo = () => {
//     if (!videoCompleted) return toast.error("Please complete this video first.");
//     if (currentIndex < videos.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//       setVideoCompleted(false);
//     } else toast.success("🎉 All videos completed!");
//   };

//   // ✅ Manual video select
//   const handleVideoSelect = (index: number) => {
//     const currentVideoId = videos[index]?._id;
//     const prevVideoId = videos[index - 1]?._id;
//     const isFirst = index === 0;
//     const isUnlocked =
//       watchedVideos.includes(currentVideoId) ||
//       (prevVideoId && watchedVideos.includes(prevVideoId));

//     if (isFirst || isUnlocked) {
//       setCurrentIndex(index);
//       setVideoCompleted(false);
//     } else {
//       toast.error("⚠️ कृपया पहिलेको भिडियो हेर्नुहोस्।");
//     }
//   };

//   const currentVideo = videos[currentIndex];
//   const isExternal = currentVideo?.videoUrl?.startsWith("http");

//   const formatDate = (iso: string) => {
//     const date = new Date(iso);
//     return date.toLocaleDateString("en-GB", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (

//     <div className="container mt-4">
//       <Toaster />
//       <h3 className="mb-3">📘 Course Videos</h3>

//       {loading ? (
//         <p>⏳ Loading videos...</p>
//       ) : videos.length === 0 ? (
//         <p>📭 No videos available.</p>
//       ) : (
//         <div className="row">
//           <div className="col-md-4 mb-3">
//             <div className="list-group shadow-sm">
//               {videos.map((video, index) => {
//                 const prevVideoId = videos[index - 1]?._id;
//                 const isFirst = index === 0;
//                 const isUnlocked =
//                   watchedVideos.includes(video._id) ||
//                   (prevVideoId && watchedVideos.includes(prevVideoId));

//                 return (
//                   <button
//                     key={video._id}
//                     className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start flex-column ${
//                       index === currentIndex ? "active" : ""
//                     }`}
//                     onClick={() => handleVideoSelect(index)}
//                     disabled={!isUnlocked && !isFirst}
//                   >
//                     <div className="d-flex w-100 justify-content-between">
//                       <span>🎬 {index + 1}. {video.title}</span>
//                       {watchedVideos.includes(video._id) && <span>✅</span>}
//                     </div>
//                     <small className="text-muted mt-1">📅 {formatDate(video.uploadedAt)}</small>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="col-md-8">
//             <h5>{currentVideo?.title}</h5>

//             {isExternal ? (
//               <iframe
//                 width="100%"
//                 height="360"
//                 src={currentVideo.videoUrl}
//                 title={currentVideo.title}
//                 frameBorder="0"
//                 allowFullScreen
//               />
//             ) : (
//               <video
//                 width="100%"
//                 height="360"
//                 controls
//                 ref={videoRef}
//                 onEnded={handleVideoEnd}
//                 key={currentVideo._id}
//               >
//                 <source
//                   src={`http://localhost:5000${currentVideo.videoUrl}`}
//                   type="video/mp4"
//                 />
//               </video>
//             )}

//             <div className="mt-3">
//               <button
//                 className="btn btn-primary"
//                 onClick={handleNextVideo}
//                 disabled={!videoCompleted}
//               >
//                 Next Video ▶️
//               </button>
//             </div>

//             <p className="text-muted">
//               🎞️ Video {currentIndex + 1} of {videos.length}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  assignmentUrl?: string;
  uploadedAt: string;
}

export default function CourseVideosPage() {
  const { courseId } = useParams() as { courseId: string };
  const [studentId, setStudentId] = useState<string | null>(null);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAssignment, setShowAssignment] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentVideo = videos[currentIndex] || null;

  //const currentVideo = videos[currentIndex];
  const isExternal = currentVideo?.videoUrl?.startsWith("http");

  // ✅ Fetch studentId
  useEffect(() => {
    const fetchId = async () => {
      const id = localStorage.getItem("studentId");

      if (id) {
        setStudentId(id);
      } else {
        try {
          const token = Cookies.get("studentToken");
          const res = await axios.get(
            "http://localhost:5000/api/students/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const profileId = res.data._id;
          setStudentId(profileId);
          localStorage.setItem("studentId", profileId);
        } catch (error) {
          console.error("❌ Could not fetch student profile", error);
        }
      }
    };
    fetchId();
  }, []);

  // ✅ Fetch teacherId
  useEffect(() => {
    const fetchEnrollment = async () => {
      if (!courseId || !studentId) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/enrolledCourses/byCourseAndStudent/${courseId}/${studentId}`
        );
        setTeacherId(res.data?.teacherId);
      } catch (err) {
        toast.error("Enrollment not found");
      }
    };
    fetchEnrollment();
  }, [courseId, studentId]);

  // ✅ Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      if (!teacherId || !courseId) return;
      try {
        const token = Cookies.get("studentToken");
        const res = await axios.get(
          `http://localhost:5000/api/teacherCourses/videos/${courseId}?teacherId=${teacherId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const sorted = res.data.sort(
          (a: Video, b: Video) =>
            new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
        );

        setVideos(sorted);
      } catch (err) {
        toast.error("Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [teacherId, courseId]);

  // ✅ Load watched videos
  useEffect(() => {
    const stored = localStorage.getItem(`watched-${courseId}`);
    if (stored) {
      setWatchedVideos(JSON.parse(stored));
    }
  }, [courseId]);

  // ✅ Initial progress sync
  useEffect(() => {
    if (!studentId || !courseId || videos.length === 0) return;

    const stored = localStorage.getItem(`watched-${courseId}`);
    if (!stored) return;

    const watched: string[] = JSON.parse(stored);
    const validWatched = watched.filter((id) =>
      videos.some((v) => v._id === id)
    );
    const progress = Math.floor((validWatched.length / videos.length) * 100);

    const updateProgress = async () => {
      try {
        const token = Cookies.get("studentToken");
        await axios.put(
          `http://localhost:5000/api/enrolledCourses/updateProgress/${studentId}/${courseId}`,
          { progress },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("⚠️ Initial progress update failed");
      }
    };
    updateProgress();
  }, [videos, courseId, studentId]);

  // ✅ Video end handler
  const handleVideoEnd = async () => {
    const currentVideoId = videos[currentIndex]?._id;
    if (!currentVideoId) return;

    let updated = watchedVideos;
    if (!watchedVideos.includes(currentVideoId)) {
      updated = [...watchedVideos, currentVideoId];
      setWatchedVideos(updated);
      localStorage.setItem(`watched-${courseId}`, JSON.stringify(updated));
    }

    const validWatched = updated.filter((id) =>
      videos.some((v) => v._id === id)
    );
    const progress = Math.floor((validWatched.length / videos.length) * 100);

    try {
      const token = Cookies.get("studentToken");
      await axios.put(
        `http://localhost:5000/api/enrolledCourses/updateProgress/${studentId}/${courseId}`,
        { progress },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Progress updated to ${progress}%`);
    } catch (error) {
      toast.error("Progress update failed");
    }

    setVideoCompleted(true);
  };

  // ✅ Next video
  const handleNextVideo = () => {
    if (!videoCompleted)
      return toast.error("Please complete this video first.");
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setVideoCompleted(false);
    } else toast.success("🎉 All videos completed!");
  };

  // ✅ Video manual select
  const handleVideoSelect = (index: number) => {
    const currentVideoId = videos[index]?._id;
    const prevVideoId = videos[index - 1]?._id;
    const isFirst = index === 0;
    const isUnlocked =
      watchedVideos.includes(currentVideoId) ||
      (prevVideoId && watchedVideos.includes(prevVideoId));

    if (isFirst || isUnlocked) {
      setCurrentIndex(index);
      setVideoCompleted(false);
    } else {
      toast.error("⚠️ Please watch the previous video.");
    }
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleAssignmentComplete = async () => {
    if (!studentId || !courseId) return;

    try {
      const token = Cookies.get("studentToken");
      await axios.put(
        `http://localhost:5000/api/enrolledCourses/mark-assignment-complete/${studentId}/${courseId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(" Assignment marked as completed");
    } catch (error) {
      console.error(" Failed to mark assignment", error);
      toast.error("Failed to mark assignment complete");
    }
  };

  return (
    <div className="container mt-4">
      <Toaster />
      <h3 className="mb-3">📘 Course Videos</h3>

      {loading ? (
        <p>⏳ Loading videos...</p>
      ) : videos.length === 0 ? (
        <p>📭 No videos available.</p>
      ) : (
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="list-group shadow-sm">
              {videos.map((video, index) => {
                const prevVideoId = videos[index - 1]?._id;
                const isFirst = index === 0;
                const isUnlocked =
                  watchedVideos.includes(video._id) ||
                  (prevVideoId && watchedVideos.includes(prevVideoId));

                return (
                  <button
                    key={video._id}
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start flex-column ${
                      index === currentIndex ? "active" : ""
                    }`}
                    onClick={() => handleVideoSelect(index)}
                    disabled={!isUnlocked && !isFirst}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <span>
                        🎬 {index + 1}. {video.title}
                      </span>
                      {watchedVideos.includes(video._id) && <span>✅</span>}
                    </div>
                    <small className="text-muted mt-1">
                      📅 {formatDate(video.uploadedAt)}
                    </small>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="col-md-8">
            <h5>{currentVideo?.title}</h5>

            {isExternal ? (
              <iframe
                width="100%"
                height="360"
                src={currentVideo.videoUrl}
                title={currentVideo.title}
                frameBorder="0"
                allowFullScreen
              />
            ) : (
              <video
                width="100%"
                height="360"
                controls
                ref={videoRef}
                onEnded={handleVideoEnd}
                key={currentVideo._id}
              >
                <source
                  src={`http://localhost:5000${currentVideo.videoUrl}`}
                  type="video/mp4"
                />
              </video>
            )}

            <div className="mt-3 d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={handleNextVideo}
                disabled={!videoCompleted}
              >
                Next Video ▶️
              </button>

              {currentVideo?.assignmentUrl &&
                currentVideo.assignmentUrl.length > 0 && (
                  
                  // <button
                  //   className="btn btn-outline-secondary"
                  //   onClick={() => setShowAssignment(true)}
                  // >
                  //   🎓 View Assignment
                  // </button>

                  <Link
                    href={`/studentdashboard/courses/${courseId}/assignment/${currentVideo._id}`}
                    className="btn btn-outline-secondary"
                  >
                    🎓 View Assignment
                  </Link>
                )}
            </div>

            <p className="text-muted mt-2">
              🎞️ Video {currentIndex + 1} of {videos.length}
            </p>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
     

      <Modal
        show={showAssignment}
        onHide={() => setShowAssignment(false)}
        centered
        size="lg"
        onShow={() => {
          const isImage = currentVideo?.assignmentUrl?.match(
            /\.(jpg|jpeg|png|gif|webp)$/
          );
          const isPDF = currentVideo?.assignmentUrl?.match(/\.(pdf|doc|docx)$/);
          if (isImage || isPDF) {
            handleAssignmentComplete(); // ✅ auto complete for image/pdf
          }
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assignment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {currentVideo?.assignmentUrl?.match(/\.(mp4|webm|ogg|mov)$/) ? (
            <video
              width="100%"
              height="360"
              controls
              style={{ borderRadius: "8px" }}
              onEnded={handleAssignmentComplete}
            >
              <source
                src={`http://localhost:5000${currentVideo.assignmentUrl}`}
                type="video/mp4"
              />
            </video>
          ) : currentVideo?.assignmentUrl?.match(
              /\.(jpg|jpeg|png|gif|webp)$/
            ) ? (
            <img
              src={`http://localhost:5000${currentVideo.assignmentUrl}`}
              alt="Assignment"
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "contain" }}
              onLoad={handleAssignmentComplete}
            />
          ) : currentVideo?.assignmentUrl?.match(/\.pdf$/) ? (
            <iframe
              src={`http://localhost:5000${currentVideo.assignmentUrl}`}
              width="100%"
              height="500px"
              style={{ border: "none", borderRadius: "8px" }}
              onLoad={handleAssignmentComplete}
            ></iframe>
          ) : (
            <a
              href={`http://localhost:5000${currentVideo?.assignmentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary"
              onClick={handleAssignmentComplete}
            >
              📎 Open Assignment File
            </a>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignment(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

////------------------------- duration ko aadhar ma progress hune ---------------------------------------

// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useParams } from 'next/navigation';
// import toast, { Toaster } from 'react-hot-toast';

// interface Video {
//   _id: string;
//   title: string;
//   videoUrl: string;
//   uploadedAt: string;
// }

// export default function CourseVideosPage() {
//   const { courseId } = useParams() as { courseId: string };
//   const [studentId, setStudentId] = useState<string | null>(null);
//   const [teacherId, setTeacherId] = useState<string | null>(null);
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [videoCompleted, setVideoCompleted] = useState(false);
//   const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [courseDuration, setCourseDuration] = useState<number>(30); // default 1 month
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   useEffect(() => {
//     const id = localStorage.getItem("studentId");
//     if (id) setStudentId(id);
//   }, []);

//   useEffect(() => {
//     const fetchEnrollment = async () => {
//       if (!courseId || !studentId) return;

//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/enrolledCourses/byCourseAndStudent/${courseId}/${studentId}`
//         );
//         setTeacherId(res.data?.teacherId);

//         // Extract duration in days
//         const durationStr = res.data?.courseId?.duration || "1 month";
//         const match = durationStr.match(/(\d+)/);
//         const days = match ? parseInt(match[1]) * 30 : 30;
//         setCourseDuration(days);
//       } catch (err) {
//         toast.error("Enrollment not found");
//       }
//     };

//     fetchEnrollment();
//   }, [courseId, studentId]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       if (!teacherId || !courseId) return;

//       try {
//         const token = Cookies.get("studentToken");
//         const res = await axios.get(
//           `http://localhost:5000/api/teacherCourses/videos/${courseId}?teacherId=${teacherId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const sorted = res.data.sort(
//           (a: Video, b: Video) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
//         );

//         setVideos(sorted);
//         setLoading(false);
//       } catch (err) {
//         toast.error("Failed to fetch videos");
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, [teacherId, courseId]);

//   useEffect(() => {
//     const data = localStorage.getItem(`watched-${courseId}`);
//     if (data) setWatchedVideos(JSON.parse(data));
//   }, [courseId]);

//   const updateProgress = async (progress: number) => {
//     try {
//       const token = Cookies.get("studentToken");
//       await axios.put(
//         `http://localhost:5000/api/enrolledCourses/updateProgress/${studentId}/${courseId}`,
//         { progress },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (err) {
//       toast.error("Progress update failed");
//     }
//   };

//   const handleVideoEnd = async () => {
//     const currentVideoId = videos[currentIndex]?._id;
//     if (!currentVideoId || watchedVideos.includes(currentVideoId)) return;

//     const updated = [...watchedVideos, currentVideoId];
//     setWatchedVideos(updated);
//     localStorage.setItem(`watched-${courseId}`, JSON.stringify(updated));

//     const progress = Math.min(100, Math.round((updated.length / courseDuration) * 100));
//     await updateProgress(progress);
//     setVideoCompleted(true);
//   };

//   const handleNextVideo = () => {
//     if (!videoCompleted) {
//       toast.error("Please complete this video first.");
//       return;
//     }

//     if (currentIndex < videos.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//       setVideoCompleted(false);
//     } else {
//       toast.success("🎉 All videos completed!");
//     }
//   };

//   const handleVideoSelect = (index: number) => {
//     const prevVideoId = videos[index - 1]?._id;
//     const isFirst = index === 0;
//     const isUnlocked =
//       watchedVideos.includes(videos[index]._id) ||
//       (prevVideoId && watchedVideos.includes(prevVideoId));

//     if (isFirst || isUnlocked) {
//       setCurrentIndex(index);
//       setVideoCompleted(false);
//     } else {
//       toast.error("⚠️ Please watch the previous video.");
//     }
//   };

//   const currentVideo = videos[currentIndex];
//   const isExternal = currentVideo?.videoUrl?.startsWith("http");
//   const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' });

//   return (
//     <div className="container mt-4">
//       <Toaster />
//       <h3 className="mb-3">📘 Course Videos</h3>

//       {loading ? (
//         <p>⏳ Loading videos...</p>
//       ) : videos.length === 0 ? (
//         <p>📭 No videos available.</p>
//       ) : (
//         <div className="row">
//           <div className="col-md-4 mb-3">
//             <div className="list-group shadow-sm">
//               {videos.map((video, index) => {
//                 const prevVideoId = videos[index - 1]?._id;
//                 const isFirst = index === 0;
//                 const isUnlocked =
//                   watchedVideos.includes(video._id) ||
//                   (prevVideoId && watchedVideos.includes(prevVideoId));

//                 return (
//                   <button
//                     key={video._id}
//                     className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start flex-column ${
//                       index === currentIndex ? "active" : ""
//                     }`}
//                     onClick={() => handleVideoSelect(index)}
//                     disabled={!isUnlocked && !isFirst}
//                   >
//                     <div className="d-flex w-100 justify-content-between">
//                       <span>🎬 {index + 1}. {video.title}</span>
//                       {watchedVideos.includes(video._id) && <span>✅</span>}
//                     </div>
//                     <small className="text-muted mt-1">📅 {formatDate(video.uploadedAt)}</small>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="col-md-8">
//             <h5>{currentVideo?.title}</h5>

//             {isExternal ? (
//               <iframe
//                 width="100%"
//                 height="360"
//                 src={currentVideo.videoUrl}
//                 title={currentVideo.title}
//                 frameBorder="0"
//                 allowFullScreen
//               />
//             ) : (
//               <video
//                 width="100%"
//                 height="360"
//                 controls
//                 ref={videoRef}
//                 onEnded={handleVideoEnd}
//                 key={currentVideo._id}
//               >
//                 <source
//                   src={`http://localhost:5000${currentVideo.videoUrl}`}
//                   type="video/mp4"
//                 />
//               </video>
//             )}

//             <div className="mt-3">
//               <button
//                 className="btn btn-primary"
//                 onClick={handleNextVideo}
//                 disabled={!videoCompleted}
//               >
//                 Next Video ▶️
//               </button>
//             </div>

//             <p className="text-muted">
//               🎞️ Video {currentIndex + 1} of {videos.length}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
