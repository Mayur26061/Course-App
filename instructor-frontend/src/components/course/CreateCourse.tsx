import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../config";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageLink, setImageLink] = useState("");

  const createCourse = async () => {
    const course = {
      title,
      description,
      price,
      image: imageLink,
    };
    await axios.post(`${BASE_URL}//addcourse`, course, {
      withCredentials: true,
    });
    setTitle("");
    setDescription("");
    setPrice(0);
  };
  return (
    <div className="flex flex-col justify-center items-center p-5">
      <Typography variant="h4">Create Course Page</Typography>
      <Card
        className="p-5 w-full sm:w-3/5 md:w-3/5 lg:w-2/5"
        variant="outlined"
      >
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
          className="!mb-2.5"
          label="Price"
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />
        <TextField
          fullWidth={true}
          value={imageLink}
          variant="outlined"
          label="Image Link"
          onChange={(e) => setImageLink(e.target.value)}
        />
        <div className="mt-3">
          <Button variant="contained" onClick={createCourse}>
            Create Course
          </Button>
        </div>
      </Card>
    </div>
  );
}
export default CreateCourse;
