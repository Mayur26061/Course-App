import { Button, Card, Typography } from "@mui/material";
import { FC, useState, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ContentType } from "../../../libs/types/course";
import { contentState } from "../../../stores/atoms/content";
import { deleteContentCall } from "../fetch";
import EditContent from "./EditContent";

type contentProps = {
  content: ContentType;
};

const Content: FC<contentProps> = ({ content }) => {
  const navigate = useNavigate();
  const setContent = useSetRecoilState(contentState);
  const [open, setOpen] = useState(false);
  // const {cid} = useParams()

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
        contents: contents.contents.filter((c) => c.id !== content.id),
      };
    });
  };

  return (
    <Card className="mt-1.5">
      <div
        className="flex items-baseline justify-between p-0.5"
        onClick={() => {
          navigate(`content/${content.id}`);
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
