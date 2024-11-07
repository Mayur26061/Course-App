import { BASE_URL } from "../../config";
import axios from "axios";
export const fetchSingleContent = async (
  contentId: string,
  courseId: string
) => {
  const res = await axios.post(
    `${BASE_URL}/content/${contentId}`,
    {
      courseId: courseId,
    },
    {
      withCredentials: true,
    }
  );
  return res;
};
