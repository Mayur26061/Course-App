import { FC, useEffect, useState } from "react";
import { fetchMyCreation } from "./fetch";
import Course from "./Course";
import { courseType } from "./CoursesContainer";
import { Route, Routes } from "react-router-dom";
import Notfound from "../common/Notfound";
import SingleCourseEdit from "./SingleCourseEdit";
import SingleContent from "../content/SingleContent";
import CreateCourse from "./CreateCourse";

const MyCreation: FC = () => {
    
    return (
        <Routes>
        <Route index element={<AllCourses/>}/>
        <Route path="/:cid" element={<SingleCourseEdit/>}/>
        <Route path="/:co/content/:cid" element={<SingleContent />} />
        <Route path="/create" element={<CreateCourse />} />
        <Route path="*" element={<Notfound/>}/>
    </Routes>
  );
};

const AllCourses = () => {
    const [courses, setCourses] = useState<courseType[]>([]);
    
    useEffect(() => {
      async function fetchCall() {
        const courses = await fetchMyCreation();
        setCourses(courses);
      }
      fetchCall();
    }, []);
    return (
    <div className="flex flex-wrap gap-2">
      {courses &&
        courses.map((c) => <Course key={c.id} course={c} path="/my/creations" />)}
    </div>
  )
}

export default MyCreation;
