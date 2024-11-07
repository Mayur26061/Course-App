import { BASE_URL } from "../../../config";
import axios from "axios";

interface contentType {
  title?: string;
  description?: string | null;
  type?: string;
  content_url?: string;
  published?: boolean;
}

export const editContentCall = async (
  contentId: string,
  contentobj: contentType
) => {
  const response = await axios.put(
    `${BASE_URL}/update/content/${contentId}`,
    contentobj,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const deleteContentCall = async (
  contentId: string,
  courseId: string
) => {
  await axios.delete(`${BASE_URL}/delete/content/${contentId}`, {
    data: {
      courseId: courseId,
    },
    withCredentials: true,
  });
};
export const fetchSingleContent = async (
  contentId: string,
  courseId: string
) => {
  const res = await axios.get(`${BASE_URL}/content/${contentId}`, {
    data: {
      courseId: courseId,
    },
    withCredentials: true,
  });
  return res;
};
