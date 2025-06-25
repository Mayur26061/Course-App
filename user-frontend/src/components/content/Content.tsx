import { Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userOnlyState } from "../../stores/selectors/userEmail";

const Content = ({ content }) => {
  const userEmail = useRecoilValue(userOnlyState);
  const navigate = useNavigate();
  const custom = !userEmail?.user_courses.filter(
    (data) => data.course_id == content.course_id
  )
    ? "pointer-events-none"
    : "pointer-events-auto";
  return (
    <Card className="mt-1.5">
      <div
        className={"flex items-baseline justify-between p-0.5 " + custom}
        onClick={() => {
          navigate(`content/${content.id}`);
        }}
      >
        <div className="pl-1.5 select-none">
          <Typography>{content.title}</Typography>
        </div>
      </div>
    </Card>
  );
};

export default Content;
