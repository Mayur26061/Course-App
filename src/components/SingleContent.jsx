import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config";
import { Loading } from "./Loading";

const SingleContent = () => {
  const { co, cid } = useParams();
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchContent() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/admin/content/${cid}`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setIsLoading(false);
        setContent(res.data.cont);
      } catch {
        setIsLoading(false);
      }
    }
    fetchContent();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col grow">
      <div className="w-full bg-slate-100 h-4/5">
        <Link to={`/admin/course/${co}`}>
          <Button>&lt; Back to Course</Button>
        </Link>
      </div>
      <div className="p-3 flex justify-center items-center">
        <div className="px-10 w-[800px] h-[560px]">
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
