import { atom } from "recoil";

export interface checktype {
  username: string;
  userType: string;
  name: string;
};
export interface userType  extends checktype{
  id: string;
  image: string | null;
  createAt: string;
  isApproved: boolean;
}

interface userStateType {
  isLoading:boolean,
  user: userType|null
}
export const userState = atom<userStateType>({
  key: "userState",
  default: {
    isLoading: true,
    user: null,
  },
});
interface usersDataStateType {
  isLoading:boolean,
  user: userType[]
}

export const usersDataState = atom<usersDataStateType>({
  key:"usersDataState",
  default: {
    isLoading: true,
    user: [],
  },
})