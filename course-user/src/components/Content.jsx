import { Card, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "../stores/atoms/user";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../stores/selectors/userEmail";
const Content = ({ content }) => {
  const userEmail = useRecoilValue(userEmailState);

  const navigate = useNavigate();

  return (
    <Card style={{ marginTop: 5 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          padding: 2,
          pointerEvents: !userEmail?.purchaseCourses.includes(content.courses)
            ? "none"
            : "auto",
        }}
        onClick={() => {
          navigate(`content/${content._id}`);
        }}
      >
        <div style={{ paddingLeft: 5, userSelect: "none" }}>
          <Typography>{content.title}</Typography>
        </div>
      </div>
    </Card>
  );
};

export default Content;
