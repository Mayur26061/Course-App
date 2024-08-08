import { atom } from "recoil"

export const contentState = atom({
    "key": "contentState",
    "default": {
        isLoading: false,
        content: null
    }
})
