import { BASE_URL } from "../../config";
import axios from "axios";
export const fetchCourses = async () => {
  const res = await axios.get(`${BASE_URL}/courses`, {
    withCredentials: true,
  });
  return res;
};
export const fetchSingleCourse = async (courseId: string) => {
  const res = await axios.get(`${BASE_URL}/course/${courseId}`, {
    withCredentials: true,
  });
  return res;
};
export const buyCourseAction = async (courseId: string) => {
  const res = await axios.post(
    `${BASE_URL}/buycourse/${courseId}`,
    {},
    { withCredentials: true }
  );
  return res;
};

export const fetchMyCreation = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/mycreation`, {
      withCredentials: true,
    });
    return response.data.course;
  } catch {
    console.log("Something went wrong");
    return [];
  }
};