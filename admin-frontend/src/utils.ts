import { UserType, UserTypeBase } from "./lib/types/user";

interface ValidationContent {
  type: string;
  content_url: string;
}

interface UserTypeInp extends UserTypeBase {
  password: string;
}

interface checin {
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
      if (obj1[key] !== obj2[key]) {
        return true;
      }
    } else if (obj1[key] != "") {
      return true;
    }
  }
  return false;
};

export const checkCourseChanges = (ct: checin, ob: checin): boolean => {
  for (const a of Object.keys(ct)) {
    if (ct[a] == "") {
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (ct[a] !== ob[a]) {
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
