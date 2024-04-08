/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateCourse from "./UpdateCourse";
import CourseCard from "./CourseCard";
import { Grid, Typography } from "@mui/material";
import { BASE_URL } from "../config";

const SingleCourse = () => {
  let { cid } = useParams();
  const [course, setCourse] = useState();
  useEffect(() => {
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
        setCourse(response.data.course);
      });
  }, []);
  if (!course) {
    return <></>;
  }
  return (
    <div>
      <GrayTopper title={course.title} />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCourse course={course} setCourse={setCourse} />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard course={course} />
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleCourse;

function GrayTopper({ title }) {
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: "0",
        marginBottom:-250
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

// return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//       }}
//     >
//       {course && (
//         <div>
//           <div style={{ display: "flex" }}>
//             <img
//               src={course.imageLink}
//               style={{ width: 900, height: 400 }}
//               alt=""
//             />
//           </div>
//           <div style={{ display: "flex" }}>
//             <div>
//               <Typography variant="h5">{course.title}</Typography>
//               <Typography>Rs.{course.price}</Typography>
//             </div>
//             <div>
//               <Button variant="outlined" onClick={() => setIsEdit(true)}>
//                 Edit
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isedit && (
//         <UpdateCourse
//           course={course}
//           setCourse={setCourse}
//           setIsEdit={setIsEdit}
//         />
//       )}
//     </div>
//   );
// };
