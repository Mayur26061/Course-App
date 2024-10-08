import { selector } from "recoil";
import { userState } from "../atoms/user";

export const currentUser = selector({
  key: "currentUser",
  get: ({ get }) => {
    const state = get(userState);
    return state.user;
  },
});
