import { atom } from "recoil";
import { UserType } from "../../lib/types/user";

interface UserAtom {
  isLoading: boolean;
  user: UserType | null;
}
export const userState = atom<UserAtom>({
  key: "userState",
  default: {
    isLoading: true,
    user: null,
  },
});

interface UsersAtom {
  isLoading: boolean;
  users: UserType[];
}

export const usersDataState = atom<UsersAtom>({
  key: "usersDataState",
  default: {
    isLoading: true,
    users: [],
  },
});
