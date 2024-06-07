/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "./CourseCard";
import { Grid, Typography } from "@mui/material";
import { BASE_URL } from "../config";
import { courseState } from "../../stores/atoms/course";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  courseLoadingState,
  courseTitleState,
} from "../../stores/selectors/course";
import { Loading } from "../common/Loading";
import ContentSection from "../content/ContentSection";

const SingleCourse = () => {
  let { cid } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const isLoading = useRecoilValue(courseLoadingState);

  useEffect(() => {
    setCourse({ isLoading: true, course: null });
    axios
      .get(`${BASE_URL}/users/course/${cid}`)
      .then((response) => {
        setCourse({ isLoading: false, course: response.data.course });
      })
      .catch(() => {
        setCourse({ isLoading: false, course: null });
      });
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <GrayTopper />
      <Grid container>
        <Grid item lg={4} md={4} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
      <ContentSection />
    </div>
  );
};

export default SingleCourse;

function GrayTopper() {
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
}
