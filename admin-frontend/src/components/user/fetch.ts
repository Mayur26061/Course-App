import axios from "axios";
import { BASE_URL } from "../../config";

interface UpdateTypes {
  name?: string;
  username?: string;
  password?: string;
  userType?: string;
  isApproved?: boolean;
}

export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`, {
    withCredentials: true,
  });
  return response.data.users;
};

export const updateUser = async (userId: string, userVals: UpdateTypes) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/update/user/${userId}`,
      {
        ...userVals,
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

export const deleteUserRoute = async (userId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/user/${userId}`, {
      withCredentials: true,
    });
    if (response.data.error) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (e) {
    console.error(e);
    return { error: true, e };
  }
};
