import { Button, Card, TextField, Typography } from "@mui/material";
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
  const [disable, setDisable] = useState(true)

  const update = async () => {
    const res = await axios.put(
      `${BASE_URL}/update/course/${course.course.id}`,
      {
        title,
        description,
        price:parseInt(price),
      },
      {
        withCredentials:true
      }
    );
    console.log(res)
    setCourse({ isLoading: false, course: res.data.course });
  };
  const deleteCourse = async()=>{
    await axios.delete(
      `${BASE_URL}/delete/course/${course.course.id}`,
      {
        withCredentials:true
      }
    );
    navigate('/courses')
  }
  return (
    <div className="flex justify-center mt-5">
      <Card variant="outlined">
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
              {/* replace with icon */}
            Delete 
          </Button>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default UpdateCourse