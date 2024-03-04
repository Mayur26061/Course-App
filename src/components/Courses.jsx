/* eslint-disable react/prop-types */
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Course(props) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/course/${props.course._id}`);
      }}
    >
      <Card sx={{ width: 345 }} style={{ margin: 10 }}>
        <CardMedia
          component="img"
          alt="courseImage"
          height="140"
          image={props.course.imageLink}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.course.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
export default Course;
