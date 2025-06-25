import { Routes, Route } from "react-router-dom";
import Notfound from "../common/Notfound";
import EnrolledCourse from "../course/EnrolledCourse";
import MyCreation from "../course/MyCreation";
import Profile from "./Profile";

const MyProfileRoute = () => {
  return (
    <Routes>
      <Route index element={<Profile />} />
      <Route path="/creations/*" element={<MyCreation />} />
      <Route path="mycourses" element={<EnrolledCourse />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};
export default MyProfileRoute;
