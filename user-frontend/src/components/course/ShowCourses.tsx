import { useEffect, useState } from "react";
import Landing from "../common/Landing";
import { Loading } from "../common/Loading";
import CoursesContainer from "./CoursesContainer";
import { fetchCourses } from "./fetch";

const ShowCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCourses()
      .then((resposne) => {
        setCourses(resposne.data.courses);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Landing />
      {(isLoading && <Loading />) || <CoursesContainer courses={courses} />}
    </div>
  );
};

export default ShowCourses;
