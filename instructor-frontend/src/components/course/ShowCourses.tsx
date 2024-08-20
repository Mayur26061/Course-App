import { useEffect, useState } from "react";
import Course from "./Courses";
import { fetchAllCourses } from "./fetch";

function ShowCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function fetchCourses(){
      const courses = await fetchAllCourses()
      setCourses(courses)
    }
    fetchCourses()
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
