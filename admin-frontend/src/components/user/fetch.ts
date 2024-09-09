import axios from "axios";
import { BASE_URL } from "../../config";
import { useEffect, useState } from "react";
export const useFetchUser = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get(`${BASE_URL}/users`, {
        withCredentials: true,
      });
      setUsers(response.data.course);
    }
    fetchUsers();
  });
  return users;
};
