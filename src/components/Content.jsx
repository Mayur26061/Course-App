import { Button, Card, Typography } from "@mui/material";
import React from "react";
import EditContent from "./EditContent";
import { useNavigate } from "react-router-dom";

const Content = ({ content }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (ev) => {
    ev.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        <Button onClick={handleOpen}>Edit</Button>
      </div>
      <EditContent content={content} handleClose={handleClose} open={open} />
    </Card>
  );
};

export default Content;
