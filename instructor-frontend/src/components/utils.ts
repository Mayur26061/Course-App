import axios from "axios";
import { BASE_URL } from "../config";
export const validateContent = (content) => {
  const checkDocumentAccess = (urlsub) => {
    return ['preview', 'view', 'edit'].some((e) => urlsub.startsWith(e))
  }
  if (content.type === "video" && content.url.startsWith("https://youtu.be/")) {
    const url = content.url;
    content.url = url.replace(
      "https://youtu.be",
      "https://www.youtube.com/embed/"
    );
    return true;
  }
  if (content.type == "document") {
    if (content.url.startsWith("https://docs.google.com/")) {
      let url = content.url
      if (url.split('/').length === 7 && checkDocumentAccess(url.substr(url.lastIndexOf("/") + 1))) {
        url = url.substr(0, url.lastIndexOf("/") + 1) + 'preview'
      } else {
        return false
      }
      content.url = url
    }
    return true;
  }
  if (content.type == "image") {
    return true
  }
  return false;
};
export const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 500,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export const fetchContent = async (cid: string) => {
  const response = await axios
    .get(`${BASE_URL}/admin/content`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      params: {
        courseId: cid
      },
    })
  return response.data
}
