/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateCourse from "./UpdateCourse";
import CourseCard from "./CourseCard";
import { Typography } from "@mui/material";
import { courseState } from "../../stores/atoms/course";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  courseTitleState,
} from "../../stores/selectors/course";
import { contentState } from "../../stores/atoms/content";
import { Loading } from "../common/Loading";
import ContentSection from "../content/ContentSection";
import { fetchSingleCourse } from "./fetch";

const SingleCourse = () => {
  const { cid } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const setContent = useSetRecoilState(contentState);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true)
      const [contents, course] = await fetchSingleCourse(cid);
      setCourse({ isLoading: false, course: course });
      setContent({ isLoading: false, content: contents });
      setIsLoading(false)
    };
    fetchCourse();
  }, [cid]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative text-left">
      <GrayTopper />
      <CourseCard />
      <UpdateCourse />
      <ContentSection />
    </div>
  );
};

export default SingleCourse;

function GrayTopper() {
  const title = useRecoilValue(courseTitleState);
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
