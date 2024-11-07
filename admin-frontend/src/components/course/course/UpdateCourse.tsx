import { Button, Card, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { courseState } from "../../../store/atoms/course";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { deleteCourseCall, updateCourseCall } from "./fetch";
import DeleteIcon from "@mui/icons-material/Delete";
const KEYS = ["title", "description", ""];
type checin = {
  title: string;
  description: string;
  price: string;
};
function acbs(ct: checin, ob: checin): boolean {
  for (const a of Object.keys(ct)) {
    if (ct[a] == "") {
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (ct[a] !== ob[a]) {
      return false;
    }
  }
  return true;
}
const UpdateCourse = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState<string>(course.course?.title || "");
  const [description, setDescription] = useState<string>(
    course.course?.description || ""
  );
  const [price, setPrice] = useState<string>(course.course?.price || "");
  const [disable, setDisable] = useState<boolean>(true);
  const [published, setPublished] = useState<boolean>(
    Boolean(course.course?.published)
  );

  useEffect(() => {
    const obj = { title, description, price };
    const ob2 = {
      title: course.course?.title || "",
      description: course.course?.description || "",
      price: course.course?.price || "",
    };
    setDisable(acbs(obj, ob2));
  }, [
    title,
    description,
    price,
    course.course?.title,
    course.course?.description,
    course.course?.price,
  ]);

  const update = async (vals: unknown) => {
    if (course.course) {
      const updatedCourse = await updateCourseCall(course.course.id, vals);
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
    await deleteCourseCall(course.course?.id || "");
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
