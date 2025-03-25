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

const CoursesContainer: FC<Tprops> = ({ courses }) => {
  return (
    <div className="flex justify-center flex-wrap">
      {courses && courses.map((c) => <Course key={c.id} course={c} />)}
    </div>
  );
};

export default CoursesContainer;
