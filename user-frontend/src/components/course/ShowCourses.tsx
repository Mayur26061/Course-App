import { useEffect, useState } from "react";
import Landing from "../common/Landing";
import { fetchCourses } from "./fetch";
import CoursesContainer from "./CoursesContainer";

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
      <CoursesContainer courses={courses} />
    </div>
  );
}

export default ShowCourses;
