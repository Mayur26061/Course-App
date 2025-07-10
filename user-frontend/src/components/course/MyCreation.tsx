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
    const fetchCall = async () => {
      const courses = await fetchMyCreation();
      setCourses(courses);
    };
    fetchCall();
  }, []);
  return (
    <div className="inline-grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-y-3">
      <div
        className="rounded-md cursor-pointer w-full justify-self-center p-1 text-gray-900 flex justify-center items-center max-w-[345px] border border-gray-300 bg-white"
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
