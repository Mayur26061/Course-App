import React from "react";
import { Button, Card } from "@mui/material";
import { useRecoilValue } from "recoil";
import Content from "./Content";
import CreateContent from "./CreateContent";
import { Loading } from "../../common/Loading";
import { contentIsloading, contentsState } from "../../../stores/selectors/content";

const ContentSection = () => {
  const content = useRecoilValue(contentsState);
  const loading = useRecoilValue(contentIsloading);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if(loading){
    return <Loading/>
  }

  return (
    <div className="flex justify-center">
      <Card className="mt-9 p-2.5 w-full max-w-xl">
        {content && content.map((c: { id: React.Key; }) => <Content key={c.id} content={c} />)}
        <Button onClick={handleOpen}>Add a Content</Button>
      </Card>
      <CreateContent handleClose={handleClose} open={open} />
    </div>
  );
};

export default ContentSection;
