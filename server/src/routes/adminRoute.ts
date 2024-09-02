import express from "express";
import { adminSignIn, adminSignUp } from "../controllers/adminControllers";

const router = express.Router()

// Admin routes
router.post("/signin", adminSignIn);
router.post("/signup", adminSignUp);

export default router
