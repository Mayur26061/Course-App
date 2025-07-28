import { FC, useEffect, useState } from "react";
import { CourseType } from "../../libs/types/course";
import CoursesContainer from "./CoursesContainer";
import { fetchEnrolled } from "./fetch";
import { Loading } from "../common/Loading";
import { Link } from "react-router-dom";

const EnrolledCourse: FC = () => {
  const [courses, setCourse] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchEnrolled();
        setCourse(result);
      } catch {
        console.error("Something went wrong");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (!courses.length) {
    return (
      <div className="text-center">
        Please get enrolled in exciting{" "}
        <Link to={"/courses"} className="text-blue-600 hover:text-violet-600">
          courses
        </Link>
      </div>
    );
  }
  return <CoursesContainer courses={courses} />;
};

export default EnrolledCourse;
