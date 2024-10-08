import express from "express";
import {
  adminSignIn,
  adminSignUp,
  getAllCourses,
  getAllUsers,
  getAllCourseEnroll,
  getAdmin,
} from "../controllers/adminControllers";
import { AuthenticateAdmin } from "../middleware/auth";

const router = express.Router();

// Admin routes
router.post("/signin", adminSignIn);
router.post("/signup", adminSignUp);
router.get("/courses", AuthenticateAdmin, getAllCourses);
router.get("/users", AuthenticateAdmin, getAllUsers);
router.get("/subscriber", AuthenticateAdmin, getAllCourseEnroll);
router.get("/me", AuthenticateAdmin, getAdmin);

export default router;
