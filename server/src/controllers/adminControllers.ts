import asyncHandler from "express-async-handler";
import { z } from "zod";

import { reqObj } from "../utils/utils";
import prisma from "../utils/client";
import { signUpCheck, signCheck } from "../utils/utils";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/auth";

// Sign Up for admin
export const adminSignUp = asyncHandler(async (req, res, next) => {
  const result = signUpCheck.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const { username, password, name } = result.data;
  const existUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  if (existUser) {
    res.json({
      error: true,
      message: `User already exist for type ${existUser.userType}`,
    });
    return;
  }

  await prisma.user.create({
    data: {
      username,
      name,
      password: bcrypt.hashSync(password, 8),
      userType: "admin",
    },
  });

  res.send({ error: false, message: "Request submitted to smart learn" });
});

// Sign In for admin
export const adminSignIn = asyncHandler(async (req, res, next) => {
  const result = signCheck.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const { username, password } = req.body;

  const existUser = await prisma.user.findFirst({
    where: {
      username: username,
      userType: "admin",
      isApproved: true,
    },
    include: {
      user_courses: true,
    },
  });
  if (!existUser) {
    res.json({
      error: true,
      message: "Can't find user please signUp",
    });
    return;
  }

  if (!bcrypt.compareSync(password, existUser.password)) {
    res.json({
      error: true,
      message: "Incorrect password",
    });
    return;
  }
  const token = generateToken(
    { id: existUser.id, username: username },
    "admin"
  );
  const { password: pwd, ...user } = existUser;
  res.setHeader("set-cookie", `token=${token};Max-Age=172800;HttpOnly;`);
  res.send({ error: false, user });
});

export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await prisma.course.findMany({});
  res.send({ error: false, courses });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({});
  res.send({ error: false, users });
});

export const getAllCourseEnroll = asyncHandler(async (req, res) => {
  const course_partner = await prisma.user_course.findMany({});
  res.send({ error: false, course_partner });
});

export const getAdmin = asyncHandler(async (req: reqObj, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.headers.uid,
    },
  });
  res.send({ error: true, user });
});
