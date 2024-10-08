import React, { FC } from "react";
import { courseUserType } from "./Enrolled";
import { TableRow, TableCell } from "@mui/material";
interface userCourse {
  userCourse: courseUserType;
}
const EnrollData: FC<userCourse> = ({ userCourse }) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{userCourse.user.username}</TableCell>
      <TableCell>{userCourse.course.title}</TableCell>
      <TableCell>
        {new Date(userCourse.joined_date).toLocaleDateString()}
      </TableCell>
      <TableCell>{userCourse.status.toUpperCase()}</TableCell>
      <TableCell align="center">
        {userCourse.completed_date
          ? new Date(userCourse.completed_date).toLocaleDateString()
          : "-"}
      </TableCell>
    </TableRow>
  );
};

export default EnrollData;
