import { atom } from "recoil";
import { courseprop } from "../../components/course/Course";

export interface courseUserType extends courseprop {
    id: string;
    course_id: string;
    user_id: string;
    completed_date: string | null;
    joined_date: string;
    status: string;
    user: {
      id: string;
      name: string;
      username: string;
    };
  }
interface statetype {
    isLoading:boolean,
    course_users: courseUserType[]
}
export const userEnrollState = atom<statetype>({
    key:"userEnrollState",
    default:{
        isLoading:true,
        course_users:[] as courseUserType[],
    }
})