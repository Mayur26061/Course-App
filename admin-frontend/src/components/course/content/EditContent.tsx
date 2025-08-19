import { Modal, Box, Typography, Button, TextField, Select, MenuItem } from "@mui/material";
import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import MDEditor from "@uiw/react-md-editor";
import { ContentType } from "../../../lib/types/content";
import { contentState } from "../../../store/atoms/content";
import { boxStyle } from "../../../utils";
import { editContentCall } from "./fetch";

interface EditContentProps {
  handleClose: () => void;
  open: boolean;
  content: ContentType;
}

const EditContent: FC<EditContentProps> = ({ handleClose, open, content }) => {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description || "");
  const [type, setType] = useState(content.type);
  const [body, setBody] = useState(content.body);
  const [file, setFile] = useState<File | string>("");
  const fileElement = useRef<HTMLInputElement>(null);
  const setContent = useSetRecoilState(contentState);
  const [accept, setAccept] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const OnFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files?.length) {
      const inputFile = ev.target.files[0];
      setFile(inputFile);
    }
  };

  useEffect(() => {
    if (type === "image") {
      setAccept("image/*");
    } else if (type === "video") {
      setAccept("video/*");
    } else {
      setAccept("");
    }
  }, [type]);

  const onCloses = (ev: SyntheticEvent) => {
    ev.stopPropagation();
    handleClose();
    setTitle(content.title);
    setDescription(content.description || "");
    setType(content.type);
    setBody(content.body);
  };

  const editContent = async () => {
    const formData = new FormData();

    if (type === "document" && body) {
      formData.append("body", body);
    } else if (file) {
      formData.append("file", file);
    }

    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    setIsLoading(true);
    const response = await editContentCall(content.id, formData);
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
    setIsLoading(false);
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
        {type && type !== "document" && (
          <>
            <input
              type="file"
              title="Upload file"
              accept={accept}
              ref={fileElement}
              onChange={OnFileChange}
            />
          </>
        )}
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
              placeholder: "Enter Content here",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
        )}
        <div className="mt-3">
          <Button variant="contained" onClick={editContent} disabled={isLoading}>
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
