/* eslint-disable react/prop-types */
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Switch, Select, MenuItem, InputLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useSetRecoilState } from "recoil";
import { fetchContent, validateContent } from "../utils";
import { boxStyle } from "../utils";
import { contentState } from "../../stores/atoms/content";
export default function CreateContent({ handleClose, open }) {
  const setContent = useSetRecoilState(contentState);

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
        const cons = await fetchContent(cid);
        setContent({ isLoading: false, content: cons });
      }
      onCloses();
    }
    console.log("Please fill the required details");
  };

  return (
    <Modal open={open} onClose={onCloses}>
      <Box sx={boxStyle}>
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
        <div className="flex items-center my-1.5">
          <Typography>Published</Typography>
          <Switch
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
        </div>
        <Button variant="contained" onClick={createContent}>
          Create Content
        </Button>
        <Button variant="outlined" onClick={onCloses} className="!ml-1.5">
          Close
        </Button>
      </Box>
    </Modal>
  );
}
