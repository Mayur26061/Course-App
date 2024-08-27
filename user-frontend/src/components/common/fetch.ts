import { BASE_URL } from "../../config";
import axios from "axios";

export const logOutAction = async () => {
  await axios.post(
    `${BASE_URL}/signout`,
    {},
    {
      withCredentials: true,
    }
  );
};
