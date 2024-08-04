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
} from "../controllers/InstructorController";

const router = express.Router();

// instructor route
router.post("/signin", instrutorSignIn);
router.post("/signup", instrutorSignUp);
router.get("/courses", AuthenticateInstructor, getCourses);
router.post("/addcourse", AuthenticateInstructor, addCourse);
router.post("/:cid/addcontent", AuthenticateInstructor, addContent);
router.post("/signout", AuthenticateInstructor, instructorSignout);
router.get("/content/:cid", AuthenticateInstructor, getSelectContent);
router.get("/course/:cid", AuthenticateInstructor, getSelectedCourse);

export default router;
