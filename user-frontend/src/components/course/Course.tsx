import { Card, CardMedia, CardContent } from "@mui/material";
import { FC, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { courseType } from "./CoursesContainer";

interface Tprops {
  course: courseType;
  path:string;
}
const Course: FC<Tprops> = ({ course,path }) => {
  const navigate = useNavigate();
  const navCourse = () => {
    navigate(`${path}/${course.id}`);
  };
  return (
    <div
      className="m-1"
      tabIndex={1}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key == "Enter") {
          navCourse();
        }
      }}
      onClick={navCourse}
    >
      <Card className="!rounded-md cursor-pointer" sx={{ maxWidth: 345 }}>
        <div className="h-40">
          <CardMedia
            component="img"
            height="140"
            image={course.image}
            alt="green iguana"
            className="h-full w-full"
          />
        </div>
        <CardContent className="gap-1.5 flex flex-col">
          <div>
            <div className="font-semibold text-gray-950">{course.title}</div>
            <div className=" text-blue-500 text-xs">Mayur Rathod</div>
          </div>
          <div className="text-gray-700 text-sm">{course.description}</div>
          <div className="font-extrabold text-gray-800">₹{course.price}</div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Course;
