import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { courseType } from "./CoursesContainer";

interface Tprops {
  course: courseType;
}
const Course: FC<Tprops> = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div tabIndex={0}>
      <Card
        className="text-center m-2 w-72 h-64 cursor-pointer"
        onClick={() => {
          navigate(`/course/${course.id}`);
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.title}
          </Typography>
          <Typography
            className="truncate h-5"
            variant="body2"
            color="text.secondary"
          >
            {course.description}
          </Typography>
          <div className="p-1 h-40">
            <CardMedia
              component="img"
              alt="courseImage"
              image={course.image}
              className="h-full w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Course;
