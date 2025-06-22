/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "./CourseCard";
import { courseState } from "../../stores/atoms/course";
import { useSetRecoilState } from "recoil";
import { Loading } from "../common/Loading";
import ContentSection from "../content/edit/ContentSection";
import { fetchSingleCourseEditable } from "./fetch";
import { GrayTopper } from "./SingleCourse";
import UpdateCourse from "./UpdateCourse";
import { contentState } from "../../stores/atoms/content";

const SingleCourseEdit = () => {
  const { cid } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const setContent = useSetRecoilState(contentState);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true)
      const [contents, course] = await fetchSingleCourseEditable(cid);
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

export default SingleCourseEdit;

