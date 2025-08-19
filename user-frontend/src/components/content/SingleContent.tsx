import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import { ContentType } from "../../libs/types/course";
import { Loading } from "../common/Loading";
import Notfound from "../common/Notfound";
import { fetchSingleContent } from "./fetch";

const SingleContent = () => {
  const { co, cid } = useParams();
  const [content, setContent] = useState<null | ContentType>(null);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setIsloading(true);
      if (!cid || !co) {
        setIsloading(false);
        return;
      }

      try {
        const res = await fetchSingleContent(cid, co);
        if (res.data.error) {
          console.log(res.data.message);
          setIsloading(false);
          return;
        }
        setContent(res.data.content);
      } catch {
        console.log("Error");
      }
      setIsloading(false);
    };

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
          {content.type == "image" && <img className="w-full h-full" src={content.content_url} />}
          {content.type == "document" && <Markdown>{content.body}</Markdown>}
          {content.type == "video" && (
            <video className="w-full h-full" controls src={content.content_url} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleContent;
