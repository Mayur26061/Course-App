import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useSetRecoilState } from "recoil";
import { validateContent } from "../utils";
import { boxStyle } from "../utils";
import { contentState } from "../../stores/atoms/content";
export default function CreateContent({ handleClose, open }) {
  const setContent = useSetRecoilState(contentState);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");
  const { cid } = useParams();

  const onCloses = () => {
    handleClose();
    setTitle("");
    setDescription("");
    setType("");
    setUrl("");
  };

  const createContent = async () => {
    const contentobj = {
      title,
      description,
      type,
      content_url: url,
    };
    if (title && type && url && validateContent({ type, url })) {
      const response = await axios.post(
        `${BASE_URL}/${cid}/addcontent`,
        contentobj,
        {
          withCredentials: true,
        }
      );
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        setContent((data) => {
          return {
            isLoading: false,
            content: [...data.content, response.data.content],
          };
        });
      }
      onCloses();
    }
    console.log("Please fill the required details");
  };

  return (
    <Modal open={open} onClose={onCloses}>
      <Box sx={boxStyle} className="w-full max-w-lg p-2">
        <Typography variant="h5" className="!mb-2.5">
          Create new content
        </Typography>
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
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          fullWidth={true}
          className="!mb-2.5"
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
        <div className="mt-3">

        <Button variant="contained" onClick={createContent}>
          Create Content
        </Button>
        <Button variant="outlined" onClick={onCloses} className="!ml-1.5">
          Close
        </Button>
        </div>
      </Box>
    </Modal>
  );
}
