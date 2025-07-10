import { FC, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CourseType } from "../../libs/types/course";

interface Tprops {
  course: CourseType;
  path: string;
}

const Course: FC<Tprops> = ({ course, path }) => {
  const navigate = useNavigate();
  const navCourse = () => {
    if (path) {
      navigate(`${path}/${course.id}`);
    }
  };

  return (
    <div
      tabIndex={1}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key == "Enter") {
          navCourse();
        }
      }}
      onClick={navCourse}
      className="rounded-md cursor-pointer w-full justify-self-center p-1 max-w-[345px] border border-gray-300 bg-white"
    >
      <div className="h-44 w-full max-w-[345px]">
        <img
          src={course.image}
          alt="green iguana"
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div className="gap-1.5 flex flex-col p-4 pb-6">
        <div>
          <div className="font-semibold text-gray-950">{course.title}</div>
          <div className=" text-blue-500 text-xs">{course.author.name}</div>
        </div>
        <div className="text-gray-700 text-sm">{course.description}</div>
        <div className="font-extrabold text-gray-800">₹{course.price}</div>
      </div>
    </div>
  );
};
export default Course;
