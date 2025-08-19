import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { contentState } from "../../../store/atoms/content";
import { courseState } from "../../../store/atoms/course";
import { courseTitleState } from "../../../store/selectors/course";
import ContentSection from "../content/ContentSection";
import { Loading } from "../../home/Loading";
import Notfound from "../../home/NotFound";
import CourseCard from "./CourseCard";
import UpdateCourse from "./UpdateCourse";
import { fetchSingleCourse } from "./fetch";

interface CidParams {
  cid?: string;
}

const SingleCourse = () => {
  const param: CidParams = useParams();
  const [course, setCourse] = useRecoilState(courseState);
  const setContent = useSetRecoilState(contentState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      const [contents, course] = await fetchSingleCourse(param.cid || "");
      setCourse({ isLoading: false, course: course });
      setContent({ isLoading: false, content: contents });
      setIsLoading(false);
    };
    fetchCourse();
  }, [param.cid]);

  if (isLoading) {
    return <Loading />;
  }
  if (!course.course) {
    return <Notfound title="Course not found" />;
  }
  return (
    <div className="relative text-left mb-28">
      <GrayTopper />
      <CourseCard />
      <UpdateCourse course={course.course} />
      <ContentSection />
    </div>
  );
};

export default SingleCourse;

const GrayTopper = () => {
  const title: string = useRecoilValue(courseTitleState);
  return (
    <div className="h-64 bg-stone-900">
      <div className="h-64 flex flex-col justify-center">
        <div>
          <Typography className="text-white text-center" variant="h3" fontWeight={600}>
            {title || ""}
          </Typography>
        </div>
      </div>
    </div>
  );
};
