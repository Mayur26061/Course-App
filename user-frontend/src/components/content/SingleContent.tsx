import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../common/Loading";
import Notfound from "../common/Notfound";
import { fetchSingleContent } from "./fetch";

const SingleContent = () => {
  const { co, cid } = useParams();
  const [content, setContent] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetchSingleContent(cid, co);
        if (res.data.error) {
          console.log(res.data.message);
          setIsloading(false);
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
      <div className="p-3 flex justify-center items-center">
        <div className="px-10 w-[800px] h-[560px]">
          {content?.type == "image" && (
            <img className="w-full h-full" src={content.content_url} />
          )}
          {content?.type == "document" && (
            <iframe
              src={content.content_url}
              className="w-full h-full"
              allow="autoplay"
            ></iframe>
          )}
          {content?.type == "video" && (
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
    </div>
  );
};

export default SingleContent;
