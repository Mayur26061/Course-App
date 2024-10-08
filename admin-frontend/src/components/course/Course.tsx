import React, { FC } from "react";
import { TableCell, TableRow } from "@mui/material";
import { courseType } from "./CourseList";
// import { useNavigate } from "react-router-dom";

export interface courseprop {
  course: courseType;
}
const Course: FC<courseprop> = ({ course }) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{course.title}</TableCell>
      <TableCell>{course.description}</TableCell>
      <TableCell>{course.price}</TableCell>
      <TableCell>{course.published ? "published" : "unpublished"}</TableCell>
    </TableRow>
  );
};

export default Course;
