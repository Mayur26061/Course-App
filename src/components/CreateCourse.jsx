import { Button, Card, Switch, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../config";

function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isPublished, setIsPublished] = useState(true);
  const [imageLink, setImageLink] = useState("")

  const createCourse = async () => {
    let course = {
      title,
      description,
      price,
      published: isPublished,
      imageLink
    };
    const res = await axios.post(
      `${BASE_URL}/admin/courses`,
      course,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    console.log(res.data);
    setTitle("");
    setDescription("");
    setPrice(0);
    setIsPublished(true);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Create Course Page</Typography>
      <Card style={{ width: 500, padding: "20px" }} variant="outlined">
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
          style={{ marginBottom: "10px" }}
          label="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          fullWidth={true}
          value={imageLink}
          variant="outlined"
          label="Image Link"
          onChange={(e) => setImageLink(e.target.value)}
        />
        <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}>
          <Switch
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <Typography>Published</Typography>
        </div>
        <br />
        <Button variant="contained" onClick={createCourse}>
          Create Course
        </Button>
      </Card>
    </div>
  );
}
export default CreateCourse;
