/* eslint-disable react/prop-types */
import { Button, Card, Switch, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { courseState } from "../stores/atoms/course";
import { useRecoilState } from "recoil";

const UpdateCourse = () => {
  const [course, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState(course.course.title);
  const [description, setDescription] = useState(course.course.description);
  const [price, setPrice] = useState(course.course.price);
  const [isPublished, setIsPublished] = useState(course.course.published);
useEffect(()=>{
  setTitle(course.course.title);
  setDescription(course.course.description);
  setPrice(course.course.price);
  setIsPublished(course.course.published);
},[])
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ maxWidth: 600, marginTop: 200 }} variant="outlined">
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>Edit Course</Typography>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
            variant="outlined"
            label="Title"
            fullWidth={true}
          />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth={true}
            style={{ marginBottom: "10px" }}
            variant="outlined"
            label="Description"
          />
          <TextField
            fullWidth={true}
            value={price}
            variant="outlined"
            label="Price"
            style={{ marginBottom: "10px" }}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Switch
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <Typography>Published</Typography>
          </div>
          <Button
            style={{ margin: 5 }}
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
