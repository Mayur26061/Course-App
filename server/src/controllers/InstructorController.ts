import asyncHandler from "express-async-handler";
import { z } from "zod";

import { reqObj } from "../utils/utils";
import prisma from "../utils/client";
import { signUpCheck, signCheck } from "../utils/utils";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/auth";
import { count, error } from "console";

const courseInp = z.object({
  title: z.string().min(3),
  description: z.string().min(1),
  price: z.number().positive().finite().default(0),
  image: z.string().url().min(1),
});
const courseOptional = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(1).optional(),
  price: z.number().positive().finite().default(0).optional(),
  image: z.string().url().min(1).optional(),
});

const contentValidator = z.object({
  title: z.string().trim().min(3),
  description: z.string().trim(),
  type: z.enum(["image", "document", "video"]),
  content_url: z.string().url(),
  duration: z.string().time().optional(),
});

const contentOptional = z.object({
  title: z.string().trim().min(3),
  description: z.string().trim(),
  type: z.enum(["image", "document", "video"]),
  content_url: z.string().url(),
  duration: z.string().time().optional(),
});
// Sign Up for instructor
export const instrutorSignUp = asyncHandler(async (req, res, next) => {
  const result = signUpCheck.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
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
      userType: "instructor",
    },
  });

  res.send({ error: false, message: "Request submitted to smart learn" });
});

// Sign In for instructor
export const instrutorSignIn = asyncHandler(async (req, res, next) => {
  const result = signCheck.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const { username, password } = req.body;

  // todo: z.enum for userType
  const existUser = await prisma.user.findFirst({
    where: {
      username: username,
      userType: "instructor",
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
    "instructor"
  );
  const { password: pwd, ...user } = existUser;
  res.setHeader("set-cookie", `token=${token}; HttpOnly; Max-Age=60*60*24*2`);
  res.send({ error: false, user });
});

export const getCourses = asyncHandler(async (req: reqObj, res) => {
  const course = await prisma.course.findMany({
    where: {
      author_id: req.headers.uid,
    },
  });
  res.json({ error: false, course });
});

export const addCourse = asyncHandler(async (req: reqObj, res) => {
  const result = courseInp.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const { title, description, price, image } = result.data;
  const courseObject = {
    data: {
      title,
      description,
      price,
      image,
      author: {
        connect: {
          id: req.headers.uid || "",
        },
      },
    },
  };
  const course = await prisma.course.create(courseObject);
  res.json({ error: false, course });
});

export const addContent = asyncHandler(async (req: reqObj, res) => {
  const result = contentValidator.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const courseId = req.params.courseId;
  const course = await prisma.course.count({
    where: {
      id: courseId,
      author_id: req.headers.uid,
    },
  });
  if (!course) {
    res.json({
      error: true,
      message: "Course doesn't exist",
    });
    return;
  }
  const { title, description, type, content_url, duration } = result.data; // for duration will see the format later
  const contentObj = {
    data: {
      title,
      description,
      type,
      content_url,
      course: {
        connect: {
          id: courseId,
        },
      },
    },
  };
  const content = await prisma.content.create(contentObj);
  res.json({ error: false, content });
});

export const getSelectedCourse = asyncHandler(async (req: reqObj, res) => {
  const course = await prisma.course.findUnique({
    where: {
      id: req.params.courseId,
      author_id: req.headers.uid,
    },
    include: {
      contents: true,
    },
  });
  if (!course) {
    res.json({ error: true, message: "couldn't find" });
    return;
  }
  res.json({ error: false, course });
});

export const getSelectContent = asyncHandler(async (req: reqObj, res) => {
  const courseId: string = req.body.courseId;
  const content = await prisma.content.findUnique({
    where: {
      id: req.params.contentId,
      course_id: courseId,
      course: {
        author_id: req.headers.uid,
      },
    },
  });
  res.json({ error: false, content: content || [] });
});

// Logout logic
export const instructorSignout = asyncHandler(async (req, res) => {
  res.setHeader("set-Cookie", "token=; HttpOnly; Max-Age=;");
  res.json({ error: false, message: "Log out successfull" });
});

// function name say it all
export const getMe = asyncHandler(async (req: reqObj, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.headers.uid,
    },
    include: {
      courses: true,
    },
  });
  if (user) {
    const { password: pwd, ...userData } = user;
    res.json({ error: false, user: userData });
    return;
  }
  res.json({ error: true, message: "couldn't find" });
});

export const deleteContent = asyncHandler(async (req: reqObj, res) => {
  const courseId: string = req.body.courseId;
  const { count } = await prisma.content.deleteMany({
    where: {
      id: req.params.contentId,
      course_id: courseId,
    },
  });
  if (count) {
    res.json({ error: false, message: "Content Deleted successfully" });
    return;
  }
  res.json({ error: true, message: "Couldn't find content" });
});

export const deleteCourse = asyncHandler(async (req: reqObj, res) => {
  const { count } = await prisma.course.deleteMany({
    where: {
      id: req.params.courseId,
      author_id: req.headers.uid,
    },
  });
  if (count) {
    res.json({ error: false, message: "Course Deleted successfully" });
    return;
  }
  res.json({ error: true, message: "Couldn't find course" });
});

export const updateCourse = asyncHandler(async (req: reqObj, res) => {
  const result = courseOptional.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const course = await prisma.course.update({
    where: {
      id: req.params.courseId,
    },
    data: {
      ...req.body,
    },
  });
  res.json({ error: false, course: course });
});

export const updateContent = asyncHandler(async (req: reqObj, res) => {
  const result = contentOptional.safeParse(req.body);
  if (result.error) {
    res.json({
      error: true,
      message: "Invalid Inputs",
    });
    return;
  }
  const content = await prisma.content.update({
    data: {
      ...req.body,
    },
    where: {
      id: req.params.contentId,
    },
  });
  res.json({ error: false, content: content });
});
