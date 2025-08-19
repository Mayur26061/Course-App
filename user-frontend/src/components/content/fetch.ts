import axios from "axios";
import { BASE_URL } from "../../config";

export const fetchSingleContent = async (
  contentId: string,
  courseId: string
) => {
  const res = await axios.post(
    `${BASE_URL}/markCompleted/${contentId}`,
    {
      courseId: courseId,
    },
    {
      withCredentials: true,
    }
  );
  return res;
};

export const createContentCall = async (
  courseId: string,
  contentobj: FormData
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

export const fetchSingleContentEdit = async (
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
