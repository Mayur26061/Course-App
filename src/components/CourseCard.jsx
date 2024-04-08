/* eslint-disable react/prop-types */
import { Card, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import {
  courseImageState,
  coursePriceState,
  courseTitleState,
} from "../stores/selectors/course";
const CourseCard = () => {
  const title = useRecoilValue(courseTitleState);
 
  const imageLink = useRecoilValue(courseImageState);
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          marginTop: 50,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <img src={imageLink} style={{ width: 350 }} alt="img" />
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            <PriceCard/>
          </Typography>
        </div>
      </Card>
    </div>
  );
};
const PriceCard = () => {
    const price = useRecoilValue(coursePriceState);
    return <b>Rs {price}</b>
};
export default CourseCard;
