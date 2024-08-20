/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateCourse from "./UpdateCourse";
import CourseCard from "./CourseCard";
import { Typography } from "@mui/material";
import { courseState } from "../../stores/atoms/course";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  courseLoadingState,
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
  const isLoading = useRecoilValue(courseLoadingState);

  useEffect(() => {
    const fetchCourse = async () => {
      const [contents, course] = await fetchSingleCourse(cid);
      setCourse({ isLoading: true, course: course });
      setContent({ isLoading: true, content: contents });
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
