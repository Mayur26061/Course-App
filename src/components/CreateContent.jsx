/* eslint-disable react/prop-types */
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Switch, Select, MenuItem, InputLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { courseState } from "../stores/atoms/course";
import { validateContent } from "./utils";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 500,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function CreateContent({ handleClose, open }) {
  const setCourse = useSetRecoilState(courseState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");
  const [published, setPublished] = useState(true);
  let { cid } = useParams();
  const onCloses = () => {
    handleClose();
    setTitle("");
    setDescription("");
    setType("");
    setUrl("");
    setPublished(true);
  };
  const createContent = async () => {
    const contentobj = {
      title,
      description,
      type,
      url,
      published,
    };
    if (title && type && url && validateContent(contentobj)) {
      const response = await axios.post(
        `${BASE_URL}/admin/${cid}/content`,
        contentobj,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        setCourse((old) => ({
          ...old,
          course: {
            ...old.course,
            content: [...old.course.content, response.data.cont],
          },
        }));
      }
      onCloses();
    }
    console.log("Please fill the required details");
  };
  return (
    <Modal open={open} onClose={onCloses}>
      <Box sx={style}>
        <Typography variant="h5" style={{ marginBottom: 10 }}>
          Create new content
        </Typography>
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
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          fullWidth={true}
          style={{ marginBottom: "10px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value={"image"}>Image</MenuItem>
          <MenuItem value={"document"}>Document</MenuItem>
          <MenuItem value={"video"}>Video</MenuItem>
        </Select>
        <TextField
          fullWidth={true}
          value={url}
          variant="outlined"
          label="URL"
          onChange={(e) => setUrl(e.target.value)}
        />
        <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}>
          <Typography>Published</Typography>
          <Switch
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: 5 }}
        ></div>
        <br />
        <Button variant="contained" onClick={createContent}>
          Create Content
        </Button>
        <Button variant="outlined" onClick={onCloses} style={{ marginLeft: 5 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
