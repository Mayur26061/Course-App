import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Loading } from "../../common/Loading";
import { fetchSingleContent } from "../fetch";
import { contentType } from "../../../utils";

const SingleContent = () => {
  const { co, cid } = useParams();
  const [content, setContent] = useState<contentType>();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    async function fetchthisContent() {
      setIsLoading(true);
      try {
        const res = await fetchSingleContent(cid, co)
        setIsLoading(false);
        if (res.data.error) {
          console.log(res.data.message);
          return;
        }
        setContent(res.data.content);
      } catch {
        console.log("Something went wrong");
      }
      setIsLoading(false);
    }
    fetchthisContent();
  }, [cid, co]);
  if(!cid || !co){
    return <></>
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col grow">
      <div className="w-full bg-slate-100 h-4/5">
        <Link to={`/course/${co}`}>
          <Button>&lt; Back to Course</Button>
        </Link>
      </div>
      {content ? (
        <div className="p-3 flex justify-center items-center">
          <div className="px-10 w-[800px] h-[560px]">
            {content.type == "image" && (
              <img className="w-full h-full" src={content.content_url} />
            )}
            {content.type == "document" && (
              <iframe
                src={content.content_url}
                className="w-full h-full"
              ></iframe>
            )}
            {content.type == "video" && (
              <iframe
                className="w-full h-full"
                src={content.content_url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SingleContent;
