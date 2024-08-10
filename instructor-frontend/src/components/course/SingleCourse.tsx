/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateCourse from "./UpdateCourse";
import CourseCard from "./CourseCard";
import {  Typography } from "@mui/material";
import { BASE_URL } from "../../config";
import { courseState } from "../../stores/atoms/course";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  courseLoadingState,
  courseTitleState,
} from "../../stores/selectors/course";
import { contentState } from "../../stores/atoms/content";
import { Loading } from "../common/Loading";
import ContentSection from "../content/ContentSection";
const SingleCourse = () => {
  const { cid } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const setContent = useSetRecoilState(contentState);
  const isLoading = useRecoilValue(courseLoadingState);

  useEffect(() => {
    setCourse({ isLoading: true, course: null });
    setContent({ isLoading: true, content: null });
    axios
      .get(`${BASE_URL}/course/${cid}`, {
        withCredentials:true
      })
      .then((response) => {
        console.log(response.data)
        setContent({ isLoading: false, content: response.data.course.contents
        });
        setCourse({ isLoading: false, course: response.data.course });
      })
      .catch(() => {
        setCourse({ isLoading: false, course: null });
        setContent({ isLoading: false, content: [] });
      });
  }, [cid]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative text-left">
      <GrayTopper />
      <CourseCard />
      <UpdateCourse/>
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
            {title || ''}
          </Typography>
        </div>
      </div>
    </div>
  );
}
