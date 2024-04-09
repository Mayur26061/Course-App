/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UpdateCourse from "./UpdateCourse";
import CourseCard from "./CourseCard";
import { Grid, Typography } from "@mui/material";
import { BASE_URL } from "../config";
import { courseState } from "../stores/atoms/course";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  courseLoadingState,
  courseTitleState,
} from "../stores/selectors/course";
import { Loading } from "./Loading";
const SingleCourse = () => {
  let { cid } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const isLoading = useRecoilValue(courseLoadingState);
  useEffect(() => {
    setCourse({ isLoading: true, course: null });
    axios
      .get(`${BASE_URL}/admin/getcourse`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          courseId: cid,
        },
      })
      .then((response) => {
        setCourse({ isLoading: false, course: response.data.course });
      });
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <GrayTopper />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCourse />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
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
        width: "100vw",
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
