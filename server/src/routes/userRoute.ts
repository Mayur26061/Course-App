/* eslint-disable no-undef */
import express from "express";
import { AuthenticateUser } from "../middleware/auth";
import {
  getCourses,
  userSignout,
  userSignIn,
  userSignUp,
  getMe,
  getSelectedCourse,
  buyCourse,
  getContent,
  markasCompleteContent,
  getSearchedCourses,
} from "../controllers/userController";

const router = express.Router();

// learner's routes
router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.post("/signout", AuthenticateUser, userSignout);
router.get("/me", AuthenticateUser, getMe);
router.get("/courses", getCourses);
router.get("/course/:courseId", getSelectedCourse);
router.post("/buycourse/:courseId", AuthenticateUser, buyCourse);
router.post("/content/:contentId", AuthenticateUser, getContent);
router.post("/markCompleted/:contentId", AuthenticateUser, markasCompleteContent);
router.post("/searchCourses", getSearchedCourses);
export default router;
