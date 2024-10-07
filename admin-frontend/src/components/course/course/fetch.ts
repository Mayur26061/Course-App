import { BASE_URL } from "../../../config";
import axios from "axios";

export const fetchAllCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/courses`, {
      withCredentials: true,
    });
    return response.data.course;
  } catch {
    console.log("Something went wrong");
    return [];
  }
};

export const fetchSingleCourse = async (courseId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/course/${courseId}`, {
      withCredentials: true,
    });
    if (!response.data.error) {
      const { contents, ...courseData } = response.data.course;
      return [contents, courseData];
    }
    console.log(response.data.message);
  } catch {
    console.log("Something went wrong");
  }
  return [[], null];
};

export const deleteCourseCall = async (courseId: string) => {
  await axios.delete(`${BASE_URL}/delete/course/${courseId}`, {
    withCredentials: true,
  });
};

export const updateCourseCall = async (courseId:string, courseObj:unknown) => {
  const res = await axios.put(
    `${BASE_URL}/update/course/${courseId}`,
    courseObj,
    {
      withCredentials: true,
    }
  );
  if (res.data.error) {
    return res.data;
  }
  return res.data.course;
};
