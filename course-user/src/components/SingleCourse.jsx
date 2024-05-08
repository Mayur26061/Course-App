/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "./CourseCard";
import { Grid, Typography } from "@mui/material";
import { BASE_URL } from "./config";
import { courseState } from "../stores/atoms/course";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  courseLoadingState,
  courseTitleState,
} from "../stores/selectors/course";
import { Loading } from "./Loading";
import ContentSection from "./ContentSection";

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
      }).catch(()=>{
        setCourse({ isLoading: false, course: null });
      });
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div style={{backgroundColor: "rgb(238, 238, 238)"}}>
      <GrayTopper />
      <Grid container>
        <Grid item lg={4} md={4} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
      <ContentSection/>
    </div>
  );
};

export default SingleCourse;

function GrayTopper() {
  const title = useRecoilValue(courseTitleState);
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100%",
        zIndex: "0",
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}
