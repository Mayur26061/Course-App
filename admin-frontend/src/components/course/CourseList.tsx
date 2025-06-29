import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchCourses } from "./fetch";
import Course from "./Course";

interface Userfield {
  id: string;
  name: string;
}
export interface courseType {
  id: string;
  createAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  price: string;
  published: boolean;
  image: string;
  duration: Date | null;
  author_id: string;
  category: string | null;
  author: Userfield;
}

const CourseList = () => {
  const [courses, setCourses] = useState<courseType[]>([]);
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
