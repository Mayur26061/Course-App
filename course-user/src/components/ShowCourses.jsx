/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Course from "./Courses";
import { BASE_URL } from "./config";
import Landing from "./Landing";
function ShowCourses() {
  const [courses, setCourses] = useState();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/users/courses`)
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "rgb(238, 238, 238)",
        }}
      >
        {courses && courses.map((c) => <Course key={c._id} course={c} />)}
      </div>
    </div>
  );
}

export default ShowCourses;
