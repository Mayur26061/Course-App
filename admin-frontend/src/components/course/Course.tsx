import { FC } from "react";
import { TableCell, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CourseProps } from "../../lib/types/course";

const Course: FC<CourseProps> = ({ course }) => {
  const navigate = useNavigate();
  const onClickRow = () => {
    navigate(course.id);
  };
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      onClick={onClickRow}
    >
      <TableCell>{course.title}</TableCell>
      <TableCell>{course.description}</TableCell>
      <TableCell>{course.price}</TableCell>
      <TableCell>{course.published ? "published" : "unpublished"}</TableCell>
      <TableCell>{course.author.name}</TableCell>
    </TableRow>
  );
};

export default Course;
