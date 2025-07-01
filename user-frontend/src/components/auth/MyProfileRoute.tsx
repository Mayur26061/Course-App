import { Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../stores/atoms/user";
import Notfound from "../common/Notfound";
import EnrolledCourse from "../course/EnrolledCourse";
import MyCreation from "../course/MyCreation";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";

const MyProfileRoute = () => {
  const user = useRecoilValue(userState);

  if (!user.user) {
    return <Notfound />;
  }

  return (
    <Routes>
      <Route index element={<Profile />} />
      <Route path="/creations/*" element={<MyCreation />} />
      <Route path="mycourses" element={<EnrolledCourse />} />
      <Route path="changepass" element={<ChangePassword />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};
export default MyProfileRoute;
