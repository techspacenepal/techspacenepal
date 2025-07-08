'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("studentId");
    if (id) setStudentId(id);
  }, []);

  // Fetch enrollment to get teacherId
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

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      if (!teacherId || !courseId) return;

      try {
        const token = Cookies.get("studentToken");
        const res = await axios.get(
          `http://localhost:5000/api/teacherCourses/videos/${courseId}?teacherId=${teacherId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const sorted = res.data.sort(
          (a: Video, b: Video) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
        );

        setVideos(sorted);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch videos");
        setLoading(false);
      }
    };

    fetchVideos();
  }, [teacherId, courseId]);

  // Load watched videos
  useEffect(() => {
    const data = localStorage.getItem(`watched-${courseId}`);
    if (data) {
      setWatchedVideos(JSON.parse(data));
    }
  }, [courseId]);

  // ✅ Handle video completion & update progress
  const handleVideoEnd = async () => {
    const currentVideoId = videos[currentIndex]?._id;
    if (!currentVideoId) return;

    if (!watchedVideos.includes(currentVideoId)) {
      const updated = [...watchedVideos, currentVideoId];
      setWatchedVideos(updated);
      localStorage.setItem(`watched-${courseId}`, JSON.stringify(updated));

      const totalVideos = videos.length || 1;
      const progressPerVideo = 100 / totalVideos;
      const progress = Math.min(100, Math.floor(updated.length * progressPerVideo));

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
    }

    setVideoCompleted(true);
  };

  const handleNextVideo = () => {
    if (!videoCompleted) {
      toast.error("Please complete this video first.");
      return;
    }

    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setVideoCompleted(false);
    } else {
      toast.success("🎉 All videos completed!");
    }
  };

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
      toast.error("⚠️ कृपया पहिलेको भिडियो हेर्नुहोस्।");
    }
  };

  const currentVideo = videos[currentIndex];
  const isExternal = currentVideo?.videoUrl?.startsWith("http");

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
          {/* Sidebar */}
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
                      <span>🎬 {index + 1}. {video.title}</span>
                      {watchedVideos.includes(video._id) && <span>✅</span>}
                    </div>
                    <small className="text-muted mt-1">📅 {formatDate(video.uploadedAt)}</small>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video Player */}
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

            <div className="mt-3">
              <button
                className="btn btn-primary"
                onClick={handleNextVideo}
                disabled={!videoCompleted}
              >
                Next Video ▶️
              </button>
            </div>

            <p className="text-muted">
              🎞️ Video {currentIndex + 1} of {videos.length}
            </p>
          </div>
        </div>
      )}
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


