import React, { useEffect, useState } from "react";
import { fetchUsers } from "./fetch";
interface userType {
  id: string;
  name: string;
  username: string;
  password: string;
  image: string | null;
  createAt: string;
  userType: string;
  isApproved: boolean;
}

const UserPage = () => {
  const [users, setUsers] = useState<userType[]>([]);
  useEffect(() => {
    async function fetchApi() {
      const result = await fetchUsers();
      setUsers(result);
    }
    fetchApi();
  });
  // const users = useFetchUser()
  return (
    <div>
      {users && users.map((data) => <div key={data.id}>{data.name}</div>)}
    </div>
  );
};

export default UserPage;
