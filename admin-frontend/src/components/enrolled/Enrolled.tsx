import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userEnrollState } from "../../store/atoms/user_course";
import EnrollData from "./EnrollData";
import { fetchEnrolled } from "./fetch";

const Enrolled = () => {
  const [enroll, setEnroll] = useRecoilState(userEnrollState);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchEnrolled();
      setEnroll({ isLoading: false, course_users: res });
    };
    fetchData();
  }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Joining Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Completion Date</TableCell>
              <TableCell></TableCell> {/* To show buttons */}
              {/* <TableCell>Category</TableCell> */}
              {/* <TableCell align="center">User Type</TableCell>
              <TableCell align="center">Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {enroll.course_users.map((data) => (
              <EnrollData key={data.id} userCourse={data} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Enrolled;
