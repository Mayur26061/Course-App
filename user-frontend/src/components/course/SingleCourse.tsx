import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Loading } from "../common/Loading";
import Notfound from "../common/Notfound";
import ContentSection from "../content/ContentSection";
import { courseState } from "../../stores/atoms/course";
import {
  courseLoadingState,
  courseTitleState,
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
      <GrayTopper />
      <Grid container>
        <Grid item lg={4} md={4} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
      {/* debug: why course.course.contents is undefined*/}
      {course.course.contents?.length > 0 && <ContentSection />}
    </div>
  );
};

export default SingleCourse;

export const GrayTopper = () => {
  const title = useRecoilValue(courseTitleState);
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
