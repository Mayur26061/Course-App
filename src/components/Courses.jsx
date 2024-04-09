/* eslint-disable react/prop-types */
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Course(props) {
  const navigate = useNavigate();
  return (
    <div
      tabIndex={0}
    >
      <Card sx={{ width: 280 }} style={{ margin: 10, textAlign:"center" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.course.title}
          </Typography>
          <Typography sx={{height:20}} style={{overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap"}} variant="body2" color="text.secondary">
            {props.course.description}
          </Typography>
        <CardMedia
          component="img"
          alt="courseImage"
          height="150"
          image={props.course.imageLink}
          style={{marginTop:5}}
        />
          <div style={{'marginTop':20}}>
          <Button onClick={()=>{navigate(`/course/${props.course._id}`)}} size="small" variant="contained">Edit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default Course;
