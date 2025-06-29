import { atom } from "recoil";
import { ContentType } from "../../lib/types/content";

export const contentState = atom({
  key: "contentState",
  default: {
    isLoading: false,
    content: [] as ContentType[],
  },
});
