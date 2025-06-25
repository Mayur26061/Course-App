interface validationContent {
  title: string;
  description: string;
  type: string;
  content_url: string;
}

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

export const validateContent = <T extends validationContent>(
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

export const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
