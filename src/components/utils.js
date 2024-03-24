import { atom, useRecoilState } from "recoil";

export const coursesState = atom({
    key: 'coursesState',
    default: '',
  })