import { FC } from "react";
import { CourseType } from "../../libs/types/course";
import Course from "./Course";

interface Tprops {
  courses: CourseType[];
}

const CoursesContainer: FC<Tprops> = ({ courses }) => {
  // can we pass path from props ?
  return (
    <div className="flex flex-wrap gap-2">
      {courses &&
        courses.map((c) => <Course key={c.id} course={c} path="/course" />)}
    </div>
  );
};

export default CoursesContainer;
