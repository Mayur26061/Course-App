/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect } from "react";
import Course from "./Courses";
function ShowCourses() {
  const [courses, setCourses] = React.useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/courses", {
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

  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  return (
    <div>
      <h1>Create Course Page</h1>
      <div style={{ display: "flex", flexWrap: "wrap",justifyContent:"center" }}>
        {courses.map((c) => (
          <Course key={c._id} course={c} />
        ))}
      </div>
    </div>
  );
}

export default ShowCourses;
