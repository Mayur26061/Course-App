import { useRecoilValue, useRecoilState } from "recoil";
import { userOnlyState } from "../../stores/selectors/userEmail";
import { useNavigate, useParams } from "react-router-dom";
import { userState } from "../../stores/atoms/user";
import { coursePriceState } from "../../stores/selectors/course";
import { buyCourseAction } from "./fetch";
import { courseState } from "../../stores/atoms/course";

const CourseCardButton = () => {
  const navigate = useNavigate();
  const { cid } = useParams();
  const [user, setUser] = useRecoilState(userState);
  const userEmail = useRecoilValue(userOnlyState);
  const price = useRecoilValue(coursePriceState);
  const course = useRecoilValue(courseState);
  const goToSignIn = () => {
    navigate(`/signin?courseId=${cid}`);
  };
  const buyCourse = async () => {
    setUser({ isLoading: true, user: userEmail });
    try {
      const res = await buyCourseAction(cid);
      setUser({ isLoading: true, user: userEmail });

      if (res.status == 200) {
        setUser({
          isLoading: false,
          user: {
            ...userEmail,
            user_courses: [
              ...userEmail.user_courses,
              { course_id: cid, user_contents: [] },
            ],
          },
        });
      } else {
        setUser({ isLoading: false, user });
      }
    } catch {
      setUser({ isLoading: false, user });
    }
  };

  return (
    <>
      {!(
        userEmail?.user_courses.findIndex((data) => data.course_id === cid) >= 0
      ) &&
        (userEmail ? (
          <button
            className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 min-w-20"
            onClick={buyCourse}
          >
            {price > 0 ? "Buy" : "Enroll Free"}
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
