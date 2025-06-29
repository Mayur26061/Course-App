import { SyntheticEvent, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useSetRecoilState } from "recoil";
import { ContentType } from "../../../libs/types/course";
import { contentState } from "../../../stores/atoms/content";
import { boxStyle, validateContent } from "../../../utils";
import { editContentCall } from "../fetch";

interface Tprops {
  handleClose: () => void;
  open: boolean;
  content: ContentType;
}

export default function EditContent({ handleClose, open, content }: Tprops) {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description);
  const [type, setType] = useState(content.type);
  const [url, setUrl] = useState(content.content_url);
  const setContent = useSetRecoilState(contentState);

  const onCloses = (ev: SyntheticEvent) => {
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
      content_url: url,
    };
    if (title && type && url && validateContent(contentobj)) {
      const response = await editContentCall(content.id, contentobj);
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        setContent((contentsStateVals) => {
          return {
            isLoading: false,
            contents: contentsStateVals.contents.map((d) => {
              if (d.id === response.data.content.id) {
                return response.data.content;
              }
              return d;
            }),
          };
        });
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
