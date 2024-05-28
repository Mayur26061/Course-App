import { Button, Card, Typography } from "@mui/material";
import { useState } from "react";
import EditContent from "./EditContent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { courseState } from "../stores/atoms/course";
const Content = ({ content }) => {
  const navigate = useNavigate();
  const setCourse = useSetRecoilState(courseState);
  const [open, setOpen] = useState(false);
  const handleOpen = (ev) => {
    ev.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteContent = async (ev) => {
    ev.stopPropagation();
    const response = await axios.delete(
      `${BASE_URL}/admin/content/delete/${content._id}`,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setCourse((old) => ({
      ...old,
      course: {
        ...old.course,
        content: [...old.course.content.filter((c) => c._id !== content._id)],
      },
    }));
    console.log(response);
  };
  return (
    <Card className="mt-1.5">
      <div
        className="flex items-baseline justify-between p-0.5"
        onClick={() => {
          navigate(`content/${content._id}`);
        }}
      >
        <div className="pl-1.5">
          <Typography>{content.title}</Typography>
        </div>
        <div>
          <Button onClick={handleOpen}>Edit</Button>
          <Button
            onClick={deleteContent}
            variant="outlined"
            color="error"
            size="small"
          >
            Delete
          </Button>
        </div>
      </div>
      <EditContent content={content} handleClose={handleClose} open={open} />
    </Card>
  );
};

export default Content;
