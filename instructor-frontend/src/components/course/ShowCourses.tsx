import axios from "axios";
import { useEffect, useState } from "react";
import Course from "./Courses";
import { BASE_URL } from "../../config";
function ShowCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/courses`, {
        withCredentials:true,
      })
      .then((resposne) => {
        console.log(resposne.data.course)
        setCourses(resposne.data.course);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-center flex-wrap">
        {courses && courses.map((c) => <Course key={c.id} course={c} />)}
      </div>
    </div>
  );
}

export default ShowCourses;
