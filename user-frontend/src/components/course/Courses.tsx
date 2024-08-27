import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Course(props) {
  const navigate = useNavigate();
  return (
    <div tabIndex={0}>
      <Card
        className="text-center m-2 w-72 h-64 cursor-pointer"
        onClick={() => {
          navigate(`/course/${props.course.id}`);
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.course.title}
          </Typography>
          <Typography
            className="truncate h-5"
            variant="body2"
            color="text.secondary"
          >
            {props.course.description}
          </Typography>
          <div className="p-1 h-40">
            <CardMedia
              component="img"
              alt="courseImage"
              image={props.course.image}
              className="h-full w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default Course;
