/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Course from "./Courses";
import { BASE_URL } from "../../config";
function ShowCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/courses`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((resposne) => {
        setCourses(resposne.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-center flex-wrap">
        {courses && courses.map((c) => <Course key={c._id} course={c} />)}
      </div>
    </div>
  );
}

export default ShowCourses;
