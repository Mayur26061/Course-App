import { UserType, UserTypeBase } from "./lib/types/user";

interface ValidationContent {
  type: string;
  content_url?: string;
  body?: string;
}

interface UserTypeInp extends UserTypeBase {
  password: string;
}

interface ContentCheck {
  title: string;
  description: string;
  price: string;
}

export const formatVideoContent = <T extends ValidationContent>(
  content: T
) => {
  if (content.type === "video" && content.content_url) {
    if (content.content_url.startsWith("https://youtu.be/")) {
      const url = content.content_url;
      content.content_url = url.replace(
        "https://youtu.be",
        "https://www.youtube.com/embed/"
      );
    }
  }
};

export const validationContentType = <T extends ValidationContent>(content: T) => {
  if (content.type === "document" && content.body) {
    return true
  } else if (content.type !== "document" && content.content_url) {
    return true
  }
  return false
}


export const checkUserChanges = (
  obj1: UserTypeInp,
  obj2: UserType
): boolean => {
  for (const key in obj1) {
    if (key != "password") {
      if (obj1[key as keyof UserTypeInp] !== obj2[key as keyof UserType]) {
        return true;
      }
    } else if (obj1[key as keyof UserTypeInp] != "") {
      return true;
    }
  }
  return false;
};

export const checkCourseChanges = (
  newObject: ContentCheck,
  oldObject: ContentCheck
): boolean => {
  for (const key of Object.keys(newObject)) {
    if (newObject[key as keyof ContentCheck] == "") {
      return true;
    }
    if (
      newObject[key as keyof ContentCheck] !==
      oldObject[key as keyof ContentCheck]
    ) {
      return false;
    }
  }
  return true;
};

export const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
