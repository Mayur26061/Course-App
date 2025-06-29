import axios from "axios";
import { BASE_URL } from "../../config";

interface UserSignInType {
  username: string;
  password: string;
  name: string;
}

export const loginAction = async (username: string, password: string) => {
  const response = await axios.post(
    `${BASE_URL}/signin`,
    { username, password },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const signUpAction = async (obj: UserSignInType) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/signup`,
      {
        username: obj.username,
        password: obj.password,
        name: obj.name,
      },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.message };
    }
  }
};
