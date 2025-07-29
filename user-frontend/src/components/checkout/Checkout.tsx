import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "../common/Loading";
import Notfound from "../common/Notfound";
import { CourseType } from "../../libs/types/course";
import { userState } from "../../stores/atoms/user";
import { buyCourseAction, fetchSingleCourse } from "../course/fetch";
// import { userOnlyState } from "../../stores/selectors/userEmail";

const Checkout = () => {
  const user = useRecoilValue(userState);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseType>();
  const [isLoading, setIsLoading] = useState(true);
  const courseId = searchParams.get("courseId");

  useEffect(() => {
    if (courseId && user.user) {
      setIsLoading(true);
      const cid = user.user.user_courses.findIndex(
        (cd) => cd.course_id === courseId
      );
      if (cid > -1) {
        navigate(`/course/${courseId}`);
        return;
      }
      fetchSingleCourse(courseId)
        .then((response) => {
          if (response.course) {
            setCourse(response.course);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);

          console.log("Error");
        });
    }
  }, [courseId, user.user]);

  if (!courseId || (!course && !isLoading)) {
    return <Notfound title="Course not found" />;
  }
  if (isLoading || user.isLoading) {
    return <Loading />;
  }
  return (
    <>
      {course ? (
        <>
          <div className="grid gap-4 p-4 md:grid-cols-[1fr_420px]">
            <div className="w-full border">
              <div className="flex m-1">
                <div className="size-48">
                  <img src={course.image} className="w-full h-full" />
                </div>
                <div className="gap-1.5 flex flex-col p-4 pb-6">
                  <div>
                    <div className="font-semibold text-gray-950">
                      {course.title}
                    </div>
                    <div className=" text-blue-500 text-xs">
                      {course.author.name}
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm">
                    {course.description}
                  </div>
                  <div className="font-extrabold text-gray-800">
                    ₹{course.price}
                  </div>
                </div>
              </div>
            </div>
            <OrderSummary course={course} />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

interface OrderSummaryProps {
  course: CourseType;
}
const OrderSummary: FC<OrderSummaryProps> = ({ course }) => {
  const [user, setUser] = useRecoilState(userState);

  const onBuyAction = async () => {
    if (!user.user) {
      return;
    }
    setUser({ isLoading: true, user: user.user });
    try {
      const res = await buyCourseAction(course.id);
      if (res.status == 200) {
        setUser({
          isLoading: false,
          user: {
            ...user.user,
            user_courses: [
              ...user.user.user_courses,
              { course_id: course.id, user_contents: [] },
            ],
          },
        });
      } else {
        setUser({ ...user, isLoading: false });
      }
    } catch {
      setUser({ ...user, isLoading: false });
    }
  };

  return (
    <div className="border px-2 py-4">
      <h1 className="text-2xl border-b-2 pb-2 font-bold">Order summary</h1>
      <div className="flex flex-col gap-2 my-3">
        <div className="border-b-2 pb-2">Original Price {course.price}</div>
        <div>Total {course.price}</div>
      </div>
      <div>
        <button
          className="px-4 py-1 bg-gray-900 text-white rounded-full hover:bg-gray-700 w-full"
          onClick={onBuyAction}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Checkout;
