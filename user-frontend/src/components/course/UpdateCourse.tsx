import { Button, Card, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { CourseType } from "../../libs/types/course";
import { courseEditState } from "../../stores/atoms/course";
import { deleteCourseCall, updateCourseCall } from "./fetch";

interface UpdateCourseProps {
  course: CourseType;
}

const UpdateCourse: FC<UpdateCourseProps> = ({ course }) => {
  const navigate = useNavigate();
  const setCourse = useSetRecoilState(courseEditState);
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const [disable, setDisable] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    setIsProcessing(true);
    if (ev.target.files?.length) {
      const file = ev.target.files[0];

      const formData = new FormData();
      formData.append("file", file);
      const updatedCourse = await updateCourseCall(course.id, formData);

      if (updatedCourse.error) {
        console.log(updatedCourse.message);
        setIsProcessing(false);
        return;
      }
      setCourse({ course: updatedCourse });
      ev.target.files = null;
    }
    setIsProcessing(false);
  };

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
    setCourse({ course: updatedCourse });
  };

  const deleteCourse = async () => {
    setIsProcessing(true);
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
          <div>
            <label
              htmlFor="course_image"
              className={`p-2 my-2 inline-block bg-black text-white ${
                isProcessing ? "pointer-events-none bg-gray-800" : "cursor-pointer"
              }`}
            >
              Change course Image
            </label>
            <input
              disabled={isProcessing}
              type="file"
              title="Upload file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
              id="course_image"
            />
          </div>
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
              disabled={isProcessing}
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
