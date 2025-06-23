import { FC, useEffect, useState } from "react";
import { fetchMyCreation } from "./fetch";
import Course from "./Course";
import { courseType } from "./CoursesContainer";
import { Route, Routes, useNavigate } from "react-router-dom";
import Notfound from "../common/Notfound";
import SingleCourseEdit from "./SingleCourseEdit";
import SingleContent from "../content/SingleContent";
import CreateCourse from "./CreateCourse";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
  const [courses, setCourses] = useState<courseType[]>([]);
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
