// utils/progressHelpers.ts
import axios from "axios";
import Cookies from "js-cookie";

export const updateVideoProgress = async (enrollmentId: string, videoProgress: number) => {
  const token = Cookies.get("studentToken");
  if (!token) return;

  return axios.put(
    `http://localhost:5000/api/enrolledCourses/${enrollmentId}/video`,
    { videoProgress },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateQuizProgress = async (enrollmentId: string, quizScore: number) => {
  const token = Cookies.get("studentToken");
  if (!token) return;

  return axios.put(
    `http://localhost:5000/api/enrolledCourses/${enrollmentId}/quiz`,
    { quizScore },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
