import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { FC, SyntheticEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ContentType } from "../../../lib/types/content";
import { contentState } from "../../../store/atoms/content";
import { boxStyle, validateContent } from "../../../utils";
import { editContentCall } from "./fetch";

interface EditContentProps {
  handleClose: () => void;
  open: boolean;
  content: ContentType;
}

const EditContent: FC<EditContentProps> = ({ handleClose, open, content }) => {
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
        setContent((contents) => {
          return {
            isLoading: false,
            content: contents.content.map((d) => {
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

  const togglePublish = async () => {
    const response = await editContentCall(content.id, {
      published: !content.published,
    });
    if (response.data.error) {
      console.log(response.data.error);
    } else {
      setContent((contents) => {
        return {
          isLoading: false,
          content: contents.content.map((d) => {
            if (d.id === response.data.content.id) {
              return response.data.content;
            }
            return d;
          }),
        };
      });
    }
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
        <div className="m-2">
          {content.published ? (
            <Button onClick={togglePublish} variant="outlined" color="error">
              Unpublish
            </Button>
          ) : (
            <Button onClick={togglePublish} variant="contained" color="success">
              Publish
            </Button>
          )}
        </div>
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
};

export default EditContent;
