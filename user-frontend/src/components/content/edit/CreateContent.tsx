import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { createContentCall } from "../fetch";
import { contentState } from "../../../stores/atoms/content";
import { boxStyle, validateContent } from "../../../utils";

interface Tprops {
  handleClose:()=>void;
  open:boolean;
}

export default function CreateContent({ handleClose, open }:Tprops) {
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
    if(!cid){
      return
    }
    const contentobj = {
      title,
      description,
      type,
      content_url: url,
    };
    if (title && type && url && validateContent(contentobj)) {
      const response = await createContentCall(cid,contentobj)
      if (response.data.error) {
        console.log(response.data.message);
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
