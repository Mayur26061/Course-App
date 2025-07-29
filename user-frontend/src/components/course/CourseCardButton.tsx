import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { coursePriceState } from "../../stores/selectors/course";
import { userOnlyState } from "../../stores/selectors/userEmail";

const CourseCardButton = () => {
  const navigate = useNavigate();
  const { cid } = useParams();
  const userEmail = useRecoilValue(userOnlyState);
  const price = useRecoilValue(coursePriceState);

  const goToSignIn = () => {
    navigate(`/signin?courseId=${cid}`);
  };

  const buyCourse = async () => {
    if (!cid || !userEmail) {
      return;
    }
    navigate(`/checkout?courseId=${cid}`);
  };

  return (
    <>
      {!(
        userEmail &&
        userEmail?.user_courses.findIndex((data) => data.course_id === cid) >= 0
      ) &&
        (userEmail ? (
          <button
            className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 min-w-20"
            onClick={buyCourse}
          >
            {price && price > 0 ? "Buy" : "Enroll Free"}
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700"
            onClick={goToSignIn}
          >
            Sign in
          </button>
        ))}
    </>
  );
};

export default CourseCardButton;
