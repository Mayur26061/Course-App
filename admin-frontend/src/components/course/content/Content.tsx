import { Button, Card, Typography } from "@mui/material";
import { FC, SyntheticEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ContentType } from "../../../lib/types/content";
import { contentState } from "../../../store/atoms/content";
import EditContent from "./EditContent";
import { deleteContentCall } from "./fetch";
interface ContentProps {
  content: ContentType;
}
const Content: FC<ContentProps> = ({ content }) => {
  // for future navigation
  // const navigate = useNavigate();
  // const {cid} = useParams()
  const setContent = useSetRecoilState(contentState);
  const [open, setOpen] = useState(false);

  const handleOpen = (ev: SyntheticEvent) => {
    ev.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteContent = async (ev: SyntheticEvent) => {
    // setContent({isLoading:true,content:[]})
    ev.stopPropagation();
    await deleteContentCall(content.id, content.course_id);
    // const cons = await fetchContent(cid)
    setContent((contents) => {
      return {
        isLoading: false,
        content: contents.content.filter((c) => c.id !== content.id),
      };
    });
  };

  return (
    <Card className="mt-1.5">
      <div className="flex items-baseline justify-between p-0.5">
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
