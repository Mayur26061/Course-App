import { Card, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import {
  courseImageState,
  coursePriceState,
  courseTitleState,
} from "../../stores/selectors/course";
import CourseCardButton from "./CourseCardButton";
const CourseCard = () => {
  const title:string = useRecoilValue(courseTitleState);

  const imageLink:string = useRecoilValue(courseImageState);
  return (
    <div className="flex justify-center w-full mt-48 md:mt-36">
      <Card className="w-350 min-h-52 z-10 mr-12 !rounded-2xl pb-4 ">
        <div className="h-52">
          <img src={imageLink} className="h-full w-full" alt="img" />
        </div>
        <div className="ml-2.5">
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle2" className="text-gray-500">
            Price
          </Typography>
          <Typography variant="subtitle1">
            <PriceCard />
          </Typography>
          <CourseCardButton />
        </div>
      </Card>
    </div>
  );
};
const PriceCard = () => {
  const price:string = useRecoilValue(coursePriceState);
  return <b>Rs {price}</b>;
};
export default CourseCard;
