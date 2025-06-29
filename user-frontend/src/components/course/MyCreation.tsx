import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FC, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CourseType } from "../../libs/types/course";
import Notfound from "../common/Notfound";
import SingleContent from "../content/SingleContent";
import Course from "./Course";
import CreateCourse from "./CreateCourse";
import SingleCourseEdit from "./SingleCourseEdit";
import { fetchMyCreation } from "./fetch";

const MyCreation: FC = () => {
  return (
    <Routes>
      <Route index element={<AllCourses />} />
      <Route path="/:cid" element={<SingleCourseEdit />} />
      <Route path="/:co/content/:cid" element={<SingleContent />} />
      <Route path="/create" element={<CreateCourse />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

const AllCourses = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCall() {
      const courses = await fetchMyCreation();
      setCourses(courses);
    }
    fetchCall();
  }, []);
  return (
    <div className="flex flex-wrap gap-2">
      <div
        className="cursor-pointer h-72 w-72 border border-gray-900 text-gray-900 flex justify-center items-center"
        onClick={() => {
          navigate("create");
        }}
      >
        <AddCircleOutlineIcon className="!size-24" />
      </div>
      {courses &&
        courses.map((c) => (
          <Course key={c.id} course={c} path="/my/creations" />
        ))}
    </div>
  );
};

export default MyCreation;
