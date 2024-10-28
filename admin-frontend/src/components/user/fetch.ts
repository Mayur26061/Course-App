import axios from "axios";
import { BASE_URL } from "../../config";
export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`, {
    withCredentials: true,
  });
  return response.data.users;
};
interface updateTypes {
  name?: string;
  username?: string;
  password?: string;
  userType?: string;
  isApproved?: boolean;
}
export const updateUser = async (userId: string, userVals: updateTypes) => {
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
