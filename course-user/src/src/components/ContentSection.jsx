import React from "react";
import { Button, Card } from "@mui/material";
import { useRecoilValue } from "recoil";
import { courseContentState } from "../stores/selectors/course";
import Content from "./Content";

const ContentSection = () => {
  const content = useRecoilValue(courseContentState);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
      variant="outlined"
        style={{ marginTop: 30, padding: 10, width: "100%", maxWidth: 600 }}
      >
        {content && content.map((c) => <Content key={c._id} content={c} />)}
      </Card>
    </div>
  );
};

export default ContentSection;
