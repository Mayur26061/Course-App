/* eslint-disable no-undef */
import express from "express";
import { AuthenticateMixedUser, AuthenticateUser } from "../middleware/auth";
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
import {
  getMyCreations,
  addCourse,
  addContent,
  deleteContent,
  updateCourse,
  updateContent,
  deleteCourse,
} from "../controllers/InstructorController";

const router = express.Router();

// learner's routes
router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.post("/signout", AuthenticateUser, userSignout);
router.get("/me", AuthenticateUser, getMe);
router.get("/courses", getCourses);
router.get("/course/:courseId", AuthenticateMixedUser, getSelectedCourse);
router.post("/buycourse/:courseId", AuthenticateUser, buyCourse);
router.post("/content/:contentId", AuthenticateUser, getContent);
router.post(
  "/markCompleted/:contentId",
  AuthenticateUser,
  markasCompleteContent
);
router.post("/searchCourses", getSearchedCourses);
router.get("/mycreation", AuthenticateUser, getMyCreations);
router.post("/addcourse", AuthenticateUser, addCourse);
router.post("/:courseId/addcontent", AuthenticateUser, addContent);
router.put("/update/course/:courseId", AuthenticateUser, updateCourse);
router.put("/update/content/:contentId", AuthenticateUser, updateContent);
router.delete("/delete/course/:courseId", AuthenticateUser, deleteCourse);
router.delete("/delete/content/:contentId", AuthenticateUser, deleteContent);

export default router;
