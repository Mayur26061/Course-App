import { Response } from "express";
import { date, z } from "zod";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import { generateToken } from "../middleware/auth";
import prisma from "../utils/client";
import { connect } from "http2";
import { redirect } from "react-router-dom";

type userType = "admin" | "instructor" | "learner";
const signCheck = z.object({
  username: z.string().email().min(1),
  password: z.string().min(6),
});
const signUpCheck = signCheck.extend({
  name: z.string().min(1),
});
type signUp = z.infer<typeof signUpCheck>;

export const userSignUp = asyncHandler(async (req, res) => {
  const result = signUpCheck.safeParse(req.body);
  if (result.error) {
    res.json({
      status: "error",
      message: "Invalid Inputs",
    });
    return;
  }
  const { username, password, name } = req.body;
  const existUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  if (existUser) {
    res.json({
      status: "error",
      message: `User already exist for type ${existUser.userType}`,
    });
    return;
  }
  // todo: z.enum for userType
  const record = await prisma.user.create({
    data: {
      username,
      name,
      password: bcrypt.hashSync(password, 8),
      userType: "learner",
    },
  });
  const token = generateToken({ id: record.id, username: username });
  res.setHeader("set-cookie", `token=${token}; HttpOnly;`);
  res.send({ status: "success" });
});

export const userSignIn = asyncHandler(async (req, res) => {
  const result = signCheck.safeParse(req.body);
  if (result.error) {
    res.json({
      status: "error",
      message: "Invalid Inputs",
    });
    return;
  }
  const { username, password } = req.body;

  // todo: z.enum for userType
  const existUser = await prisma.user.findFirst({
    where: {
      username: username,
      userType: "learner",
    },
    include: {
      user_courses: true,
    },
  });
  if (!existUser) {
    res.json({
      status: "error",
      message: "Can't find user please signUp",
    });
    return;
  }

  if (!bcrypt.compareSync(password, existUser.password)) {
    res.json({
      status: "error",
      message: "Incorrect password",
    });
    return;
  }
  const token = generateToken({ id: existUser.id, username: username });
  const { password: pwd, ...user } = existUser;
  res.setHeader("set-cookie", `token=${token}; HttpOnly; Max-Age=60*60*24*2`);
  res.send({ status: "success", user });
});

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await prisma.course.findMany({
    where: {
      published: true,
    },
  });
  res.send({ status: "success", courses });
});

export const userLogout = asyncHandler(async (req, res) => {
  res.setHeader("set-Cookie", "token=; HttpOnly; Max-Age=1;");
  res.json({ status: "success", message: "Log out successfull" });
});
export const getMe = asyncHandler(async (req, res) => {
  if (typeof req.headers.uid == "string") {
    const user = await prisma.user.findFirst({
      where: {
        id: req.headers.uid,
      },
      include: {
        user_courses: {
          select: {
            course_id: true,
            user_contents: {
              select: {
                content_id: true,
              },
            },
          },
        },
      },
    });
    if (user) {
      const { password: pwd, ...userData } = user;
      res.json({ status: "success", user: userData });
      return;
    }
  }
  res.json({ status: "error", message: "couldn't find" });
});

export const getSelectedCourse = asyncHandler(async (req, res) => {
  let courseId = req.params.cid;
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      contents: true,
    },
  });
  if (!course) {
    res.json({ status: "error", message: "couldn't find" });
    return;
  }
  res.json({ status: "success", course });
});

export const buyCourse = asyncHandler(async (req, res) => {
  if (typeof req.headers.uid == "string") {
    const { cid } = req.params;
    await prisma.user_course.create({
      data: {
        course: {
          connect: {
            id: cid,
          },
        },
        user:{
          connect:{
            id:req.headers.uid
          }
        }
      },
    });
    res.redirect("/me")
    return
  }
  res.json({ status: "error", message: "couldn't find" });
});
