/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Loading } from "../common/Loading";
import ContentSection from "../content/edit/ContentSection";
import { contentState } from "../../stores/atoms/content";
import { courseEditState } from "../../stores/atoms/course";
import { courseEditImageState, courseEditPriceState, courseEditTitleState } from "../../stores/selectors/course";
import CourseCard from "./CourseCard";
import { GrayTopper } from "./SingleCourse";
import UpdateCourse from "./UpdateCourse";
import { fetchSingleCourseEditable } from "./fetch";
import Notfound from "../common/Notfound";

const SingleCourseEdit = () => {
  const { cid } = useParams();
  const [course, setCourse] = useRecoilState(courseEditState);
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
      setCourse({ course: course });
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
      <GrayTopper title={course.course.title}/>
      <CourseCard
        courseImageState={courseEditImageState}
        coursePriceState={courseEditPriceState}
        courseTitleState={courseEditTitleState}
        isPublished={course.course.published} />
      <UpdateCourse course={course.course} />
      <ContentSection />
    </div>
  );
};

export default SingleCourseEdit;
