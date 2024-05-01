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
    <Card style={{ marginTop: 5 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          padding: 2,
        }}
        onClick={() => {
          navigate(`content/${content._id}`);
        }}
      >
        <div style={{ paddingLeft: 5 }}>
          <Typography>{content.title}</Typography>
        </div>
        <Button onClick={handleOpen}>Edit</Button>
      </div>
      <EditContent content={content} handleClose={handleClose} open={open} />
    </Card>
  );
};

export default Content;
