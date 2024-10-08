import { atom } from "recoil"
export interface contentType {
    id: string;
    createAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
    type: string;
    published: boolean;
    content_url: string;
    duration: Date | null;
    course_id: string;
  }
export const contentState = atom({
    "key": "contentState",
    "default": {
        isLoading: false,
        content: [] as contentType[],
    }
})
