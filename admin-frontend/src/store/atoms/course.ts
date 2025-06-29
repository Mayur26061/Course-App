import { atom } from "recoil";
import { CourseType } from "../../lib/types/course";

interface courseStateType {
  isLoading: boolean;
  course: CourseType | null;
}

export const courseState = atom<courseStateType>({
  key: "courseState",
  default: {
    isLoading: true,
    course: null,
  },
});
