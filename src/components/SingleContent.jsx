import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config";

const SingleContent = () => {
  const { co, cid } = useParams();
  const [content, setContent] = useState();
  useEffect(() => {
    async function fetchContent() {
      const res = await axios.get(`${BASE_URL}/admin/content/${cid}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(res.data.cont);
      setContent(res.data.cont);
    }
    fetchContent();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
      <div
        style={{
          display: "flex",
          height: "auto",
          padding: 10,
          width: "auto",
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <div style={{ position: "absolute" }}>
          <Link to={`/admin/course/${co}`}>
            <Button variant="contained">&lt; Back to Course</Button>
          </Link>
        </div>
        <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ height: "auto", width: 500 }}>
            {content?.type == "image" && (
              <img
                style={{ height: "100%", width: "100%" }}
                src={content.url}
              />
            )}
            {content?.type == "document" && (
              <iframe
                src={content.url}
                style={{ height: "100%", width: "100%" }}
                allow="autoplay"
              ></iframe>
            )}
            {content?.type == "video" && (
              <iframe
                style={{ height: "100%", width: "100%" }}
                src={content.url}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleContent;
