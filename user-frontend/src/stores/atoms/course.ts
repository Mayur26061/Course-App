import { atom } from "recoil";
import { CourseType } from "../../libs/types/course";

interface CourseAtom {
  isLoading: boolean;
  course: CourseType | null;
}

export const courseState = atom<CourseAtom>({
  key: "courseState",
  default: {
    isLoading: true,
    course: null,
  },
});
