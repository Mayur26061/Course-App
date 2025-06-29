import { Button, Card, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { CourseType } from "../../libs/types/course";
import { courseState } from "../../stores/atoms/course";
import { deleteCourseCall, updateCourseCall } from "./fetch";

interface UpdateCourseProps {
  course: CourseType;
}

const UpdateCourse: FC<UpdateCourseProps> = ({ course }) => {
  const navigate = useNavigate();
  const setCourse = useSetRecoilState(courseState);
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const [disable, setDisable] = useState(true);

  const update = async () => {
    const updatedCourse = await updateCourseCall(course.id, {
      title,
      description,
      price: price,
    });
    if (updatedCourse.error) {
      console.log(updatedCourse.message);
      return;
    }
    setCourse({ isLoading: false, course: updatedCourse });
  };

  const deleteCourse = async () => {
    await deleteCourseCall(course.id);
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
            type="number"
            variant="outlined"
            label="Price"
            className="!mb-2.5"
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
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
