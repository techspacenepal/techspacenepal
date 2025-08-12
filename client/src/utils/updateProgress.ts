

import axios from "axios";
import Cookies from "js-cookie";

export const updateCourseProgress = async (enrollmentId: string, progress: number) => {
  const token = Cookies.get("studentToken");
  if (!token) return;

  await axios.put(
    `http://localhost:5000/api/enrolledCourses/${enrollmentId}/progress`,
    { progress },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
