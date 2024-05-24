import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "./config";
import { Loading } from "./Loading";

const SingleContent = () => {
  const { co, cid } = useParams();
  const [content, setContent] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await axios.get(`${BASE_URL}/admin/content/${cid}`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("client-token"),
          },
        });
        setIsloading(false);
        setContent(res.data.cont);
      } catch {
        setIsloading(false);
        console.log("Error");
      }
    }
    fetchContent();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col grow">
      <div className="w-full bg-slate-100">
        <Link to={`/course/${co}`}>
          <Button>&lt; Back to Course</Button>
        </Link>
      </div>
      <div className="p-3 h-96">
        <div className="px-10 h-[600px]">
          {content?.type == "image" && (
            <img className="w-full h-full" src={content.url} />
          )}
          {content?.type == "document" && (
            <iframe
              src={content.url}
              className="w-full h-full"
              allow="autoplay"
            ></iframe>
          )}
          {content?.type == "video" && (
            <iframe
              className="w-full h-full"
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
  );
};

export default SingleContent;
