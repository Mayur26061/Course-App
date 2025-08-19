import axios, { AxiosHeaders, AxiosResponse } from "axios";
import { BASE_URL } from "../../config";
import { CourseType } from "../../libs/types/course";

interface SingleCourseData {
  course: CourseType | null;
  error: boolean;
  message?: string;
}

interface CourseUpdateParams {
  title: string;
  description: string;
  price: number;
}

interface CustomHeaderContentDisposition extends AxiosHeaders {
  "content-disposition": string;
}
interface CustomAxiosResponse extends AxiosResponse {
  headers: CustomHeaderContentDisposition;
}

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
export const fetchSingleCourse = async (courseId: string): Promise<SingleCourseData> => {
  try {
    const res = await axios.get<SingleCourseData>(`${BASE_URL}/course/${courseId}`, {
      withCredentials: true,
    });
    return res.data;
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
  const res = await axios.post(`${BASE_URL}/buycourse/${courseId}`, {}, { withCredentials: true });
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

export const createCourseCall = async (courseData: FormData) => {
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

export const updateCourseCall = async (
  courseId: string,
  courseObj: CourseUpdateParams | FormData
) => {
  const res = await axios.put(`${BASE_URL}/update/course/${courseId}`, courseObj, {
    withCredentials: true,
  });
  if (res.data.error) {
    return res.data;
  }
  return res.data.course;
};

export const fetchEnrolled = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/my/enrolled`, {
      withCredentials: true,
    });
    if (response.data.courses) {
      return response.data.courses;
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};

export const fetchMyCertifations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/my/completion`, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
  return { error: true, message: "Something went wrong" };
};

export const generateCertificate = async (
  id: string
): Promise<{ url: string; filename: string }> => {
  try {
    const response: CustomAxiosResponse = await axios.get(
      `${BASE_URL}/generate/certificate/${id}`,
      {
        withCredentials: true,
        responseType: "blob",
      }
    );
    const headers = response.headers;

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const data: { url: string; filename: string } = {
      url,
      filename: "test.pdf",
    };
    data.filename = headers["content-disposition"]?.split("filename=")[1] || "error.pdf";

    return data;
  } catch {
    return { filename: "", url: "" };
  }
};
