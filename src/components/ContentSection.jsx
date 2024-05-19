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
    <div className="flex justify-center">
      <Card className="mt-9 p-2.5 w-full max-w-xl">
        {content && content.map((c) => <Content key={c._id} content={c} />)}
        <Button onClick={handleOpen}>Add a Content</Button>
      </Card>
      <CreateContent handleClose={handleClose} open={open} />
    </div>
  );
};

export default ContentSection;
