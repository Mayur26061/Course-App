/* eslint-disable react/prop-types */
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Course(props) {
  const navigate = useNavigate();
  return (
    <div tabIndex={0}>
      <Card className="text-center m-2 w-72 h-80">
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
          <div className="h-36 p-2">
            <CardMedia
              component="img"
              alt="courseImage"
              image={props.course.imageLink}
              className="h-full w-full"
            />
          </div>
          <div className="mt-5">
            <Button
              onClick={() => {
                navigate(`/admin/course/${props.course._id}`);
              }}
              size="small"
              variant="contained"
            >
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default Course;
