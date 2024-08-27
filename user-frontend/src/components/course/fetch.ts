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
