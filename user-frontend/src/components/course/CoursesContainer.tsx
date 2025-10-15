import { FC, memo } from "react";
import { CourseType } from "../../libs/types/course";
import Course from "./Course";

interface Tprops {
  courses: CourseType[];
}

const CoursesContainer: FC<Tprops> = memo(({ courses }) => {
  // can we pass path from props ?
  return (
    <div className="inline-grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-2">
      {courses &&
        courses.map((c) => <Course key={c.id} course={c} path="/course" />)}
    </div>
  );
});

export default CoursesContainer;
