import { Grid, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Loading } from "../common/Loading";
import Notfound from "../common/Notfound";
import ContentSection from "../content/ContentSection";
import { courseState } from "../../stores/atoms/course";
import {
  courseImageState,
  coursePriceState,
  courseTitleState,
  courseLoadingState,
} from "../../stores/selectors/course";
import CourseCard from "./CourseCard";
import { fetchSingleCourse } from "./fetch";

const SingleCourse = () => {
  const { cid } = useParams();
  const [course, setCourse] = useRecoilState(courseState);
  const isLoading = useRecoilValue(courseLoadingState);

  useEffect(() => {
    setCourse({ isLoading: true, course: null });
    if (cid) {
      fetchSingleCourse(cid)
        .then((response) => {
          setCourse({ isLoading: false, course: response.course });
        })
        .catch(() => {
          setCourse({ isLoading: false, course: null });
        });
    }
  }, [cid]);

  if (isLoading) {
    return <Loading />;
  }
  if (!course.course) {
    return <Notfound title="Course not found" />;
  }
  return (
    <div>
      <GrayTopper title={course.course.title}/>
      <Grid container>
        <Grid item lg={4} md={4} sm={12}>
          <CourseCard courseImageState={courseImageState} coursePriceState={coursePriceState} courseTitleState={courseTitleState}/>
        </Grid>
      </Grid>
      {course.course.contents.length > 0 && <ContentSection />}
    </div>
  );
};

interface GrayTopperProps {
  title: string
}

export const GrayTopper:FC<GrayTopperProps> = ({title}) => {
  return (
    <div className="h-64 w-full -mb-64 bg-stone-900">
      <div className="h-64 flex flex-col justify-center">
        <div>
          <Typography
            className="text-white text-center"
            variant="h3"
            fontWeight={600}
            >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;