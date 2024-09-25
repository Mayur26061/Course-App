import { FC } from "react";
import UserList from "./UserList";


const UserPage:FC = () => {

  // const users = useFetchUser()
  return (
    <div className="max-w-3xl">
      <UserList/>
    </div>
  );
};

export default UserPage;
