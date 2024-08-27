import { BASE_URL } from "../../config";
import axios from "axios";
export const fetchSingleContent = async (
  contentId: string,
  courseId: string
) => {
  const res = await axios.get(`${BASE_URL}/content/${contentId}`, {
    data: {
      courseId,
    },
    withCredentials: true,
  });
  return res;
};
