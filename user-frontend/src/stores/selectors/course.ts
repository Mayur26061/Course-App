import { selector } from "recoil";
import { courseState } from "../atoms/course";

export const courseTitleState = selector({
  key: "courseTitleState",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.title;
    }
    return "";
  },
});
export const courseLoadingState = selector({
  key: "courseLoadingState",
  get: ({ get }) => {
    const state = get(courseState);
    return state.isLoading;
  },
});
export const coursePriceState = selector({
  key: "coursePriceState",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.price;
    }
    return "";
  },
});
export const courseImageState = selector({
  key: "courseImageState",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.image;
    }
    return "";
  },
});
export const courseContentState = selector({
  key: "courseContentState",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.contents;
    }
    return "";
  },
});
