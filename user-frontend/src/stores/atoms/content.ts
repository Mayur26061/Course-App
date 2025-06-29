import { atom } from "recoil";
import { ContentType } from "../../libs/types/course";
interface ContentAtom {
  isLoading: boolean;
  contents: ContentType[];
}

export const contentState = atom<ContentAtom>({
  key: "contentState",
  default: {
    isLoading: false,
    contents: [] as ContentType[],
  },
});
