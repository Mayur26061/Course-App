import React from "react";
import { Button, Card } from "@mui/material";
import { useRecoilValue } from "recoil";
import { courseContentState } from "../stores/selectors/course";
import Content from "./Content";
import CreateContent from "./CreateContent";

const ContentSection = () => {
  const content = useRecoilValue(courseContentState);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{ marginTop: 30, padding: 10, width: "100%", maxWidth: 600 }}
      >
        {content && content.map((c) => <Content key={c._id} content={c} />)}
        <Button onClick={handleOpen}>Add a Content</Button>
      </Card>
      <CreateContent handleClose={handleClose} open={open}/>
    </div>
  );
};

export default ContentSection;
