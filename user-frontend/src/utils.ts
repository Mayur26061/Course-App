interface ValidationContent {
  type: string;
  file?: File | string;
  body?: string;
}

export const validationContentType = <T extends ValidationContent>(content: T) => {
  if (content.type === "document" && content.body) {
    return true
  } else if (content.type !== "document" && content.file) {
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
