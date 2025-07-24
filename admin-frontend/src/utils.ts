import { UserType, UserTypeBase } from "./lib/types/user";

interface ValidationContent {
  type: string;
  content_url: string;
}

interface UserTypeInp extends UserTypeBase {
  password: string;
}

interface ContentCheck {
  title: string;
  description: string;
  price: string;
}

export const validateContent = <T extends ValidationContent>(
  content: T
): boolean => {
  const checkDocumentAccess = (urlsub: string) => {
    return ["preview", "view", "edit"].some((e) => urlsub.startsWith(e));
  };

  if (content.type === "video") {
    if (content.content_url.startsWith("https://youtu.be/")) {
      const url = content.content_url;
      content.content_url = url.replace(
        "https://youtu.be",
        "https://www.youtube.com/embed/"
      );
    }
    return true;
  }
  if (content.type == "document") {
    if (content.content_url.startsWith("https://docs.google.com/")) {
      let url = content.content_url;
      if (
        url.split("/").length === 7 &&
        checkDocumentAccess(url.substring(url.lastIndexOf("/") + 1))
      ) {
        url = url.substr(0, url.lastIndexOf("/") + 1) + "preview";
      } else {
        return false;
      }
      content.content_url = url;
    }
    return true;
  }
  if (content.type == "image") {
    return true;
  }
  return false;
};

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
