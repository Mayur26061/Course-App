import { Button } from "@mui/material";
import { useRecoilValue, useRecoilState } from "recoil";
import { userEmailState } from "../../stores/selectors/userEmail";
import { useNavigate, useParams } from "react-router-dom";
import { userState } from "../../stores/atoms/user";
import axios from "axios";
import { BASE_URL } from "../config";
import { coursePriceState } from "../../stores/selectors/course";

const CourseCardButton = () => {
  const navigate = useNavigate();
  const { cid } = useParams();
  const [user, setUser] = useRecoilState(userState);
  const userEmail = useRecoilValue(userEmailState);
  const price = useRecoilValue(coursePriceState);

  const goToSignIn = () => {
    navigate(`/signin?courseId=${cid}`);
  };
  const buyCourse = async () => {
    setUser({ isLoading: true, userEmail: userEmail });
    try {
      const res = await axios.post(
        BASE_URL + `/users/courses/${cid}`,
        {},
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("client-token"),
          },
        }
      );
      if (res.status == 200) {
        setUser({
          isLoading: false,
          userEmail: {
            ...userEmail,
            purchaseCourses: [...userEmail.purchaseCourses, cid],
          },
        });
      } else {
        setUser({ isLoading: false, userEmail });
      }
    } catch (err) {
      setUser({ isLoading: false, userEmail });
    }
  };

  return (
    <>
      {!user.userEmail?.purchaseCourses.includes(cid) &&
        (userEmail ? (
          <Button variant="contained" onClick={buyCourse}>
            {price>0?"Buy":"Enroll Free"}
          </Button>
        ) : (
          <Button variant="contained" onClick={goToSignIn}>
            Sign in
          </Button>
        ))}
    </>
  );
};

export default CourseCardButton;
