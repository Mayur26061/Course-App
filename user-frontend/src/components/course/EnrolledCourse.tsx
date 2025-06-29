import { FC, useEffect, useState } from "react";
import { CourseType } from "../../libs/types/course";
import CoursesContainer from "./CoursesContainer";
import { fetchEnrolled } from "./fetch";
import { Loading } from "../common/Loading";

const EnrolledCourse: FC = () => {
  const [courses, setCourse] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
  return <CoursesContainer courses={courses} />;
};

export default EnrolledCourse;
