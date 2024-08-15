import { selector } from "recoil";
import { userState } from "../atoms/user";

export const userOnlyState = selector({
  key: "userOnlyState",
  get: ({ get }) => {
    const state = get(userState);
    return state.user;
  },
});
