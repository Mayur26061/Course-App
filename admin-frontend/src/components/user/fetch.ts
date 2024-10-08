import axios from "axios";
import { BASE_URL } from "../../config";
export const fetchUsers = async() => {
      const response = await axios.get(`${BASE_URL}/users`, {
        withCredentials: true,
      });
  return response.data.users;
};
