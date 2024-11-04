import { atom } from "recoil";
import { courseType } from "../../components/course/CourseList";
interface courseStateType {
  isLoading: boolean;
  course: courseType | null;
}
export const courseState = atom<courseStateType>({
  key: "courseState",
  default: {
    isLoading: true,
    course: null,
  },
});
