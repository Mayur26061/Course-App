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
  getMyCourse,
  resetPassword,
  getCompletedCourse,
  generateCertificate,
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
import multer from "../utils/multer";

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
router.post("/searchCourses", AuthenticateMixedUser, getSearchedCourses);
router.get("/mycreation", AuthenticateUser, getMyCreations);
router.post("/addcourse", AuthenticateUser, multer.single("file"), addCourse);
router.post("/:courseId/addcontent", AuthenticateUser, multer.single("file"), addContent);
router.put("/update/course/:courseId", AuthenticateUser, multer.single("file"), updateCourse);
router.put("/update/content/:contentId", AuthenticateUser, multer.single("file"), updateContent);
router.delete("/delete/course/:courseId", AuthenticateUser, deleteCourse);
router.delete("/delete/content/:contentId", AuthenticateUser, deleteContent);
router.get("/my/enrolled", AuthenticateUser, getMyCourse);
router.post("/my/resetpass", AuthenticateUser, resetPassword);
router.get("/my/completion", AuthenticateUser, getCompletedCourse);
router.get("/generate/certificate/:ucourseId", AuthenticateUser, generateCertificate);

export default router;
