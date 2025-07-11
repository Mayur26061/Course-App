import { Card, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import {
  courseImageState,
  coursePriceState,
  courseTitleState,
} from "../../../store/selectors/course";

const CourseCard = () => {
  const title = useRecoilValue(courseTitleState);
  const imageLink = useRecoilValue(courseImageState);
  const price = useRecoilValue(coursePriceState);

  return (
    // use absolute with media query
    <div className="flex justify-center mt-5 lg:justify-end lg:mr-3">
      <Card className="w-350 min-h-52 z-10 !rounded-2xl pb-4">
        <div className="h-52">
          <img src={imageLink} className="h-full w-full" alt="img" />
        </div>
        <div className="ml-2.5">
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle2" className="text-gray-500">
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b>Rs {price}</b>
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default CourseCard;
