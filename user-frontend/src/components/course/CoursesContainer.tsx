import React, { FC } from "react";
import Course from "./Course";

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
}

interface Tprops {
  courses: courseType[];
}

const CoursesContainer: FC<Tprops> = ({ courses }) => { // we can pass path from props ?
  return (
    <div className="flex flex-wrap gap-2">
      {courses && courses.map((c) => <Course key={c.id} course={c} path="/course"/>)}
    </div>
  );
};

export default CoursesContainer;
