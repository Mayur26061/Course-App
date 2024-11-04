import React, { FC } from "react";
import { courseUserType, userEnrollState } from "../../store/atoms/user_course";
import { TableRow, TableCell, Button } from "@mui/material";
import { actionComplete } from "./fetch";
import { useSetRecoilState } from "recoil";
interface userCourse {
  userCourse: courseUserType;
}
const EnrollData: FC<userCourse> = ({ userCourse }) => {
  const setcouseUser = useSetRecoilState(userEnrollState);
  const actionButton = async (val: boolean) => {
    const response = await actionComplete(userCourse.id, val);
    if (response.error) {
      return;
    }
    setcouseUser((pre) => {
      return {
        ...pre,
          course_users: pre.course_users.map((data) => {
            if (data.id === userCourse.id) {
              return response.user_partner;
            }else {
              return data;
            }
          }),
      };
    });
    // response.course_partner
  };
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
      <TableCell>
        {userCourse.status === "completed" ? (
          <Button onClick={() => actionButton(false)}>Mark as incomplete</Button>
        ) : (
          <Button onClick={() => actionButton(true)}>Mark as Completed</Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default EnrollData;
