import { Card, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import {
  courseImageState,
  coursePriceState,
  courseTitleState,
} from "../../stores/selectors/course";
import CourseCardButton from "./CourseCardButton";

const CourseCard = () => {
  const title: string = useRecoilValue(courseTitleState);
  const imageLink: string = useRecoilValue(courseImageState);

  return (
    <div className="flex justify-center lg:justify-start w-full mt-56 md:mt-44">
      <Card className="w-350 min-h-52 z-1 mr-12 !rounded-2xl pb-4 ">
        <div className="h-52">
          <img src={imageLink} className="h-full w-full" alt="img" />
        </div>
        <div className="ml-2.5">
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle1">
            <PriceCard />
          </Typography>
          <CourseCardButton />
        </div>
      </Card>
    </div>
  );
};

// Component was used to test recoil state
const PriceCard = () => {
  const price = useRecoilValue(coursePriceState);
  return <b>Rs {price}</b>;
};

export default CourseCard;
