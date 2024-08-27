import { useEffect, useState } from "react";
import Course from "./Courses";
import Landing from "../common/Landing";
import { fetchCourses } from "./fetch";

function ShowCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetchCourses()
      .then((resposne) => {
        setCourses(resposne.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Landing />
      <div className="flex justify-center flex-wrap">
        {courses && courses.map((c) => <Course key={c.id} course={c} />)}
      </div>
    </div>
  );
}

export default ShowCourses;
