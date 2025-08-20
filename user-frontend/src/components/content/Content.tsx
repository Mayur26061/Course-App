import { Card, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ContentType } from "../../libs/types/course";
import { userOnlyState } from "../../stores/selectors/userEmail";
import { CheckCircleOutline, LensOutlined } from "@mui/icons-material";

interface ContentProps {
  content: ContentType;
}

const Content: FC<ContentProps> = ({ content }) => {
  const user = useRecoilValue(userOnlyState);
  const navigate = useNavigate();
  const custom = !user?.user_courses.filter(
    (data) => data.course_id == content.course_id
  )
    ? "pointer-events-none"
    : "cursor-pointer hover:bg-slate-100";
  return (
    <Card className="mt-1.5 ">
      <div
        className={"flex items-center p-0.5 " + custom}
        onClick={() => {
          navigate(`content/${content.id}`);
        }}
      >
        {user && <>
          {user?.user_courses.filter((data) => data.course_id == content.course_id)[0]?.user_contents.find((co) => co.content_id == content.id) ?
            <CheckCircleOutline className="text-green-500" />
            :
            <LensOutlined />
          }
        </>
        }
        <div className="pl-1.5 select-none">
          <Typography>{content.title}</Typography>
        </div>
      </div>
    </Card>
  );
};

export default Content;
