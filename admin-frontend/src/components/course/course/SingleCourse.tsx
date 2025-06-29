/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateCourse from "./UpdateCourse";
import CourseCard from "./CourseCard";
import { Typography } from "@mui/material";
import { courseState } from "../../../store/atoms/course";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseTitleState } from "../../../store/selectors/course";
import { contentState } from "../../../store/atoms/content";
import ContentSection from "../content/ContentSection";
import { fetchSingleCourse } from "./fetch";

interface ook {
  cid?: string;
}

const SingleCourse = () => {
  const param: ook = useParams();
  const setCourse = useSetRecoilState(courseState);
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
    return "<Loading />;";
  }

  return (
    <div className="relative text-left mb-28">
      <GrayTopper />
      <CourseCard />
      <UpdateCourse />
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
          <Typography
            className="text-white text-center"
            variant="h3"
            fontWeight={600}
          >
            {title || ""}
          </Typography>
        </div>
      </div>
    </div>
  );
}
