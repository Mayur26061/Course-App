import axios from "axios";
import { BASE_URL } from "../../config";

interface login {
  username: string;
  password: string;
}

interface register extends login {
  name: string;
}

export const loginCall = async (data: login) => {
  const response = await axios.post(`${BASE_URL}/signin`, data, {
    withCredentials: true,
  });
  if (response.data.error) {
    console.log(response.data.message);
    return;
  }
  return response.data.user;
};

export const registerCall = async (data: register) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, data);
    return response.data;
  } catch {
    return { error: true, message: "something went wrong" };
  }
};
