/* eslint-disable react/prop-types */
import { Button, Card, Switch, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../config";
import { courseState } from "../../stores/atoms/course";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";


const UpdateCourse = () => {
const navigate = useNavigate()
  const [course, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState(course.course.title);
  const [description, setDescription] = useState(course.course.description);
  const [price, setPrice] = useState(course.course.price);
  const [isPublished, setIsPublished] = useState(course.course.published);
  const [disable, setDisable] = useState(true)
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
  const deleteCourse = async()=>{
    await axios.delete(
      `${BASE_URL}/admin/course/delete/${course.course._id}`,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    navigate('/admin/courses')
  }
  return (
    <div className="flex justify-center">
      <Card className="mt-52 max-w-600" variant="outlined">
        <div className="p-5">
          <Typography className="!mb-2.5">Edit Course</Typography>
          <TextField
            value={title}
            onChange={(e) => {setTitle(e.target.value)
              setDisable(false)
            }}
            className="!mb-2.5"
            variant="outlined"
            label="Title"
            fullWidth={true}
          />
          <TextField
            value={description}
            onChange={(e) => {setDescription(e.target.value)
              setDisable(false)
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
            onChange={(e) => {setPrice(e.target.value)
              setDisable(false)
            }}
          />
          <div className="flex items-center">
            <Switch
              checked={isPublished}
              onChange={(e) => {setIsPublished(e.target.checked)
                setDisable(false)
              }}
            />
            <Typography>Published</Typography>
          </div>
          <div className="flex justify-between">
          <Button
            className="!m-1.5"
            onClick={() => {
              update();
              setDisable(true)
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
            Delete
          </Button>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default UpdateCourse;
