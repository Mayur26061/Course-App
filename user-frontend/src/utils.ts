interface ValidationContent {
  type: string;
  content_url?: string;
  body?: string;
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

export const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
