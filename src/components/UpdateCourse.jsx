/* eslint-disable react/prop-types */
import { Button, Card, Switch, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../config";
import { courseState } from "../stores/atoms/course";
import { useRecoilState } from "recoil";

const UpdateCourse = () => {
  const [course, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState(course.course.title);
  const [description, setDescription] = useState(course.course.description);
  const [price, setPrice] = useState(course.course.price);
  const [isPublished, setIsPublished] = useState(course.course.published);
  const update = async () => {
    const res = await axios.put(
      `${BASE_URL}/admin/courses/${course.course._id}`,
      {
        title,
        description,
        price,
        published: isPublished,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setCourse({ isLoading: false, course: res.data.data });
  };
  return (
    <div className="flex justify-center">
      <Card className="mt-52 max-w-600" variant="outlined">
        <div className="p-5">
          <Typography className="!mb-2.5">Edit Course</Typography>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="!mb-2.5"
            variant="outlined"
            label="Title"
            fullWidth={true}
          />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="flex items-center">
            <Switch
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <Typography>Published</Typography>
          </div>
          <Button
            className="!m-1.5"
            onClick={() => {
              update();
            }}
            variant="contained"
          >
            Update
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UpdateCourse;
