import { Close } from "@mui/icons-material";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  DialogProps,
} from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import MDEditor from "@uiw/react-md-editor";
import { contentState } from "../../../stores/atoms/content";
import { boxStyle, formatVideoContent, validationContentType } from "../../../utils";
import { createContentCall } from "../fetch";

interface CreateContentProps {
  handleClose: () => void;
  open: boolean;
}

export interface ContentObj {
  title: string;
  description: string | null;
  type: string;
  content_url?: string;
  body?: string;
}

const CreateContent: FC<CreateContentProps> = ({ handleClose, open }) => {
  const setContent = useSetRecoilState(contentState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const { cid } = useParams();

  const onCloses = () => {
    handleClose();
    setTitle("");
    setDescription("");
    setType("");
    setUrl("");
    setBody("");
  };

  const onDialogCloses: DialogProps["onClose"] = (_event, reason) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    onCloses()
  };

  const createContent = async () => {
    if (!cid) {
      return;
    }
    const contentobj: ContentObj = {
      title,
      description,
      type,
    };

    if (type === "document") {
      contentobj.body = body;
    } else {
      contentobj.content_url = url;
    }

    if (title && type && validationContentType(contentobj)) {
      formatVideoContent(contentobj)
      const response = await createContentCall(cid, contentobj);
      if (response.data.error) {
        console.log(response.data.message);
      } else {
        setContent((data) => {
          return {
            isLoading: false,
            contents: [...data.contents, response.data.content],
          };
        });
      }
      onCloses();
      return
    }
    console.log("Please fill the required details");
  };

  return (
    <Modal open={open} onClose={onDialogCloses} disableEscapeKeyDown>
      <Box sx={boxStyle} className="w-full p-2 max-w-7xl">
        <button className="absolute top-2 right-5" onClick={onCloses}><Close /></button>
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
        {type && type !== "document" &&
          (<TextField
            fullWidth={true}
            value={url}
            variant="outlined"
            label="URL"
            onChange={(e) => setUrl(e.target.value)}
          />)
        }
        {type === "document" && (
          <MDEditor
            className="mt-2"
            value={body}
            onChange={(value) => setBody(value as string)}
            id="body"
            preview="edit"
            height={300}
            data-color-mode="light"
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{
              placeholder:
                "Enter Content here",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
        )
        }
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
};

export default CreateContent;
