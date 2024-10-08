import React, { useEffect, useState } from "react";
import { courseprop } from "../course/Course";
import { fetchEnrolled } from "./fetch";
import { Table, TableContainer, TableHead, TableRow,TableCell,TableBody, Paper } from "@mui/material";
import EnrollData from "./EnrollData";

export interface courseUserType extends courseprop {
  id: string;
  course_id: string;
  user_id: string;
  completed_date: string | null;
  joined_date: string;
  status: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
}
const Enrolled = () => {
  const [enroll, setEnroll] = useState<courseUserType[]>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetchEnrolled();
      setEnroll(res);
    }
    fetchData();
  }, []);
  return <div>
    <TableContainer component={Paper} >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Joining Date</TableCell>
              {/* <TableCell>Category</TableCell> */}
              <TableCell>Status</TableCell>
              <TableCell>Completion Date</TableCell>
              {/* <TableCell align="center">User Type</TableCell>
              <TableCell align="center">Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {enroll.map((data)=>(<EnrollData key={data.id} userCourse={data}/>))}
          </TableBody>
        </Table>
      </TableContainer>
  </div>;
};

export default Enrolled;
