import {
    Routes,
    Route,
  } from "react-router-dom";
import Profile from "./Profile";
import MyCreation from "../course/MyCreation";
import Notfound from "../common/Notfound";
import EnrolledCourse from "../course/EnrolledCourse";

const MyProfileRoute = ()=>{
    return <Routes>
        <Route index element={<Profile/>}/>
        <Route path="creations" element={<MyCreation/>}/>
        <Route path="mycourses" element={<EnrolledCourse/>}/>
        <Route path="*" element={<Notfound/>}/>
    </Routes>
}
export default MyProfileRoute