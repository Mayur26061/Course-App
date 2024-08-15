import axios from "axios";
import { BASE_URL } from "../config";
interface validationContent {
  type: string;
  url: string;
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
      let url = content.url;
      if (
        url.split("/").length === 7 &&
        checkDocumentAccess(url.substr(url.lastIndexOf("/") + 1))
      ) {
        url = url.substr(0, url.lastIndexOf("/") + 1) + "preview";
      } else {
        return false;
      }
      content.url = url;
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
export const fetchContent = async (cid: string) => {
  const response = await axios.get(`${BASE_URL}/admin/content`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    params: {
      courseId: cid,
    },
  });
  return response.data;
};
