import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Card, Switch, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { CourseType } from "../../../lib/types/course";
import { courseState } from "../../../store/atoms/course";
import { checkCourseChanges } from "../../../utils";
import {
  CourseUpdateParams,
  deleteCourseCall,
  updateCourseCall,
} from "./fetch";

interface UpdateCourseProps {
  course: CourseType;
}

const UpdateCourse: FC<UpdateCourseProps> = ({ course }) => {
  const navigate = useNavigate();
  const setCourse = useSetRecoilState(courseState);
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const [disable, setDisable] = useState<boolean>(true);
  const [published, setPublished] = useState(course.published);

  useEffect(() => {
    const obj = { title, description, price };
    const ob2 = {
      title: course.title || "",
      description: course.description || "",
      price: course.price || "",
    };
    setDisable(checkCourseChanges(obj, ob2));
  }, [
    title,
    description,
    price,
    course.title,
    course.description,
    course.price,
  ]);

  const update = async (vals: CourseUpdateParams) => {
    if (course) {
      const updatedCourse = await updateCourseCall(course.id, vals);
      if (updatedCourse.error) {
        console.log(updatedCourse.message);
        return;
      }
      setCourse({ isLoading: false, course: updatedCourse });
    }
  };

  const onSubmit = () => {
    const obj = {
      title,
      description,
      price: parseInt(price),
    };
    update(obj);
  };

  const changePublished = () => {
    update({ published: !published });
    setPublished(!published);
  };

  const deleteCourse = async () => {
    await deleteCourseCall(course.id || "");
    navigate("/course");
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
            }}
            className="!mb-2.5"
            variant="outlined"
            label="Title"
            fullWidth={true}
            required
          />
          <TextField
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
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
            }}
          />
          <Switch checked={published} onChange={changePublished} />
          <div className="flex justify-between">
            <Button
              className="!m-1.5"
              onClick={() => {
                onSubmit();
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
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UpdateCourse;
