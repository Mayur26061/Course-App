import axios from "axios";
import { BASE_URL } from "../../config";

export const fetchCourses = async () => {
  const response = await axios.get(`${BASE_URL}/courses`, {
    withCredentials: true,
  });
  return response.data.courses;
};
