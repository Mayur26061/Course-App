import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { CourseType } from "../../lib/types/course";
import { fetchCourses } from "./fetch";
import Course from "./Course";

const CourseList = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      const course = await fetchCourses();
      setCourses(course);
    };
    getCourses();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Decription</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((row) => (
            <Course key={row.id} course={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseList;
