import { selector } from "recoil";
import { contentState } from "../atoms/content";

export const contentIsloading = selector({
  key: "contentIsloading",
  get: ({ get }) => {
    const state = get(contentState);
    return state.isLoading;
  },
});

export const contentsState = selector({
  key: "contentsState",
  get: ({ get }) => {
    const state = get(contentState);
    return state.contents;
  },
});
