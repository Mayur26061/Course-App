import express from "express";
import {
  adminSignIn,
  adminSignUp,
  getAllCourses,
  getAllUsers,
  getAllCourseEnroll,
  getAdmin,
  getSelectedCourse,
  deleteCourse,
  deleteContent,
  updateCourse,
  updateContent,
  updateUser,
  deleteUser,
  updateSubcriber,
} from "../controllers/adminControllers";
import { AuthenticateAdmin } from "../middleware/auth";

const router = express.Router();

// Admin routes
router.post("/signin", adminSignIn);
router.post("/signup", adminSignUp);
router.get("/courses", AuthenticateAdmin, getAllCourses);
router.get("/users", AuthenticateAdmin, getAllUsers);
router.get("/course/:courseId", AuthenticateAdmin, getSelectedCourse);
router.delete("/delete/course/:courseId", AuthenticateAdmin, deleteCourse);
router.delete("/delete/content/:contentId", AuthenticateAdmin, deleteContent);
router.put("/update/course/:courseId", AuthenticateAdmin, updateCourse);
router.put("/update/content/:contentId", AuthenticateAdmin, updateContent);
router.delete("/delete/user/:userId", AuthenticateAdmin, deleteUser);
router.put("/update/user/:userId", AuthenticateAdmin, updateUser);
router.get("/subscriber", AuthenticateAdmin, getAllCourseEnroll);
router.post("/update/subscriber/:subId", AuthenticateAdmin, updateSubcriber);
router.get("/me", AuthenticateAdmin, getAdmin);

export default router;
