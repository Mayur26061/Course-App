/* eslint-disable react/prop-types */
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Switch,Select,MenuItem } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { courseState } from "../stores/atoms/course";
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

export default function EditContent({ handleClose, open, content }) {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description);
  const [type, setType] = useState(content.type);
  const [url, setUrl] = useState(content.url);
  const [published, setPublished] = useState(content.published);

  const onCloses = (ev) => {
    ev.stopPropagation();
    handleClose();
    setTitle(content.title);
    setDescription(content.description);
    setType(content.type);
    setUrl(content.url);
    setPublished(content.published);
  };
  const editContent = async () => {
    const contentobj = {
      title,
      description,
      type,
      url,
      published,
    };
    if (title && type && url) {
      const response = await axios.put(
        `${BASE_URL}/admin/content/${content._id}`,
        contentobj,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.error) {
        console.log(response.data.error);
        handleClose();
      } else {
        handleClose();
      }
    }
    setTitle("");
    setDescription("");
    setType("");
    setUrl("");
    setPublished(true);
    console.log("Please fill the required details");
    handleClose();
  };
  return (
    <Modal open={open} onClose={onCloses}>
      <Box sx={style}>
        <Typography variant="h5" style={{ marginBottom: 10 }}>
          Edit content
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
        <br />
        <Button variant="contained" onClick={editContent}>
          Edit Content
        </Button>
        <Button variant="outlined" onClick={onCloses} style={{ marginLeft: 5 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
