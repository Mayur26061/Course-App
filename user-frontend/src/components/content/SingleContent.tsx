import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Loading } from "../common/Loading";
import { fetchSingleContent } from "./fetch";
import Notfound from "../common/Notfound";

const SingleContent = () => {
  const { co, cid } = useParams();
  const [content, setContent] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetchSingleContent(cid, co);
        if (res.data.error) {
          console.log(res.data.message);
          return;
        }
        setContent(res.data.content);
        setIsloading(false);
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
  if (!content) {
    return <Notfound title={"Content not found"} />;
  }
  return (
    <div className="flex flex-col grow">
      <div className="w-full bg-slate-100">
        <Link to={`/course/${co}`}>
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
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleContent;
