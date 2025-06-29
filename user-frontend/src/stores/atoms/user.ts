import { atom } from "recoil";
import { UserType } from "../../libs/types/course";

interface UserAtom {
  isLoading: boolean;
  user: null | UserType;
}

export const userState = atom<UserAtom>({
  key: "userState",
  default: {
    isLoading: true,
    user: null,
  },
});
