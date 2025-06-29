import { atom } from "recoil";
import { CourseUserType } from "../../lib/types/course";

interface UsersEnrollAtom {
  isLoading: boolean;
  course_users: CourseUserType[];
}

export const userEnrollState = atom<UsersEnrollAtom>({
  key: "userEnrollState",
  default: {
    isLoading: true,
    course_users: [],
  },
});
