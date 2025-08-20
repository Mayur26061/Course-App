import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import { ContentType, UserContent, UserCourse } from "../../libs/types/course";
import { Loading } from "../common/Loading";
import Notfound from "../common/Notfound";
import { fetchSingleContent } from "./fetch";
import { userState } from "../../stores/atoms/user";
import { useRecoilState } from "recoil";

const SingleContent = () => {
  const { co, cid } = useParams();
  const [content, setContent] = useState<null | ContentType>(null);
  const [isLoading, setIsloading] = useState(true);
  const [userStat, setUser] = useRecoilState(userState);

  useEffect(() => {
    const fetchContent = async () => {
      setIsloading(true);
      if (!cid || !co || !userStat.user) {
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
        // Deep copy to change in-depth object
        const userCourses: UserCourse[] = JSON.parse(JSON.stringify(userStat.user.user_courses));
        const userCourse = userCourses.find((data) => data.course_id === co);
        const userContent: UserContent | null = res.data.content.user_content.find(
          (data: UserContent) => data.content_id == cid
        );
        if (
          userCourse &&
          userContent &&
          !userCourse.user_contents.find((data) => data.content_id == cid)
        ) {
          userCourse.user_contents.push(userContent);
          setUser({
            isLoading: false,
            user: {
              ...userStat.user,
              user_courses: [...userCourses],
            },
          });
        }
        setContent(res.data.content);
      } catch {
        console.log("Error");
      }
      setIsloading(false);
    };

    fetchContent();
  }, [cid, co, userStat.user]);

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
