/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Loading } from "../common/Loading";
import ContentSection from "../content/edit/ContentSection";
import { contentState } from "../../stores/atoms/content";
import { courseState } from "../../stores/atoms/course";
import CourseCard from "./CourseCard";
import { GrayTopper } from "./SingleCourse";
import UpdateCourse from "./UpdateCourse";
import { fetchSingleCourseEditable } from "./fetch";
import Notfound from "../common/Notfound";

const SingleCourseEdit = () => {
  const { cid } = useParams();
  const [course, setCourse] = useRecoilState(courseState);
  const setContent = useSetRecoilState(contentState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!cid) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const [contents, course] = await fetchSingleCourseEditable(cid);
      setCourse({ isLoading: false, course: course });
      setContent({ isLoading: false, contents: contents });
      setIsLoading(false);
    };
    fetchCourse();
  }, [cid]);

  if (isLoading) {
    return <Loading />;
  }

  if (!course.course) {
    return <Notfound title="Course not found" />;
  }

  return (
    <div className="relative text-left">
      <GrayTopper />
      <CourseCard />
      <UpdateCourse course={course.course} />
      <ContentSection />
    </div>
  );
};

export default SingleCourseEdit;
