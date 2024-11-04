import axios from "axios";
import { BASE_URL } from "../../config";
export const fetchEnrolled = async () => {
  const response = await axios.get(`${BASE_URL}/subscriber`, {
    withCredentials: true,
  });
  return response.data.course_partner;
};

export const actionComplete = async (subId: string, completed: boolean) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/update/subscriber/${subId}`,
      {
        completed,
      },
      {
        withCredentials: true,
      }
    );
    if (response.data.error) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (e) {
    console.error(e);
    return { error: true, e };
  }
};
