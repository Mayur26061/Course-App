import { Card, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../stores/selectors/userEmail";
const Content = ({ content }) => {
  const userEmail = useRecoilValue(userEmailState);
  const navigate = useNavigate();
  const custom = !userEmail?.purchaseCourses.includes(content.courses)
    ? "pointer-events-none"
    : "pointer-events-auto";
  return (
    <Card className="mt-1.5">
      <div
        className={"flex items-baseline justify-between p-0.5 " + custom}
        onClick={() => {
          navigate(`content/${content._id}`);
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
