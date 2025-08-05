import { FC } from "react";
import { Card, Typography } from "@mui/material";
import { RecoilValueReadOnly, useRecoilValue } from "recoil";
import CourseCardButton from "./CourseCardButton";

interface CourseCardProps {
  courseTitleState: RecoilValueReadOnly<string>
  courseImageState: RecoilValueReadOnly<string>
  coursePriceState: RecoilValueReadOnly<number | "">
  isPublished: boolean
}

const CourseCard:FC<CourseCardProps> = ({courseTitleState, courseImageState, coursePriceState, isPublished}) => {
  const title: string = useRecoilValue(courseTitleState);
  const imageLink: string = useRecoilValue(courseImageState);
  const price = useRecoilValue(coursePriceState);


  return (
    <div className="flex justify-center lg:justify-start w-full mt-56 md:mt-44">
      <Card className="w-350 min-h-52 z-1 mr-12 !rounded-2xl pb-4 ">
        <div className="h-52">
          <img src={imageLink} className="h-full w-full" alt="img" />
        </div>
        <div className="ml-2.5">
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle1">
          <b>Rs {price}</b>
          </Typography>
          <CourseCardButton coursePriceState={coursePriceState} isPublished={isPublished}/>
        </div>
      </Card>
    </div>
  );
};

export default CourseCard;
