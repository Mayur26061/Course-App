import axios from "axios";
import { BASE_URL } from "../../config";

// Fetch all courses
export const fetchCourses = async () => {
  const res = await axios.get(`${BASE_URL}/courses`, {
    withCredentials: true,
  });
  return res;
};

/*
 * Fetch single course with specfied
 * @param {string} courseId
 */
export const fetchSingleCourse = async (courseId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/course/${courseId}`, {
      withCredentials: true,
    });
    return res;
  } catch {
    return { error: true, course: null };
  }
};

export const fetchSingleCourseEditable = async (courseId: string) => {
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

export const createCourseCall = async (courseData) => {
  const res = await axios.post(`${BASE_URL}/addcourse`, courseData, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteCourseCall = async (courseId: string) => {
  await axios.delete(`${BASE_URL}/delete/course/${courseId}`, {
    withCredentials: true,
  });
};

export const updateCourseCall = async (courseId, courseObj) => {
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
