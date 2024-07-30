/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Course from "./Courses";
import { BASE_URL } from "../config";
import Landing from "../common/Landing";

function ShowCourses() {
  const [courses, setCourses] = useState();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/learner/courses`,{
        withCredentials:true
      })
      .then((resposne) => {
        setCourses(resposne.data.courses);
      })
      .catch((err) => {
        debugger;
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Landing />
      <div className="flex justify-center flex-wrap">
        {courses && courses.map((c) => <Course key={c._id} course={c} />)}
      </div>
    </div>
  );
}

export default ShowCourses;
