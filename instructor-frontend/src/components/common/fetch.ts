import axios from "axios";
import { BASE_URL } from "../../config";

export const logOutCall = async () => {
  try {
    await axios.post(`${BASE_URL}/signout`, {}, { withCredentials: true });
  } catch {
    console.log("Error");
  }
};
