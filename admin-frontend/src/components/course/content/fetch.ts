import { BASE_URL } from "../../../config";
import axios from "axios";


export const editContentCall = async (
  contentId: string,
  contentobj: FormData
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
