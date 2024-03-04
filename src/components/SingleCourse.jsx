import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditCourse from "./EditCourse";
import { Button, Typography } from "@mui/material";
import "./SingleCourse.css"

const SingleCourse = () => {
  let { cid } = useParams();
  const [course, setCourse] = useState();
  const [isedit, setIsEdit] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/getcourse", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          courseId: cid,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCourse(response.data.course);
      });
  }, []);
  return (
    <div>
      {course && (
        <div>
          <img src={course.imageLink} alt="" />
          <div style={{ display: "flex" }}>
            <div>
              <Typography variant="h5">{course.title}</Typography>
              <Typography>Rs.{course.price}</Typography>
            </div>
            <div>
              <Button variant="outlined" onClick={() => setIsEdit(true)}>
                Edit
              </Button>
            </div>
          </div>
        </div>
      )}
      {isedit && (
        <div className="popup-wrapper abc">
          <div className="popup">
            <EditCourse
              course={course}
              setCourse={setCourse}
              setIsEdit={setIsEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCourse;
