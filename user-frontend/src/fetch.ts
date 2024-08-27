import axios from "axios";
import { BASE_URL } from "./config";
export const fetchMe = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/me`, {
      withCredentials: true,
    });
    if (res.data.user) {
      return res.data.user;
    }
  } catch (e) {
    console.log(e.response.data.error);
  }
  return null;
};
