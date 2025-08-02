import { atom } from "recoil";
import { CourseType } from "../../libs/types/course";


interface CourseAtomBase {
  course: CourseType | null;
}

interface CourseAtom extends CourseAtomBase{
  isLoading: boolean;
}

export const courseState = atom<CourseAtom>({
  key: "courseState",
  default: {
    isLoading: true,
    course: null,
  },
});

export const courseEditState = atom<CourseAtomBase>({
  key: "courseEditState",
  default: {
    course: null,
  },
});