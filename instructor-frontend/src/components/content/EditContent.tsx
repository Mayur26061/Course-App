import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../config";
import { boxStyle } from "../utils";
import { useSetRecoilState } from "recoil";
import { contentState } from "../../stores/atoms/content";
// import { useParams } from "react-router-dom";

export default function EditContent({ handleClose, open, content }) {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description);
  const [type, setType] = useState(content.type);
  const [url, setUrl] = useState(content.content_url);
  const setContent = useSetRecoilState(contentState);
  // const { cid } = useParams();

  const onCloses = (ev: { stopPropagation: () => void; }) => {
    ev.stopPropagation();
    handleClose();
    setTitle(content.title);
    setDescription(content.description);
    setType(content.type);
    setUrl(content.content_url);
  };
  const editContent = async () => {
    const contentobj = {
      title,
      description,
      type,
      content_url:url,
    };
    if (title && type && url) {
      const response = await axios.put(
        `${BASE_URL}/update/content/${content.id}`,
        contentobj,
        {
          withCredentials:true
        }
      );
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log(response.data)
        // const contents = 
        // const cons = await fetchContent(cid);
        setContent({ isLoading: false, content:response.data.course.contents  });
      }
    }
    handleClose();
  };
  return (
    <Modal open={open} onClose={onCloses}>
      <Box sx={boxStyle} className="w-full max-w-lg">
        <Typography variant="h5" className="!mb-2.5">
          Edit content
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
        <Button variant="contained" onClick={editContent}>
          Edit Content
        </Button>
        <Button variant="outlined" onClick={onCloses} className="!ml-1.5">
          Close
        </Button>
        </div>
      </Box>
    </Modal>
  );
}
