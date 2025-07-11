import axios from "axios";
import { BASE_URL } from "../../config";

export const logOutAction = async () => {
  await axios.post(
    `${BASE_URL}/signout`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const fetchSearchTerm = async (searchTerm: string) => {
  const response = await axios.post(
    `${BASE_URL}/searchCourses`,
    {
      searchTerm,
    },
    {
      withCredentials: true,
    }
  );
  return response.data
};
