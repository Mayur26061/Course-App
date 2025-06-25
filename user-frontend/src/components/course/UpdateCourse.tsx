import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { courseState } from "../../stores/atoms/course";
import { deleteCourseCall, updateCourseCall } from "./fetch";

const UpdateCourse = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState(course.course.title);
  const [description, setDescription] = useState(course.course.description);
  const [price, setPrice] = useState(course.course.price);
  const [disable, setDisable] = useState(true);

  const update = async () => {
    const updatedCourse = await updateCourseCall(course.course.id, {
      title,
      description,
      price: parseInt(price),
    });
    if (updatedCourse.error) {
      console.log(updatedCourse.message);
      return;
    }
    setCourse({ isLoading: false, course: updatedCourse });
  };

  const deleteCourse = async () => {
    await deleteCourseCall(course.course.id);
    navigate("/courses");
  };
  return (
    <div className="flex justify-center mt-5">
      <Card variant="outlined">
        <div className="p-5">
          <Typography className="!mb-2.5">Edit Course</Typography>
          <TextField
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setDisable(false);
            }}
            className="!mb-2.5"
            variant="outlined"
            label="Title"
            fullWidth={true}
          />
          <TextField
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDisable(false);
            }}
            fullWidth={true}
            className="!mb-2.5"
            variant="outlined"
            label="Description"
          />
          <TextField
            fullWidth={true}
            value={price}
            variant="outlined"
            label="Price"
            className="!mb-2.5"
            onChange={(e) => {
              setPrice(e.target.value);
              setDisable(false);
            }}
          />
          <div className="flex justify-between">
            <Button
              className="!m-1.5"
              onClick={() => {
                update();
                setDisable(true);
              }}
              variant="contained"
              disabled={disable}
            >
              Update
            </Button>
            <Button
              className="!m-1.5"
              onClick={() => {
                deleteCourse();
              }}
              variant="outlined"
              color="error"
            >
              {/* replace with icon */}
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UpdateCourse;
