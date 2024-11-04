import { BASE_URL } from "../../config";
import axios from "axios";

interface contentType {
  title: string;
  description: string;
  type: string;
  content_url: string;
}

export const createContentCall = async (
  courseId: string,
  contentobj: contentType
) => {
  const response = await axios.post(
    `${BASE_URL}/${courseId}/addcontent`,
    contentobj,
    {
      withCredentials: true,
    }
  );
  return response;
};

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
