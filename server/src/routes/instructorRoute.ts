import express from "express";
import { AuthenticateInstructor } from "../middleware/auth";
import {
  instrutorSignIn,
  instrutorSignUp,
  getCourses,
  addCourse,
  addContent,
  instructorSignout,
  getSelectContent,
  getSelectedCourse,
  getMe,
  deleteContent,
  updateCourse,
  updateContent,
  deleteCourse,
} from "../controllers/InstructorController";

const router = express.Router();

// instructor route
router.post("/signin", instrutorSignIn);
router.post("/signup", instrutorSignUp);
router.get("/courses", AuthenticateInstructor, getCourses);
router.post("/addcourse", AuthenticateInstructor, addCourse);
router.post("/:courseId/addcontent", AuthenticateInstructor, addContent);
router.post("/signout", AuthenticateInstructor, instructorSignout);
router.post("/content/:contentId", AuthenticateInstructor, getSelectContent);
router.get("/course/:courseId", AuthenticateInstructor, getSelectedCourse);
router.delete("/delete/course/:courseId", AuthenticateInstructor, deleteCourse);
router.delete("/delete/content/:contentId", AuthenticateInstructor, deleteContent);
router.put("/update/course/:courseId", AuthenticateInstructor, updateCourse);
router.put("/update/content/:contentId", AuthenticateInstructor, updateContent);
router.get("/me", AuthenticateInstructor, getMe);

export default router;
